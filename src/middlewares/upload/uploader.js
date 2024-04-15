import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import config from "../../config/config.js";

const storage = multer.memoryStorage();
const uploader = multer({ storage });

cloudinary.config({
  cloud_name: config.uploads.cloudinary.cloud_name,
  api_key: config.uploads.cloudinary.api_key,
  api_secret: config.uploads.cloudinary.api_secret,
});

export const resources = {
  PRODUCTS: "products",
  COSTUMERS: "costumers",
};

export const uploadMiddleware = ({ filename = "file" } = {}) => {
  return (req, res, next) => {
    try {
      uploader.single(filename)(req, res, async () => {
        if (!req.file) return next();
        const imgName = req.file.originalname.split(".")[0] + Date.now().toString();
        const foldername = req.originalUrl.split("/")[2];

        const uploadOptions = {
          resource_type: "image",
          folder: `eccomerce/${foldername}`,
          public_id: imgName,
        };

        const imgUrlOptionns = {
          fetch_format: "webp",
          quality: "auto",
          gravity: "auto",
          crop: "auto",
          width: 600,
        };

        const result = cloudinary.uploader.upload_stream(uploadOptions, (err, result) => {
          if (err) return res.status(500).json({ status: "error", error: err });
          req.fileURL = cloudinary.url(result.public_id, imgUrlOptionns);
          next();
        });

        result.end(req.file.buffer);
      });
    } catch (error) {
      next(err);
    }
  };
};

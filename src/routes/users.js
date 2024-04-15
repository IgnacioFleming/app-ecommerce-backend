import { Router } from "express";
import usersController from "../controllers/users.js";
import { passportCall } from "../middlewares/auth/passportCall.js";
import { uploader } from "../utils.js";
import { applyPolicy } from "../middlewares/policies/policies.js";
import { uploadMiddleware } from "../middlewares/upload/uploader.js";

const multerCategories = [{ name: "document" }, { name: "id" }, { name: "address" }, { name: "accountStatement" }, { name: "profile" }];

const router = Router();
router.use(passportCall("jwt"));
router.use(applyPolicy(["USUARIO", "PREMIUM"]));

router.post("/:uid/documents", passportCall("jwt"), uploader.fields(multerCategories), usersController.uploadDocuments);

router.put("/uploadProfileImage/:uid", uploadMiddleware({ filename: "profileImage" }), usersController.uploadProfileImage);

router.use(applyPolicy(["ADMIN"]));

router.put("/premium/:uid", usersController.shiftUserRole);

router.get("/", usersController.getAllUsers);

router.delete("/", usersController.deleteInactiveUsers);

router.delete("/:id", usersController.deleteUser);

export default router;

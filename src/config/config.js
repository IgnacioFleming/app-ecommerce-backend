import dotenv from "dotenv";
import options from "./commander.js";

dotenv.config();

export default {
  mailing: {
    service: process.env.SERVICE,
    user: process.env.USER,
    password: process.env.PASSWORD,
  },
  database: {
    mongo_url: options.env === "dev" ? process.env.TEST_MONGO_URL : process.env.MONGO_URL,
    persistence: options.mode === "file" ? "FILE" : "MONGO",
  },
  passport: {
    jwt_secret_key: process.env.JWT_SECRET_KEY,
    admin_user: process.env.ADMIN_USER,
    admin_password: process.env.ADMIN_PASSWORD,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    test_user_email: process.env.TEST_USER_EMAIL,
    test_user_password: process.env.TEST_USER_PASSWORD,
  },
  enviroment: { enviroment: options.env === "dev" ? "develop" : "production", url: process.env.URL, clientUrl: options.env === "dev" ? process.env.DEV_CLIENT_URL : process.env.PROD_CLIENT_URL },
  stripe: {
    secretApiKey: process.env.STRIPE_SECRET_API_KEY,
  },
  uploads: {
    cloudinary: {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    },
  },
  client: {
    prod_url: process.env.PROD_CLIENT_URL,
  },
};

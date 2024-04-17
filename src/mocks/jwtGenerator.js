import jwt from "jsonwebtoken";
import config from "../config/config.js";

const data = { email: "pepegrillo@example.com" };

jwt.sign(data, config.passport.jwt_secret_key, { expiresIn: "1h" });

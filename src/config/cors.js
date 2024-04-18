import config from "./config.js";

const allowedOrigins = [config.client.prod_url, undefined, /http:\/\/localhost:\d+$/];
export const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin !== -1)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "HEAD"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

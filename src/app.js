import express from "express";
import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js";
import viewsRouter from "./routes/views.js";
import usersRouter from "./routes/users.js";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import sessionRouter from "./routes/sessions.js";
import passport from "passport";
import initializePassport from "./config/passport.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errors/index.js";
import { addLogger } from "./utils/logger.js";
import loggerRouter from "./routes/logger.js";
import swaggerUiExpress from "swagger-ui-express";
import { specs } from "./config/swagger.js";
import SocketManager from "./websockets/socketManager.js";
import cors from "cors";
import paymentsRouter from "./routes/payments.js";

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(addLogger);
initializePassport();
app.use("/", viewsRouter);
app.use("/logs", loggerRouter);
app.use("/api/carts", cartsRouter);
app.use(passport.initialize());
app.use("/api/sessions", sessionRouter);
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/payments", paymentsRouter);
app.use(errorHandler);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

const server = app.listen(PORT, () => {
  console.log(`Levantado el servidor ${PORT}`);
});

const socketServer = new SocketManager(server);
socketServer.enable();

import jwt from "jsonwebtoken";
import { mailingService, userService } from "../services/index.js";
import { createHash, isValidPassword } from "../utils.js";
import config from "../config/config.js";
import UserDto from "../dao/dto/user.dto.js";

const handleLogin = async (req, res) => {
  const { user } = req;
  const token = jwt.sign(user, config.passport.jwt_secret_key, {
    expiresIn: "1h",
  });

  const dtoUser = new UserDto(user);
  res.send({
    status: "success",
    payload: { message: "Usuario logueado correctamente", dtoUser, token },
  });
};

const showCurrentUser = async (req, res) => {
  const dtoUser = new UserDto(req.user);
  res.send({
    status: "success",
    description: { message: "Usuario logueado correctamente", user: dtoUser },
  });
};

const handleFailedLogin = async (req, res) => {
  res.send({ error: "Login Failed" });
};

const handleGithubCallback = async (req, res) => {
  const { user } = req;
  const plainUser = user;

  const token = jwt.sign(plainUser, config.passport.jwt_secret_key, {
    expiresIn: "1h",
  });

  res.redirect(`${config.enviroment.clientUrl}/auth?token=${token}`);
};

const handleRegister = async (req, res) => {
  res.send({
    status: "success",
    description: "Usuario registrado correctamente",
  });
};

const handleFailedRegister = async (req, res) => {
  res.send({ error: "Register Failed" });
};

const handleLogout = async (req, res) => {
  await userService.update({ email: req.user.email }, { $set: { last_connection: Date() } });
  res.send({ status: "success", message: "User logged out succesfully" });
};

const sendEmailToRestorePass = async (req, res) => {
  const { email } = req.params;
  const user = await userService.getOne({ email });
  if (!user.payload) return res.status(400).send({ status: "error", error: "No se puede restablecer un usuario no registrado" });
  const token = jwt.sign({ email }, config.passport.jwt_secret_key, { expiresIn: "1h" });
  const message = `
  <p>Estimado Usuario,<br/><br/>
  Para dar curso al restablecimiento de su mail por favor hacer click en el siguiente boton:
  <p><br/><br/>
  <a href="${config.enviroment.url}/restorePass/${token}"><button>Restablecer Contraseña</button></a>
  `;
  await mailingService.sendSimpleMail({
    from: config.mailing.user,
    subject: "Restablece tu contraseña",
    to: email,
    html: message,
  });
  res.send({ status: "success", payload: message });
};

const restorePass = async (req, res) => {
  if (!req.user) return res.status(400).send({ status: "error", error: "Solicitud inválida, token de autenticacion faltante." });
  const { email } = req.user;
  const user = await userService.getOne({ email });
  if (!user.payload) return res.status(400).send({ status: "error", error: "Correo de origen inválido" });
  const { password } = req.body;
  const validation = await isValidPassword(password, user.payload);
  if (validation) return res.status(400).send({ status: "error", error: "La contraseña no puede ser igual a la anterior" });
  const hashedNewPass = await createHash(password);
  const updatedUser = { ...user.payload, password: hashedNewPass };
  await userService.update({ _id: updatedUser._id }, updatedUser);
  res.send({ status: "success", payload: "Se restableción con exito su contraseña" });
};

export default {
  handleFailedLogin,
  handleFailedRegister,
  handleGithubCallback,
  handleLogin,
  handleLogout,
  handleRegister,
  showCurrentUser,
  sendEmailToRestorePass,
  restorePass,
};

import UserDto from "../dao/dto/user.dto.js";
import { mailingService, userService } from "../services/index.js";
import config from "../config/config.js";

const shiftUserRole = async (req, res) => {
  const { uid } = req.params;
  const user = await userService.getById(uid);
  if (!user.payload) return res.status(400).send({ status: "error", error: "El usuario no existe en la base o no es posible modificar su rol" });
  const premiumRequiredDocs = ["id", "address", "accountStatement"];
  if (user.payload.role === "usuario") {
    const docsValidation = premiumRequiredDocs.every((name) => {
      return user.payload.documents.some((doc) => doc.name === name);
    });
    if (docsValidation) {
      user.payload.role = "premium";
    } else {
      return res.status(400).send({ status: "error", error: "El usuario no registró los documentos necesarios para ser Premium" });
    }
  } else {
    user.payload.role = "usuario";
  }
  await userService.update({ _id: uid }, user.payload);
  res.send({ status: "success", payload: `Se cambió el rol del usuario a '${user.payload.role}'` });
};

const uploadDocuments = async (req, res) => {
  try {
    const keys = Object.keys(req.files);
    let documents = [];
    keys.forEach((k) => {
      req.files[k].map((e) => {
        return documents.push({
          name: e.fieldname,
          reference: e.path,
        });
      });
    });

    await userService.update({ email: req.user.email }, { $push: { documents } });
    res.send({ status: "success", payload: "Los documentos fueron cargados exitosamente" });
  } catch (error) {
    res.status(500).send({ status: "error", description: error.toString() });
  }
};

const getAllUsers = async (req, res) => {
  const users = await userService.get();
  const usersDTO = users.payload.map((user) => new UserDto(user));
  res.send({ status: "success", payload: usersDTO });
};

const deleteInactiveUsers = async (req, res) => {
  const users = await userService.get();
  if (users.payload.length === 0) return res.status(400).send({ status: "error", payload: "No se encontraron usuarios" });
  const limitDate = Date.now() - 3600 * 1000 * 48;
  let deletedUsers = await Promise.all(
    users.payload.map(async (user) => {
      if (Date.parse(user.last_connection) <= limitDate) {
        const emailBody = `
        <p>Estimado ${user.first_name}<p>
        <p>Dado que lleva más de 48 horas sin actividad, como somos algo impacientes, decidimos eliminar su cuenta,<p/>
        <p>Espero sepa entender,<p/>
        <p>Saludos</p>
        `;
        mailingService.sendSimpleMail({ from: config.mailing.user, subject: "Eliminacion de cuenta inactiva", to: user.email, html: emailBody });
        await userService.delete(user._id);
        return user._id;
      }
      return null;
    })
  );
  deletedUsers = deletedUsers.filter((id) => id != null);

  res.send({ status: "success", payload: deletedUsers.length === 0 ? "No se encontraron usuarios inactivos" : `Los usuarios eliminados son: ${deletedUsers}` });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  await userService.delete(id);
  res.send({ status: "success", payload: "Usuario eliminado correctamente" });
};

const uploadProfileImage = async (req, res) => {
  const { uid } = req.params;
  const { status, payload } = await userService.uploadProfileImage(uid, req.fileURL);
  res.send({ status, payload });
};

export default {
  shiftUserRole,
  uploadDocuments,
  getAllUsers,
  deleteInactiveUsers,
  deleteUser,
  uploadProfileImage,
};

const socket = io();
//Formulario
const chatInput = document.getElementById("chat-input");
const user = document.getElementById("user");
const message = document.getElementById("message");

chatInput.addEventListener("submit", (evt) => {
  socket.emit("new-message", { userId: user.value, text: message.value });
  chatInput.reset();
});

//Logs

const logs = document.getElementById("logs");

socket.on("log-messages", (data) => {
  let messages = "";
  data.payload.forEach((log) => {
    messages += `<p>El usuario ${log.userId} dice: ${log.text}</p>`;
  });
  logs.innerHTML = messages;
});

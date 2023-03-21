console.log("hello world");
const lblOnline = document.querySelector("#lblOnline");
const lblOffline = document.querySelector("#lblOffline");
const txtMensaje = document.querySelector("#txtMensaje");
const btnEnviar = document.querySelector("#btnEnviar");

const socket = io();

socket.on("connect", () => {
  console.log("Conectado");

  lblOffline.style.display = "none";
  lblOnline.style.display = "";
});

socket.on("disconnect", () => {
  console.log("Desconectado del servidor");

  lblOnline.style.display = "none";
  lblOffline.style.display = "";
});

socket.on("enviar-mensaje", (payload) => {
  console.log(payload);
});

btnEnviar.addEventListener("click", () => {
  const mensaje = txtMensaje.value;
  const payload = {
    mensaje,
    id: "123ABC",
    fecha: new Date().getTime(),
  };

  // it has a callback
  socket.emit("enviar-mensaje", payload, (receivedInfo) => {
    console.log("Desde el server", receivedInfo);
  });
});

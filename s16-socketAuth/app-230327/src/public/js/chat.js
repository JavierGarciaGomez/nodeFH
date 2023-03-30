const url = window.location.hostname.includes("localhost")
  ? "http://localhost:3000/api/auth/"
  : "https://restserver-curso-fher.herokuapp.com/api/auth/";

let socket = null;

const txtUid = document.querySelector("#txtUid");
const txtMensaje = document.querySelector("#txtMensaje");
const ulUsuarios = document.querySelector("#ulUsuarios");
const ulMensajes = document.querySelector("#ulMensajes");
const btnSalir = document.querySelector("#btnSalir");

txtMensaje.addEventListener("keyup", ({ keyCode }) => {
  const mensaje = txtMensaje.value;
  const uid = txtUid.value;

  if (keyCode !== 13) {
    return;
  }

  if (mensaje.length === 0) {
    return;
  }

  socket.emit("send-message", { message: mensaje, uid });

  txtMensaje.value = "";
});

const validateJWT = async () => {
  const token = localStorage.getItem("token") || "";

  if (token.length <= 10) {
    window.location = "index.html";
    throw new Error("There is no token in the server");
  }

  const resp = await fetch(url, {
    headers: { Authorization: token },
  });

  const { token: tokenDB, user } = await resp.json();
  localStorage.setItem("token", tokenDB);

  document.title = user.name;

  await connectSocket();
};

const main = async () => {
  // Validar JWT
  await validateJWT();
};

main();

const connectSocket = async () => {
  socket = io({
    extraHeaders: {
      Authorization: localStorage.getItem("token"),
    },
  });

  socket.on("connect", () => {
    console.log("Sockets online");
  });

  socket.on("disconnect", () => {
    console.log("Sockets offline");
  });

  socket.on("receive-messages", drawMsg);
  socket.on("active-users", drawUsers);

  socket.on("private-message", (payload) => {
    console.log("Private:", payload);
  });
};

const drawUsers = (usuarios = []) => {
  let usersHtml = "";
  usuarios.forEach(({ name, uid }) => {
    usersHtml += `
          <li>
              <p>
                  <h5 class="text-success"> ${name} </h5>
                  <span class="fs-6 text-muted">${uid}</span>
              </p>
          </li>
      `;
  });

  ulUsuarios.innerHTML = usersHtml;
};

const drawMsg = (mensajes = []) => {
  console.log({ mensajes });
  let mensajesHTML = "";
  mensajes.forEach(({ name, message }) => {
    mensajesHTML += `
          <li>
              <p>
                  <span class="text-primary">${name}</span>
                  <span>${message}</span>
              </p>
          </li>
      `;
  });

  ulMensajes.innerHTML = mensajesHTML;
};

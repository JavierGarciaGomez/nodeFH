// Referencias HTML
const lblEscritorio = document.querySelector("h1");
const btnAtender = document.querySelector("button");
const lblTicket = document.querySelector("small");
const divAlerta = document.querySelector(".alert");
const lblPendientes = document.querySelector("#lblPendientes");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("desk")) {
  window.location = "index.html";
  throw new Error("The desk is required");
}

const desk = searchParams.get("desk");
console.log({ desk });
lblEscritorio.innerText = `Desk ${desk}`;

divAlerta.style.display = "none";

const socket = io();

socket.on("connect", () => {
  btnAtender.disabled = false;
});

socket.on("disconnect", () => {
  btnAtender.disabled = true;
});

socket.on("pending-tickets", (pending) => {
  if (pending === 0) {
    lblPendientes.style.display = "none";
  } else {
    lblPendientes.style.display = "";
    lblPendientes.innerText = pending;
  }
});

btnAtender.addEventListener("click", () => {
  socket.emit("attend-ticket", { desk }, ({ ok, ticket, msg }) => {
    if (!ok) {
      lblTicket.innerText = "No one.";
      return (divAlerta.style.display = "");
    }

    lblTicket.innerText = "Ticket " + ticket.number;
  });
  socket.emit("next-ticket", null, (ticket) => {
    lblNuevoTicket.innerText = ticket;
  });
});

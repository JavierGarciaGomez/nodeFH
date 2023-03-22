// Referencias HTML
const lblNewTicket = document.querySelector("#lblNuevoTicket");
const btnGenerateNewTicket = document.querySelector("button");

const socket = io();

socket.on("connect", () => {
  console.log("connect");
  btnGenerateNewTicket.disabled = false;
});

socket.on("disconnect", () => {
  btnGenerateNewTicket.disabled = true;
});

socket.on("last-ticket", (lastTicket) => {
  console.log({ lastTicket });
  lblNewTicket.innerText = "Ticket " + lastTicket;
});

btnGenerateNewTicket.addEventListener("click", () => {
  socket.emit("next-ticket", null, (ticket) => {
    lblNewTicket.innerText = ticket;
  });
});

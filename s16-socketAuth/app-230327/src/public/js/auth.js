const myForm = document.querySelector("form");

const url = window.location.hostname.includes("localhost")
  ? "http://localhost:3000/api/auth/"
  : "https://restserver-curso-fher.herokuapp.com/api/auth/";

myForm.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const formData = {};

  for (let el of myForm.elements) {
    if (el.name.length > 0) formData[el.name] = el.value;
  }
  console.log({ formData });

  fetch(`${url}/login`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  })
    .then((resp) => resp.json())
    .then((resp) => {
      const { token } = resp;
      if (!token) {
        return console.error(resp);
      }

      localStorage.setItem("token", token);
      window.location = "chat.html";
    })
    .catch((err) => {
      console.log(err);
    });
});

function handleCredentialResponse(response) {
  // decodeJwtResponse() is a custom function defined by you
  // to decode the credential response.
  console.log("ID TOKEN", response.credential);
  const id_token = response.credential;

  fetch(`${url}/googleAuth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_token }),
  })
    .then((resp) => resp.json())
    .then(({ token }) => localStorage.setItem("token", token))
    .catch(console.warn());
}

function signOut() {
  console.log("User signed out.");
  google.accounts.id.disableAutoSelect();
  google.accounts.id.revoke(
    localStorage.getItem("email"),
    (done) => localStorage.clear(),
    location.reload()
  );
}

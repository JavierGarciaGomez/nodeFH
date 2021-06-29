// 71
const axios = require("axios");

class Busquedas {
  historial = ["Tegucigalpa", "Madrid"];

  constructor() {
    // TODO: leer DB si existe
  }

  async ciudad(lugar = "") {
    // petición http
    console.log(lugar);
    const resp = await axios.get("https://reqres.in/api/users?page=2");
    console.log(resp.data);

    // retornar las ciudades
    return [];
  }
}

module.exports = Busquedas;

// 71
const axios = require("axios");
// 75
require("dotenv").config();

class Busquedas {
  historial = ["Tegucigalpa", "Madrid"];

  constructor() {
    // TODO: leer DB si existe
  }

  //   74
  get paramsMabox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: "5",
      language: "es",
    };
  }

  //   79
  get paramsOpenWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: "metric",
      lang: "es",
    };
  }

  async ciudad(lugar = "") {
    try {
      // petición http

      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMabox,
      });
      const resp = await instance.get();

      return resp.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
    } catch (error) {
      console.log(error);
    }
  }

  async climaLugar(lat, lon) {
    console.log(lat, lon);
    try {
      //   instance axios.create
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsOpenWeather, lat, lon },
      });
      // resp.data extraer
      const resp = await instance.get();
      const { weather, main } = resp.data;
      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      console.log(error);
    }
  }

  agregarHistorial(lugar = "") {
    //   TODO prevenir duplicados
    this.historial.unshift(lugar);
    // grabar en DB
  }
}

module.exports = Busquedas;

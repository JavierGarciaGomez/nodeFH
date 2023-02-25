import axios from "axios";
import { ApiFeature, ApiWeatherData } from "../interfaces/apiInterfaces";

export class SearchLocationService {
  history: string[] = [];

  constructor() {
    // TODO read db if exists
  }

  public getHistory(): string[] {
    return [...this.history];
  }

  searchPlace = async (placeName: string): Promise<ApiFeature[]> => {
    let searchResults = null;

    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${placeName}.json`,
        timeout: 5000,
        headers: { "X-Custom-Header": "foobar" },
        params: {
          access_token: process.env.MAPBOX_TOKEN,
          limit: 5,
        },
      });

      const { data } = await instance.get("");

      searchResults = data.features;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("axios error", error);
      } else {
        console.error("not axios error", error);
      }
    }

    return searchResults;
  };

  searchTemp = async (
    lat: number = 0,
    lon: number = 0
  ): Promise<ApiWeatherData | null> => {
    let weatherData = null;
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        timeout: 5000,
        headers: { "X-Custom-Header": "foobar" },
        params: {
          lat,
          lon,
          appid: process.env.OPENWEATHER_KEY,
          units: "metric",
        },
      });
      const { data } = await instance.get("");

      weatherData = {
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
        temp: data.main.temp,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("axios error", error);
      } else {
        console.error("not axios error", error);
      }
    }

    return weatherData;
  };

  addToHistory = (place: string) => {
    if (this.history.length >= 5) {
      this.history.pop();
    }
    this.history.unshift(place);
  };
}

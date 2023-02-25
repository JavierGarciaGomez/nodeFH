export interface ApiFeature {
  id: string;
  place_name: string;
  bbox?: number[];
  center: number[];
}

export interface Context {
  id: string;
  short_code?: string;
  wikidata?: string;
  text: string;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Properties {
  wikidata: string;
  short_code?: string;
  address?: string;
  category?: string;
  landmark?: boolean;
  foursquare?: string;
  maki?: string;
}

export interface ApiWeatherData {
  temp_min: number;
  temp_max: number;
  temp: number;
}

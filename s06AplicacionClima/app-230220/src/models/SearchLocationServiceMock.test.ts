import { SearchLocationService } from "./SearchLocationService";
import axios from "axios";

jest.mock("axios");

describe("SearchLocationService", () => {
  let searchLocationService: SearchLocationService;

  beforeEach(() => {
    searchLocationService = new SearchLocationService();
  });

  describe("searchPlace", () => {
    it("should call axios with the correct parameters and return the search results", async () => {
      const placeName = "San Francisco";
      const expectedSearchResults = [
        {
          place_name: "San Francisco, California, United States",
          center: [-122.41942, 37.77493],
        },
      ];

      // Set up mock response from axios
      const axiosResponse = { data: { features: expectedSearchResults } };
      (axios.create as jest.Mock).mockReturnValueOnce({
        get: jest.fn().mockResolvedValueOnce(axiosResponse),
      });

      const searchResults = await searchLocationService.searchPlace(placeName);

      expect(searchResults).toEqual(expectedSearchResults);
      expect(axios.create).toHaveBeenCalledWith({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${placeName}.json`,
        timeout: 5000,
        headers: { "X-Custom-Header": "foobar" },
        params: {
          access_token: process.env.MAPBOX_TOKEN,
          limit: 5,
        },
      });
    });

    it("should handle errors and return null", async () => {
      const placeName = "San Francisco";

      // Set up mock error response from axios
      const axiosError = new Error("Axios error");
      (axios.create as jest.Mock).mockReturnValueOnce({
        get: jest.fn().mockRejectedValueOnce(axiosError),
      });

      const searchResults = await searchLocationService.searchPlace(placeName);

      expect(searchResults).toBeNull();
      expect(axios.create).toHaveBeenCalledWith({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${placeName}.json`,
        timeout: 5000,
        headers: { "X-Custom-Header": "foobar" },
        params: {
          access_token: process.env.MAPBOX_TOKEN,
          limit: 5,
        },
      });
    });
  });
});

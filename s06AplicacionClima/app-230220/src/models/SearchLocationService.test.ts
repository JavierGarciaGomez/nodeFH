import { SearchLocationService } from "./SearchLocationService";

describe("SearchLocationService", () => {
  let service: SearchLocationService;

  beforeEach(() => {
    service = new SearchLocationService();
  });

  it("should create", () => {
    expect(service).toBeTruthy();
  });

  it("should return an empty array when no search history is available", () => {
    const history = service.getHistory();
    expect(history.length).toBe(0);
  });

  it("should return the search history when it is available", () => {
    service.addToHistory("New York");
    service.addToHistory("Paris");

    const history = service.getHistory();
    expect(history.length).toBe(2);
    expect(history[0]).toBe("Paris");
    expect(history[1]).toBe("New York");
  });

  it("should search for a place and return search results", async () => {
    const searchResults = await service.searchPlace("New York");

    expect(searchResults).toBeTruthy();
    expect(searchResults.length).toBeGreaterThan(0);
  });
});

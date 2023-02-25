import {
  pause,
  printMenu,
  readSimpleInput,
  selectACity,
} from "./helpers/prompts";
import { IselectedOption } from "./interfaces/interfaces";
import { SearchLocationService } from "./models/SearchLocationService";
import { config } from "dotenv";
config();

const main = async () => {
  let searchLocationService = new SearchLocationService();
  while (true) {
    const selectedOption: IselectedOption = await printMenu();

    if (selectedOption === "Exit") {
      break;
    }

    switch (selectedOption) {
      case "Search a city":
        const inputPlace = await readSimpleInput(
          "Type the name of the place you want to search: "
        );
        const features = await searchLocationService.searchPlace(inputPlace);
        const selectedFeatureId = await selectACity(features);
        const selectedFeature = features.find(
          (feature) => feature.id === selectedFeatureId
        )!;

        const { bbox } = selectedFeature;
        const { temp, temp_min, temp_max } =
          (await searchLocationService.searchTemp(bbox?.[1], bbox?.[0])) ?? {};

        console.log(`Ciudad: ${selectedFeature.place_name}
          Lat: ${bbox?.[1]}
          Lng: ${bbox?.[0]}
          Temp: ${temp},
          TempMin: ${temp_min}
          TempMax: ${temp_max}
        `);

        searchLocationService.addToHistory(selectedFeature.place_name);
        break;

      case "History":
        console.log(searchLocationService.getHistory);
        break;
    }

    await pause();
  }
};

main();

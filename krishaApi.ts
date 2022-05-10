import {cities} from "./data";
import {select} from "./src/helpers/helpers";
import {CityId} from "./types";

export namespace KrishaApi {
  export const getDistrictsAsync = async (city: typeof cities[number]) => {
    const cityId = select(city, [
      ["nur-sultan", CityId.NurSultan],
      ["almaty", CityId.Almaty],
    ])
  }
}

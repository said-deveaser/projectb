import {getBigCitiesAsync} from '../../../parser/getStaticData';

export interface IBigCity {
  name: string
  alias: string
  id: number
}

export const BigCity = {
  get: () => {
    return getBigCitiesAsync()
  }
}

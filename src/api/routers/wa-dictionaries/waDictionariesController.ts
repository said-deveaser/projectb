import {IDistrictsData, getCityDistrictsAsync} from '../../../parser/getStaticData';
import {Controller, Get, Route} from 'tsoa';
import {BigCity, IBigCity} from '../../../db/models/BigCity/BigCity';

@Route('/api/wa-dictionaries')
export class WaDictionariesController extends Controller {
  @Get('/big-cities')
  public async getBigCities(): Promise<IBigCity[]> {
    try {
      return BigCity.get()
    } catch (e) {
      this.setStatus(500)
      console.error('Caught error', e)
      throw e
    }
  }
  @Get('/city-districts/{cityid}')
  public async getCityDistricts(cityid: string): Promise<IDistrictsData> {
    return getCityDistrictsAsync(parseInt(cityid))
  }
}

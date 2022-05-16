import {Parser} from './src/parser/parser';
import {PropertyAlias, PurchaseAlias} from './src/parser/types';

(async () => {
  // await getBigCitiesAsync().then(res => {
  //   console.log(res)
  // })
  // await getCityDistrictsAsync(2).then(res => {
  //   console.log(res)
  // })
  const url = Parser.makeUrlToParse({
    queryParams: {
      'das[price][from]': 10000000,
      'das[price][to]': 12000000,
    },
    purchaseType: PurchaseAlias.Arenda,
    district: 'almaty',
    propertyType: PropertyAlias.Kvartiry
  })
  console.log(url)
})()

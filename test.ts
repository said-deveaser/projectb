import {Parser} from './src/parser/parser';
import {PropertyAlias, PurchaseAlias} from './src/parser/types';

(async () => {
  // await getBigCitiesAsync().then(res => {
  //   console.log(res)
  // })
  // await getCityDistrictsAsync(2).then(res => {
  //   console.log(res)
  // })
  Parser.getPostsAsync({
    purchaseType: PurchaseAlias.Arenda,
    district: 'almaty',
    propertyType: PropertyAlias.Kvartiry
  }).then(res => {
    console.log(res)
  })


})()

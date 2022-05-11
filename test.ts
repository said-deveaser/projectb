import {getBigCitiesAsync, getCityDistrictsAsync} from './src/parser/getStaticData';

(async () => {
  await getBigCitiesAsync().then(res => {
    console.log(res)
  })
  await getCityDistrictsAsync(2).then(res => {
    console.log(res)
  })

})()

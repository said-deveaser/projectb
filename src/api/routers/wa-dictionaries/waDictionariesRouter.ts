import express from 'express';
import {withAuthMiddleware} from '../../middlewares/withAuthMiddleware';
import {getBigCitiesAsync, getCityDistrictsAsync} from '../../../parser/getStaticData';
import {StatusCode} from '../../types';
import {wrongParamsOrUrl} from '../../helpers/helpers';

export namespace WaDictionaries {
  export const routerEndpoint = '/wa-dictionaries'
  export const router = express.Router()

  router.use(withAuthMiddleware)

  router.get('/big-cities', (req,res) => {
    /*
     #swagger.description = 'Получить список крупных городов'
     #swagger.summary = 'Города'
     #swagger.tags = ['Справочники (Необходима авторизация)']
     #swagger.path = '/wa-dictionaries/big-cities'
     #swagger.parameters['user_token'] = {
       in: 'header',
       required: true,
       description: 'Токен юзера',
       type: 'string',
       schema: "token"
     }
     #swagger.responses[200] = {
         description: 'Список городов:',
         schema: { $ref: '#/definitions/BigCities' }
     } */
    getBigCitiesAsync().then(cities => {
      res.set({'Content-Type': 'application/json'});
      res.status(StatusCode.Ok)
      res.send(JSON.stringify(cities))
    })
  })
  router.get('/city-districts/:cityid', (req,res) => {
    /*
     #swagger.description = 'Получить список районов города'
     #swagger.summary = 'Районы'
     #swagger.path = '/wa-dictionaries/city-districts/{cityid}'
     #swagger.tags = ['Справочники (Необходима авторизация)']
     #swagger.parameters['cityid'] = {
       in: 'path',
       description: 'ID Города',
       required: true,
       type: Number
     }
     #swagger.parameters['user_token'] = {
       in: 'header',
       required: true,
       description: 'Токен юзера',
       type: 'string',
       schema: "token"
     }
     #swagger.responses[200] = {
       description: 'Список районов',
       schema: { $ref: '#/definitions/AllCityDistricts' }
     } */

    const cityId = parseInt(req.params['cityid'])
    if (isNaN(cityId)) {
      wrongParamsOrUrl(res)
      return
    }
    getCityDistrictsAsync(cityId).then(disctrict => {
      res.status(StatusCode.Ok)
      res.send(JSON.stringify(disctrict))
    })
  })
}

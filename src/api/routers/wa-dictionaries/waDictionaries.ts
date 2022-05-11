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
    // #swagger.description = 'Get all big cities'
    // #swagger.summary = 'Some summary...'
    /* #swagger.responses[200] = {
         description: 'Array of big cities',
         schema: { $ref: '#/definitions/BigCities' }

     } */
    getBigCitiesAsync().then(cities => {
      res.set({'Content-Type': 'application/json'});
      res.status(StatusCode.Ok)
      res.send(JSON.stringify(cities))
    })
  })
  router.get('/city-districts/:cityid', (req,res) => {
    /* #swagger.description = 'Get all districts related the BigCity'
    #swagger.parameters['cityid'] = {
      in: 'path',
      description: 'ID Города',
      required: true,
      type: Number
    }
    #swagger.responses[200] = {
      description: 'Array of big cities',
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

import express from 'express';
import {withAuthMiddleware} from '../../middlewares/withAuthMiddleware';
import {Parser} from '../../../parser/parser';
import {wrongParamsOrUrl} from '../../helpers/helpers';
import {PropertyAlias, PurchaseAlias} from '../../../parser/types';

export namespace ParserRouter {
  export const routerEndpoint = '/parser'
  export const router = express.Router()

  router.use(withAuthMiddleware)

  type IGetPostsQueryParams = Parser.MakeUrlOptions

  router.get('/posts', (req,res) => {
    const queryParams = req.query as never as Omit<IGetPostsQueryParams, 'queryParams'> & {
      price_from: string
      price_to: string
    }

    /*
     #swagger.description = 'Получить список 10 последних объявлений'
     #swagger.summary = 'Обяъявления (Необходима авторизация)'
     #swagger.tags = ['Парсер (Необходима авторизация)']
     #swagger.path = '/parser/posts'
     #swagger.parameters['purchaseType'] = {
       in: 'query',
       required: true,
       description: 'Продажа или Аренда',
       type: 'string',
       schema: "(arenda|prodazha)"
     }
     #swagger.parameters['propertyType'] = {
       in: 'query',
       required: true,
       description: 'Дома или Квартиры',
       type: 'string',
       schema: "(kvartiry|doma)"
     }
     #swagger.parameters['district'] = {
       in: 'query',
       required: false,
       description: 'Район или город (из справочника Районов)',
       type: 'string',
       schema: "(almaty|almaty-alatauskij)"
     }
     #swagger.parameters['price_from'] = {
       in: 'query',
       required: false,
       description: 'Цена от ...',
       type: 'string',
       schema: "100000"
     }
     #swagger.parameters['price_to'] = {
       in: 'query',
       required: false,
       description: 'Цена до ...',
       type: 'string',
       schema: "110000"
     }
     #swagger.parameters['user_token'] = {
       in: 'header',
       required: true,
       description: 'Токен юзера',
       type: 'string',
       schema: "token"
     }
     #swagger.responses[200] = {
         description: 'Список объявдений:',
         schema: { $ref: '#/definitions/BigCities' }
     } */


    if (!queryParams.propertyType || !queryParams.purchaseType) {
      wrongParamsOrUrl(res)
      return
    }

    if (!(Object.values(PropertyAlias).indexOf(queryParams.propertyType) > -1)) {
      wrongParamsOrUrl(res)
      return;
    }
    if (!(Object.values(PurchaseAlias).indexOf(queryParams.purchaseType) > -1)) {
      wrongParamsOrUrl(res)
      return;
    }


    res.send(JSON.stringify({
      test: Parser.makeUrlToParse({
        queryParams: {
          'das[price][from]': queryParams.price_from,
          'das[price][to]': queryParams.price_to,
        },
        ...queryParams
      })
    }))
  })
}

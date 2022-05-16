import dotenv from 'dotenv'
dotenv.config()
export const swaggerDoc = {
  // общая информация
  info: {
    title: 'KParser API',
    description: 'Документация к АПИ парсер одного не безизвестного сайта' +
      '\n * Где помечено (Права админа) нужно в заголовках указывать токен админа под ключом "adm_token"' +
      '\n * Где помечено (Необходима авторизация) нужно в заголовках указывать токен юзера под ключом "user_token"'
  },
  // что-то типа моделей
  definitions: {
    // Error
    'ErrorResponse (вместе со статусом ответа приходит)': {
      message: 'Описание ошибки'
    },
    'Post': {},
    'Posts': [{$ref: '#/definitions/Post'}],
    // модель задачи
    'BigCity': {
      name: 'Алматы',
      alias: 'Almaty',
      id: 2
    },
    // модель массива задач
    'BigCities': [
      {
        // ссылка на модель задачи
        $ref: '#/definitions/BigCity'
      }
    ],
    'CityDistrict': {
      id: 3,
      alias: 'almaty-alatauskij',
      name: 'Алатауский р-н',
      lat: 43.2813,
      lon: 76.852,
      zoom: 13,
      hasChildren: true,
      hasComplexes: false,
      isBigCity: false,
      type: 'district',
      parentId: 2,
      level: 3
    },
    'AllCityDistricts': {
      result: [{
        $ref: '#/definitions/CityDistrict'
      }],
      regionCount: 9,
      parent: {
        id: 2,
        lon: 76.9129,
        zoom: 11,
        type: 'city',
        hasComplexes: true,
        isSelectable: true
      }

    },
    // модель объекта с текстом новой задачи
    'Text': {
      text: 'test'
    },
    // модель объекта с изменениями существующей задачи
    'Changes': {
      changes: {
        text: 'test',
        done: true
      }
    }
  },
  basePath: '/api',
  host: process.env['API_HOSTNAME'],
  schemes: process.env['API_HOSTNAME'] === 'localhost:3000' ? ['http'] : ['https']
}

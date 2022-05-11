export const swaggerDoc = {
  // общая информация
  info: {
    title: 'KParser API',
    description: 'Документация к АПИ парсер одного не безизвестного сайта'
  },
  // что-то типа моделей
  definitions: {
    // модель задачи
    BigCity: {
      name: 'Алматы',
      alias: 'Almaty',
      id: 2
    },
    // модель массива задач
    BigCities: [
      {
        // ссылка на модель задачи
        $ref: '#/definitions/BigCity'
      }
    ],
    CityDistrict: {
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
    AllCityDistricts: {
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
    Text: {
      text: 'test'
    },
    // модель объекта с изменениями существующей задачи
    Changes: {
      changes: {
        text: 'test',
        done: true
      }
    }
  },
  host: 'localhost:3000',
  schemes: ['http']
}

import axios from 'axios';
import { parse } from 'node-html-parser';
import logging from '../core/Logging/Logging';
import {IBigCity} from '../db/models/BigCity/BigCity';

export const getBigCitiesAsync = async ():Promise<IBigCity[]> => {
  try {
    const urlToParseCities = 'https://krisha.kz/',
      optionsSelector = '.is-big-city'

    const htmlToParse = (await axios.get(urlToParseCities)).data
    const document = parse(htmlToParse)
    return document.querySelectorAll(optionsSelector).filter(el => {
      return el.getAttribute('data-type') === 'city'
    }).map((element):IBigCity => {
      return {
        name: element.getAttribute('data-name') || '',
        alias: element.getAttribute('data-alias') || '',
        id: parseInt(element.getAttribute('data-id') ?? '0'),
      }
    })
  } catch (e: any) {
    logging.error(`Failed in getCities (${__filename})`)
    console.error(e)
    throw e
  }
}

interface IDistrict {
  id: number,
  alias: string,
  name: string,
  lat: number,
  lon: number,
  zoom: number,
  hasChildren: boolean,
  hasComplexes: boolean,
  isBigCity: boolean,
  type: 'district'|'city',
  parentId: number,
  level: number
}
export interface IDistrictsData {
  result: IDistrict[],
  regionCount: number,
  parent: {
    id: number,
    lon: number,
    zoom: number,
    type: 'city',
    hasComplexes: boolean,
    isSelectable: boolean
  }
}
export const getCityDistrictsAsync = async (cityId:number) => {
  return (await axios(`https://krisha.kz/region/ajaxGetChildren/?id=${cityId}&add_all=1`, {
    headers: {
      'accept': 'application/json, text/javascript, */*; q=0.01',
      'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
      'cache-control': 'no-cache',
      'pragma': 'no-cache',
      'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'x-requested-with': 'XMLHttpRequest'
    },
    // "referrer": "https://krisha.kz/",
    // "referrerPolicy": "strict-origin-when-cross-origin",
    // "body": null,
    method: 'GET',
    // "mode": "cors",
    // "credentials": "include"
  })).data as IDistrictsData
}

import {PropertyAlias, PurchaseAlias} from './types';

export namespace Parser {
  interface MakeUrlQueryParams {
    'das[price][from]'?: string
    'das[price][to]'?: string
    // 'das[live.rooms]': number // 1-5
  }

  export interface MakeUrlOptions {
    purchaseType: PurchaseAlias
    propertyType: PropertyAlias
    district?: string
    queryParams?: MakeUrlQueryParams
  }
  export const makeUrlToParse = (params: MakeUrlOptions) => {
    let url = `https://krisha.kz/${params.purchaseType}/${params.propertyType}/`
    if (params.district) {
      url += `${params.district}/`
    }

    if (params.queryParams) {
      const newParams:MakeUrlQueryParams = {}
      const queryKeys: (keyof typeof params.queryParams)[] = Object.keys(params.queryParams) as (keyof typeof params.queryParams)[]
      for (let i = 0; i < queryKeys.length; i++) {
        if (params.queryParams[queryKeys[i]]) {
          newParams[queryKeys[i]] = params.queryParams[queryKeys[i]]
        }
      }
      const newPQK = Object.keys(newParams) as (keyof typeof params.queryParams)[]
      for (let i =0; i < newPQK.length; i ++) {
        if (i === 0) {
          url += `?${newPQK[i]}=${newParams[newPQK[i]]}`
          continue
        }
        url += `&${newPQK[i]}=${newParams[newPQK[i]]}`
      }
    }


    return url
  }
}

Parser.makeUrlToParse({
  propertyType: PropertyAlias.Doma,
  purchaseType: PurchaseAlias.Prodazha
})

import {PropertyAlias, PurchaseAlias} from './types';

export namespace Parser {
  export const makeUrlToParse = (params: {
    purchaseType: PurchaseAlias
    propertyType: PropertyAlias
  }) => {
    const url = `https://krisha.kz/${params.purchaseType}/${params.propertyType}/`
    return url
  }
}

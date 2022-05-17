import {PropertyAlias, PurchaseAlias} from './types';
import axios from "axios";
import {parse} from "node-html-parser";
import * as fs from "fs";
import e from "express";


export namespace Parser {
  const selectors = {
    postsWrapper: '.a-list',
    postWrapper: '[data-id]',
    postTitle: '.a-card__title',
    postPrice: '.a-card__price'
  }

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

  interface IPost {
    id: string | null
    title: string
    price: number
  }
  export const getPostsAsync = async (params: MakeUrlOptions):Promise<IPost[]> => {
    const html = (await axios.get(makeUrlToParse(params))).data
    const document = parse(html)
    const postsWrapper = document.querySelectorAll(selectors.postsWrapper)[0]
    if (!postsWrapper) {
      return []
    }
    const postElements = postsWrapper.querySelectorAll(selectors.postWrapper)
    return postElements.map((elem):IPost => {

      return  {
        id: elem.getAttribute('data-id') ?? null,
        title: elem.querySelector(selectors.postTitle)?.textContent ?? '',
        price: parseInt(elem.querySelector(selectors.postPrice)?.textContent?.replace(/[^0-9]/g, '') ?? '0'),

      }
    })


    // fs.writeFile('./in.html', postsWrapper.toString(), () => {
    //   console.log('succes')
    // })

  }

}

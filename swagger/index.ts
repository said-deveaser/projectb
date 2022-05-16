import { join } from 'path'
import swaggerAutogen from 'swagger-autogen'
import {swaggerDoc} from './doc';
import {endpointsFiles} from './endpointsFiles';
import dotenv from 'dotenv'
dotenv.config()

// путь и название генерируемого файла
const outputFile = join(__dirname, 'output.json')

swaggerAutogen(/*options*/)(outputFile, endpointsFiles, swaggerDoc).then(({ success }:any) => {
  console.log(`Generated: ${success}`)
})

import mongoose from 'mongoose';
import {dbUri} from './DBConfig';
import logging from '../core/Logging/Logging';
export namespace DBConnect {
  const connect: mongoose.Connection = mongoose.createConnection()

  const _connect = async () => {
    try {
      await connect.openUri(dbUri)
      logging.log('db connection success')
      return;
    } catch (e: any) {
      logging.error('DB Connection Error: ' + JSON.stringify(e))
      throw e
    }
  }

  export const connectAsync = async () => {
    if (connect.readyState === 0) {
      await _connect()
    }
    return connect
  }

  export const getConnection = () => {
    return connect
  }

}

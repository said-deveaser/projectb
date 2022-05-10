import mongoose from "mongoose";
import {dbUri} from "./DBConfig";
import logging from "../core/Logging/Logging";
export namespace DBConnect {
  let connect: mongoose.Connection

  const _connect = () => {
    try {
      connect = mongoose.createConnection(dbUri)
    } catch (e: any) {
      logging.error("DB Connection Error: " + JSON.stringify(e))
      throw e
    }
  }

  export const getConnectAsync =  () => {
    if (!connect) {
      _connect()
    }
    return connect
  }

}

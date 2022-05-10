import {DBConnect} from "./DBConnect";
import mongoose, {AnyObject, connection, model} from "mongoose";
import logging from "../core/Logging/Logging";

type DBItemConnectConstructorParams<Schema> = {
  modelName: string
  schema: mongoose.Schema<Schema>
}

class DBItemController<Schema> {
  private connection = DBConnect.getConnectAsync()
  private Model: mongoose.Model<Schema>;

  constructor(params: DBItemConnectConstructorParams<Schema>) {
    this.Model = connection.model<Schema>(params.modelName, params.schema)
  }

  addOne = (doc?: (mongoose.AnyKeys<Schema> & mongoose.AnyObject)) => {
    this.Model.create(doc, err => {
      if (err) {
        logging.error("add new model failed: " + JSON.stringify(err))
        throw err
      }
      logging.log("add new model successfully!")
    })
  }
}
const Schema = new mongoose.Schema({
  usename: String
})
const test = new DBItemController<typeof Schema>({
  modelName: "test",
  schema: Schema
})

export default DBItemController

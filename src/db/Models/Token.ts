import {Model, Schema} from 'mongoose';
import {DBConnect} from '../DBConnect';

const connection = DBConnect.getConnection()

interface IToken {
  token: string
  time_create: Date
  time_expired: Date
  authorized_expire_time: Date
  user_id?: string
}
interface ITokenMethods {
  isTokenActive: () => boolean
  isTokenRegistered: () => boolean
}

const tokenSchema = new Schema<IToken, Model<IToken, Record<string, unknown>, ITokenMethods>, ITokenMethods>({
  token: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: false
  },
  time_create: {
    type: Date,
    required: true
  },
  time_expired: {
    type: Date,
    required: true
  },
  authorized_expire_time: {
    type: Date,
    required: false
  },
})
tokenSchema.methods.isTokenActive = function () {
  const thisToken = this as never as IToken
  if (thisToken.user_id) {
    return thisToken.authorized_expire_time > (new Date())
  }
  return thisToken.time_expired > (new Date())
}

tokenSchema.methods.isTokenRegistered = function () {
  const thisToken = this as never as IToken
  return !!thisToken.user_id
}

export const Token = connection.model<IToken, Model<IToken, Record<string, unknown>, ITokenMethods>>('Token', tokenSchema)

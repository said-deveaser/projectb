import logging from '../core/Logging/Logging';
import {Secret} from 'jsonwebtoken';

export const PORT = process.env.PORT || 3000
export const JWT_SECRET_KEY: Secret = process.env.JWT_SECRET_KEY as Secret

if (!JWT_SECRET_KEY) {
  logging.error('ENV problem')
  throw 'ENV problem'
}

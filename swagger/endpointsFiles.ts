import {join} from 'path';

// массив путей к роутерам
export const endpointsFiles = [
  join(__dirname, '../src/api/routers/auth/authRouter.ts'),
  join(__dirname, '../src/api/routers/wa-dictionaries/waDictionariesRouter.ts'),
  join(__dirname, '../src/api/routers/parser/parserRouter.ts'),
]

import {join} from 'path';

// массив путей к роутерам
export const endpointsFiles = [
  join(__dirname, '../src/api/routers/auth/authRouter.ts'),
  join(__dirname, '../src/api/routers/wa-dictionaries/waDictionariesController.ts'),
]

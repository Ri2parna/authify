import dotenv from 'dotenv';
import path from 'path';

dotenv.config(path.resolve(__dirname, '/.env'));
export const connectionString = process.env.CONNECTION_STRING;
export const connectionPORT = process.env.PORT;

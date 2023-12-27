//import libs
import 'dotenv/config'
import express from 'express';
import cors from 'cors'

//import do projeto
import './shared/services/TranslationsYup'
import { router } from './routes/index'

const server = express();

//configs
server.use(cors());
server.use(express.json());
server.use(router);

export { server };
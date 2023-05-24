import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import rotasApi from './config/rotas.js';

const app = express();
app.use(cors());
app.use(express.json());

rotasApi(app);

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));
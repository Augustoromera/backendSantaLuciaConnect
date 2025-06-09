import express from 'express';
import morgan from 'morgan';
import router from './src/routes/index.js';
import routerAdmin from './src/routes/admin.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './src/models/db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 240,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use('/api', router);
app.use('/admin', routerAdmin);

connectDB();

app.get('/', (req, res) => {
  res.json({
      success: true,
      Response: "Server ON",
  })
});
app.listen(8080);
console.log('server en puerto', 8080);

export default app;

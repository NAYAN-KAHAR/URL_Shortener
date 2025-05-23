
import express from "express";
import cors from "cors";
import 'dotenv/config';
import helmet from 'helmet';
import mongoose from "./config/db.js";
import urlRoute  from './Routes/urlRoute.js'


// Initialize the Express app
const app = express();
const port = 3000;


app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(helmet());

mongoose.connection.on('open', () => {
  console.log('Database Connected');
});

mongoose.connection.on('error', (err) => {
  console.log('Database Connection Failed', err);
});

app.use('/api', urlRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

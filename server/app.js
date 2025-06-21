
import express from "express";
import cors from "cors";
import 'dotenv/config';
import helmet from 'helmet';
import mongoose from "./config/db.js";
import urlRoute  from './Routes/urlRoute.js'


// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 3000;

// CORS config
app.use(cors({
  origin: 'https://glittery-nasturtium-f8cd1f.netlify.app', // ✅ no trailing slash
  credentials: true
}));
app.options('*', cors()); // ✅ allow preflight requests

app.use(express.json());
app.use(helmet());

mongoose.connection.on('open', () => {
  console.log('Database Connected');
});

mongoose.connection.on('error', (err) => {
  console.log('Database Connection Failed', err);
});

app.use('/api', urlRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

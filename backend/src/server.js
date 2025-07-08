import express from 'express';
import dotenv from 'dotenv';
import servicesRouter from './routes/servicesRoute.js';
import cors from 'cors'

// for loading environment variables
dotenv.config();
// create the express instance
const app = express();
// read port from .env or fallback to port 3000
const PORT = process.env.PORT || 3000;

// using CORS so that frontend can easilyb access the data from backend or else it will be blocked
app.use(cors({
    origin: 'http://localhost:5173', // allow frontend
    credentials: true               // optional, only if using cookies
  }));

app.use(express.json());
app.use('/services', servicesRouter)

app.get('/', (req, res) => {
    res.send('Welcome to Nextbend Payment Gateway')
})


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
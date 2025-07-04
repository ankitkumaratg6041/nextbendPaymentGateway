import express from 'express';
import dotenv from 'dotenv';
import servicesRouter from './routes/servicesRoute.js';

// for loading environment variables
dotenv.config();
// create the express instance
const app = express();
// read port from .env or fallback to port 3000
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/services', servicesRouter)

app.get('/', (req, res) => {
    res.send('Welcome to Nextbend Payment Gateway')
})


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
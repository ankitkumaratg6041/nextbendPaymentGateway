import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import servicesRouter from './routes/servicesRoute.js';
import signupRouter from './routes/authRoutes.js';
import cookieParser from 'cookie-parser'; // to easily set and read cookies
import orderRouter from './routes/orderRoutes.js';
import requestRouter from './routes/clientRequestRoutes.js';
import adminRouter from './routes/adminRoutes.js';

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

app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/services', servicesRouter)
app.use('/auth', signupRouter);
app.use('/api', orderRouter);
app.use('/api', requestRouter)
app.use('/api/admin', adminRouter)


app.get('/', (req, res) => {
    res.send('Welcome to Nextbend Payment Gateway')
})


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
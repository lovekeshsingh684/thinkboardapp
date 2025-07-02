import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import notesRoutes from './routes/notesRoutes.js'
import { connectDB } from './config/db.js'
import rateLimiter from './middleware/ratelimiter.js'


dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

app.use(
    cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
}))
app.use(express.json())
app.use(rateLimiter)// Middleware to parse JSON bodies

app.use("/api/notes", notesRoutes)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Server is running on port:', PORT);
    });
})

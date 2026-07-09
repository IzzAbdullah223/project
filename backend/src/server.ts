import dotenv from "dotenv";
dotenv.config()
import express from 'express'
import './config/passport.js'
import { evaluationRouter } from "./routes/evaluation.routes.js";
import { authRouter } from "./routes/auth.routes.js";
import { projectRouter } from "./routes/project.routes.js";


const app = express()

 
app.use(express.json())

app.use('/api',evaluationRouter)
app.use('/api/auth',authRouter)
app.use('/api',projectRouter)


const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost: ${PORT}`)
})



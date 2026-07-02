import dotenv from "dotenv";
dotenv.config()
import express from 'express'

const app = express()

app.get("/",(req,res) =>{
    res.send("Hello World")
})

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost: ${PORT}`)
})



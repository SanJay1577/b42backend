// const express = require("express");
import express from "express"
import dotenv from "dotenv"
import { studentsRouter } from "./routes/students.js"
import cors from "cors"
import { userRouter } from "./routes/users.js"

// env configurations 
dotenv.config()

const PORT = process.env.PORT

// middle wares
const app = express();
app.use(express.json()) // middleware tells server to use json
app.use(cors())

app.get("/", (req, res)=>{
   res.send("Hello i'm working fine")
})

app.use("/students", studentsRouter)
app.use("/users", userRouter)

// http server initialization
app.listen(PORT, ()=>console.log(`server started localhost:${PORT}`))

// const secret = "hey i'm from new file"
//app.use(express.static("express")); // loading the static file
// app.get("/static", (req, res)=>{
//     res.sendFile(path.join(__dirname, "express/sum.txt"))
// })


import express from 'express';
import cors from "cors";
// const express = require('express')
const app = express();


// Cors Configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));



//Basic Configuration
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));


//import the routes
import healthCheckRouter from "./routes/healthcheck.routes.js";


//Mount the routes
app.use("/api/v1/healthcheck", healthCheckRouter);






app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/about', (req, res) => {
    res.send(`My name is ${process.env.name}!`)
})


export default app;

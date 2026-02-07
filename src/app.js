import express from 'express';
import cors from "cors";
import path from "path";
import {fileURLToPath} from 'url';
// const express = require('express')
const app = express();


// Cors Configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// serve static frontend
app.use(express.static(path.join(__dirname, "../public")));

//Basic Configuration
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));



//import the routes
import healthCheckRouter from "./routes/healthcheck.routes.js";
import registerRouter from "./routes/register.routes.js";


//Mount the routes
app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/", registerRouter);





app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/pages/register.html"));
})

app.get('/about', (req, res) => {
    res.send(`My name is ${process.env.name}!`)
})


export default app;

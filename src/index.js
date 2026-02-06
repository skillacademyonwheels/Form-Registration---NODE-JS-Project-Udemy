import dotenv from "dotenv";
import app from "./app.js"

//db Connection
// import connectDB from "./db/database-connect.js"

dotenv.config({
    path: "./.env",
});
const port = process.env.PORT || 3000;
// const port = 3000;



// connectDB()
//     .then(() => {
//         app.listen(port, () => {
//             console.log(`Example app listening on port http://localhost:${port}`)
//         });
//     })
//     .catch((err) => {
//         console.error("MongoDB Connection Error", err)
//         process.exit(1)
//     })

app.listen(port, () => {
            console.log(`Example app listening on port http://localhost:${port}`)
        });

console.log("Start of BackEnd today");


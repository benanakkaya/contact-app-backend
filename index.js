import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import userRoute from "./routes/userRoute.js"
import contactRoute from "./routes/contactRoute.js"
import groupRoute from "./routes/groupRoute.js";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";


dotenv.config();

const app = express();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
})

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.get("/", (req, res) => {
    res.send("Merhaba, Contact App Backend")
});

app.use("/users", userRoute);
app.use("/contacts", contactRoute);
app.use("/groups", groupRoute);
app.use(fileUpload({ useTempFiles: true }))



const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

app.listen(PORT, () => {
    console.log("Server is up this port: 5000");
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("connected to database")
    }).catch((err) => {
        console.log(err.message)
    })
})

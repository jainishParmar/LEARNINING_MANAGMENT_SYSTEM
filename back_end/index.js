import express from "express";
import 'dotenv/config'
import { connectDb } from "./database/dbConnect.js";


const app=express();
const PORT=process.env.PORT||8080
connectDb();
app.listen(PORT,()=>{
    console.log(`server is listeninig on port ${PORT}`);
})

import express from "express";
import 'dotenv/config'
import { connectDb } from "./database/dbConnect.js";
import userRouter from "./routes/userRoute.js"
import cookieParser from "cookie-parser";
import cors from "cors"


const app=express();
const PORT=process.env.PORT||8080
connectDb();
app.use(express.json());             
app.use(express.urlencoded());
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use("/api/v1/user",userRouter )


app.listen(PORT,()=>{
    console.log(`server is listeninig on port ${PORT}`);
})

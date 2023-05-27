import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import reserveSeats from "./controller/bookingController.js";
import getAllSeats  from "./controller/getAllSeats.js";
import connectDB from "./db/connect.js";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
dotenv.config();
connectDB()
const app = express();
app.use(express.json())

if (process.env.NODE_ENV==="development") {
    app.use(cors());
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname,"../frontend/public/")))
app.post("/api/seats",async(req,res)=>{
    try {
        console.log(req.body)
        const reserve_seats = req.body.reserve_seats;
    if (!reserve_seats) {
        return res.status(404).json({message:"reserve_seats is missing", status:"failed"})
    }
    let reserve_seats_number = Number.parseInt(reserve_seats); 
    if (isNaN(reserve_seats) || reserve_seats_number >7 || reserve_seats_number<1) {
        return res.status(404).json({message:"invalid reserve_seats", status:"failed"})
    }
    const data =  await reserveSeats(reserve_seats_number)
    if (typeof(data)==="string") {
        return res.status(404).json({message:data, status:"failed"})
        
    }
    res.json(data)
    } catch (error) {
     return res.status(500).json({message:error.message, status:"failed"})   
    }
})
app.get("/api/seats",async(req,res)=>{
    res.json(await getAllSeats());
})
app.listen(process.env.PORT||5000,()=>{
    console.log(`server started : http://localhost:${process.env.PORT||5000}`)
})
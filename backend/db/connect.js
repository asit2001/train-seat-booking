import { connect } from "mongoose";
import SeatReservationModel from "../model/SeatReservationModel.js";

export default async function connectDB() {
  try {
    await connect(
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/train_reservation"
    );
    console.log("connected to db");
    await SeatReservationModel.deleteMany({});
    let row = 1;
    for (let i = 1; i <= 80; i++) {
      await SeatReservationModel.create({
        row: row,
        seat_num: i,
        total_available: 7,
      });
      if (i % 7 === 0) row++;
    }
    console.log("inserted to database");
  } catch (error) {
    console.log("connect failed" + error.message);
  }
}

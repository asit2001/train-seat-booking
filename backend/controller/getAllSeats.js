import SeatReservationModel from "../model/SeatReservationModel.js";

export default async function getAllSeats() {
   try {
    return  await SeatReservationModel.find({})
   } catch (error) {
    return []
   }
}
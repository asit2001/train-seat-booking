import SeatReservationModel from "../model/SeatReservationModel.js";

export default async function reserveSeats(numSeats) {

  const documentsToUpdate = await SeatReservationModel.find({ booked: false })
  .sort({ row: 1, seat_num: 1 })
  .limit(numSeats);
  if (documentsToUpdate.length<numSeats) {
    return `number of free seats : ${documentsToUpdate.length}`;
  }
  const documentIds = documentsToUpdate.map(doc => doc._id);
  await SeatReservationModel.updateMany(
    { _id: { $in: documentIds } },
    { $set: { booked: true } }
  );

  return await SeatReservationModel.find({});
}

import { Schema,model} from 'mongoose'
const SeatReservationSchema = new Schema({
    row:{
        type:Number,
        required:true
    },
    booked:{
        type :Boolean,
        require:true,
        default:false
    },
    seat_num:{
        type :Number,
        required :true
    }
})
const SeatReservationModel = model("SeatReservation",SeatReservationSchema)
export default SeatReservationModel
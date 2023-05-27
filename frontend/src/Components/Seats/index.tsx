import { SeatsType } from "../../type";
import "./Style/Seats.css";
function Seats({ seats }: { seats: SeatsType[] }) {
  return (
    <ul>
      {seats.map &&
        seats.map(({ seat_num, booked, _id }) => {
          return (
            <li key={_id} className={booked ? "booked" : "free"}>
              {seat_num}
            </li>
          );
        })}
    </ul>
  );
}

export default Seats;

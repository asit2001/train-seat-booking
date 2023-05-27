import { FormEvent, useEffect, useState } from "react";
import "./App.css";
import { SeatsType } from "./type";
import Seats from "./Components/Seats";

function App() {
  const [seatNumbers, setSeatNumbers] = useState("");
  const [seats, setSeats] = useState<SeatsType[]>([]);
  const [error,setError] = useState("");
  useEffect(()=>{
    fetch(`${process.env.REACT_APP_URL}/api/seats`)
    .then(res=>res.json())
    .then(data=>setSeats(data));
  },[])


  async function bookTheSeats(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
      const res = await fetch(`${process.env.REACT_APP_URL}/api/seats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reserve_seats: seatNumbers }),
      });
      const data = (await res.json());
      if (res.ok) {
      setSeats(data as SeatsType[]);
    }else{
      setError(data.message)
    }
    
  }
  return (
    <div className="App">
      <h2 className="title">Book your train's Seat</h2>
      <form onSubmit={bookTheSeats}>
        <label className="label" htmlFor="seatNumbers">
          Enter Number of Seat
        </label>
        <input
          className="input"
          type="number"
          max={7}
          min={1}
          onChange={(e) => setSeatNumbers(e.target.value)}
          value={seatNumbers}
          id="seatNumbers"
          required
        />
        <button className="btn">book</button>
      </form>
      {error && <p className="error">{error}</p>}
      <Seats seats={seats}/>
    </div>
  );
}

export default App;

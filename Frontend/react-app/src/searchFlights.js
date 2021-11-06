import axios from 'axios';
import { useState } from 'react'


function SearchFlight() {
  const [values, setValues] = useState({
    FlightNumber: '',
    DepartureTime: '',
    ArrivalTime: '',
    EconomySeatsNumber: '',
    BuisnessSeatsNumber: '',
    DeparturePort: '',
    ArrivalPort: '',
  });

  const [flights, setFlights] = useState([]);

  const set = name => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({ ...oldValues, [name]: value }));
    }
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.post('http://localhost:8000/flight/searchFlight', values, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    })
      .then(function (result) {
        setFlights(result.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (

    <div className="container">
      <div className="searchflight-form">
        <form>
          <label >Flight Number :</label><br></br>
          <input type="text" id="FlightNumber" value={values.FlightNumber} onChange={set('FlightNumber')}  ></input><br></br>
          <label >Departure Time :</label><br></br>
          <input type="text" id="DepartureTime" value={values.DepartureTime} onChange={set('DepartureTime')}  ></input><br></br>
          <label >Arrival Time :</label><br></br>
          <input type="text" id="ArrivalTime" value={values.ArrivalTime} onChange={set('ArrivalTime')} ></input><br></br>
          <label >Economy Seats Number :</label><br></br>
          <input type="text" id="EconomySeatsNumber" value={values.EconomySeatsNumber} onChange={set('EconomySeatsNumber')} ></input><br></br>
          <label >Buisness Seats Number :</label><br></br>
          <input type="text" id="BuisnessSeatsNumber" value={values.BuisnessSeatsNumber} onChange={set('BuisnessSeatsNumber')}  ></input><br></br>
          <label >Departure Port : </label><br></br>
          <input type="text" id="DeparturePort" value={values.DeparturePort} onChange={set('DeparturePort')}  ></input><br></br>
          <label >Arrival Port : </label><br></br>
          <input type="text" id="ArrivalPort" value={values.ArrivalPort} onChange={set('ArrivalPort')}  ></input><br></br>
          <button type="button" onClick={(e) => { onSubmit(e) }}>search</button>
        </form>
      </div>

      <div id="flightsDisplay">
        {
          flights.map((f) =>
            <div className="row" key={f._id}>

              <p className="left-txt"> <b>Flight Number:{f.FlightNumber} </b> </p>
              <p className="left-txt"> <b>Departure Time:{f.DepartureTime} </b></p>
              <p className="left-txt"> <b>Economy Seats Number:{f.EconomySeatsNumber} </b></p>
              <p className="left-txt"> <b>Buisness Seats Number:{f.BuisnessSeatsNumber} </b></p>
              <p className="left-txt"> <b>Departure Port:{f.DeparturePort} </b></p>
              <p className="left-txt"> <b>Arrival Port:{f.ArrivalPort} </b></p>
              <p className="left-txt"> <b>Arrival Port:{f._id} </b></p>
              <button className="left-txt" onClick={(e) => { DeleteClickHandler(f) }}>  <b>Delete</b></button>
              <button className="left-txt" onClick={(e) => { UpdateClickHandler(f) }}>  <b>update</b></button>

            </div>
          )}
      </div>
    </div>
  )
}
export default SearchFlight;

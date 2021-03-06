import './App.css';
//import Navbar from './navbar';
// import Home from './home';
import { Component, useState, useEffect } from 'react';
import axios from 'axios'
import { confirm } from "react-confirm-box";
import { Link } from "react-router-dom";
import FlightDetails from './FlightDetails';
import "./listFlights.css";
import Grid from '@mui/material/Grid';
import { Avatar, createMuiTheme, FormControlLabel, ThemeProvider } from '@mui/material';
import ScreenSearchDesktopOutlinedIcon from '@mui/icons-material/ScreenSearchDesktopOutlined';
import Container from '@mui/material/Container';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
//import userRouter from '../../../backEnd/routes/UserRoutes';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#be8b14'
    },
    secondary: {
      main: '#000000'
    }
  }
})

function ListFlights() {
  const [flight, setFlight] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:150/flight/listFlights').then(
      (result) => {
        setFlight(result.data)


      })

  }, []);
 const DeleteClickHandler = async (flightObj) => {
    const id = flightObj._id;
    const result = await confirm("Are you sure to delete this flight?");
    if (result) {
      axios.delete('http://localhost:150/flight/deleteFlight/' + id)
        .then(function (response) {
          console.log(response);
          const newFlights = removeObjectFromArray(flight, flightObj);
          setFlight(newFlights);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    console.log("You click yes!");
    return;
  }

  console.log("You click No!");

  function UpdateClickHandler(flightObj) {
    const id = flightObj._id;
    window.location.href = `http://localhost:3000/updateFlight/${id}`
  }
  if(flight.length>0){
    return (
      <div>
        <div align="center">
        <ListAltOutlinedIcon  color="primary" className="icon" style={{fontSize:"200"}}/>
        </div>
          <div className="containerList">
          <div className="flex-containerList">

            {flight.map((f) =>
              <FlightDetails f={f} deleteHandler={DeleteClickHandler} updateHandler={UpdateClickHandler} />
            )}

        </div>
      </div>
      </div>
      
  );}
  else{
    return(
    <div>
      <h1>no flights available </h1>
    </div>
    )
  }
}

function removeObjectFromArray(flight, flightObj) {

  return flight.filter(function (ele) {
    return ele != flightObj;
  });


}
/*<div className="row" key={f._id}>
<p className="left-txt"> <b>Flight Number:{f.FlightNumber} </b> </p>
<p className="left-txt"> <b>Departure Time:{f.DepartureTime} </b></p>
<p className="left-txt"> <b>Arrival Time:{f.ArrivalTime} </b></p>
<p className="left-txt"> <b>Economy Seats Number:{f.EconomySeatsNumber} </b></p>
<p className="left-txt"> <b>Buisness Seats Number:{f.BuisnessSeatsNumber} </b></p>
<p className="left-txt"> <b>Departure Port:{f.DeparturePort} </b></p>
<p className="left-txt"> <b>Arrival Port:{f.ArrivalPort} </b></p>
<p className="left-txt"> <b>Departure Port:{f.DepartureTerminal} </b></p>
<p className="left-txt"> <b>Arrival Port:{f.ArrivalTerminal} </b></p>
<button className="left-txt" onClick={(e) => { DeleteClickHandler(f) }}>  <b>Delete</b></button>
<button className="left-txt" onClick={(e) => { UpdateClickHandler(f) }}>  <b>update</b></button>
</div>*/


export default ListFlights 
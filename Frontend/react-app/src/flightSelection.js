import './App.css';
//import Navbar from './navbar';
// import Home from './home';
import { Component, useState, useEffect } from 'react';
import axios from 'axios'
import { confirm } from "react-confirm-box";
import { Link } from "react-router-dom";
import FlightDetails from './FlightDetails';
import "./listFlights.css";
import FlightSelectionCard from "./flightSelectionCard.js";
import { useHistory } from "react-router-dom";
import ResponsiveAppBar from "./ResponsiveAppBar";
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import Grid from '@mui/material/Grid';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined';

//import userRouter from '../../../backEnd/routes/UserRoutes';

function FlightSelection() {
  const history = useHistory();
  const [flight, setFlight] = useState([]);
  const [cabin, setCabin] = useState();
  useEffect(() => {
    axios.get('http://localhost:150/flight/showFlights/').then(
      (result) => {
        console.log(result);
        setFlight(result.data);

      });
    axios.get('http://localhost:150/flight/getCabin').then(
      (result) => {
        console.log(result);
        setCabin(result.data);

      });



  }, []);

  const onSubmit = async (flightObj) => {
    const id = flightObj._id;
    axios.post('http://localhost:150/flight/setFlightID/' + id, flightObj)
      .then(
        history.push("/returnFlightSelection")

      )
      .catch(function (error) {
        console.log(error);

      });

  }
  if (flight.length >= 1) {
    return (
      <div>
        <div align="center">
        <FlightTakeoffOutlinedIcon color="primary" className="icon" style={{fontSize:"200"}}/>
        </div>
          <h1 className="title" style={{color:"#be8b14"}}>Choose Outgoing Flight </h1>
         

            {flight.map((f) =>
              <FlightSelectionCard f={f} cabin={cabin} submitHandler={onSubmit} />
            )}

     
      </div>
    );
  }
  else {
    return (
      <Grid style={{ marginTop: '120px' }} align="center" >
        <BlockOutlinedIcon color="primary" style={{ fontSize: "300" }} />
        <h1 style={{color:"#bd8b13"}}> No flights match your search criteria</h1>
      </Grid>
    )
  }

}





export default FlightSelection; 
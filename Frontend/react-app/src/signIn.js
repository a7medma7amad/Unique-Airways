import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { makeStyles } from '@mui/styles';
import { Avatar, createMuiTheme, FormControlLabel, ThemeProvider } from '@mui/material';
import { blueGrey, purple } from '@mui/material/colors';
import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { fontSize, typography } from '@mui/system';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import { useHistory } from 'react-router-dom'
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const axios = require('axios');
axios.defaults.withCredentials = true;


const theme = createMuiTheme({
  palette: {
    // primary:{
    // main:'#fefefe'
    // },
    secondary: {
      main: '#000000'
    }
  }
})

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',

  }
})

export default function SignIn() {
  const [open1, setOpen1] = React.useState(false);
      const handleClick1 = () => {
        setOpen1(true);
      };
    
      const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen1(false);
      };
      const [open2, setOpen2] = React.useState(false);
    
      const handleClick2 = () => {
        setOpen2(true);
      };
    
      const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen2(false);
      };
      const Alert = React.forwardRef(function Alert(props, ref) {
    
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
  const classes = useStyles();
  const history = useHistory();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsermameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [usernameErrorValidate, setUsermameErrorValidate] = useState(false)
  const [passwordErrorValidate, setPasswordErrorValidate] = useState(false)
  const paperStyle = { padding: 20, height: '60vh', width: 400, margin: "150px auto", minheight: '60vh' }
  const avatarStyle = { backgroundColor: '#be8b14' }

  const [BackendValidationResponse, setBackendValidationResponse] = useState('')
  const [BackendValidationError,setBackendValidationError]=useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setPasswordErrorValidate('')
    setUsermameErrorValidate('')

    setPasswordError(false)
    setUsermameError(false)

    if (password == '') {
      setPasswordError(true)
      setPasswordErrorValidate('password is required')
    }
    if (username == '') {
      setUsermameError(true)
      setUsermameErrorValidate('email is required')
    }

    if (username && password) {
      console.log(username, password)
    }

    if(username!='' && password!=''){
    axios.post('http://localhost:150/user/signIn', { Email: username, Password: password })
      .then((response) => {
        console.log(response.data)
        if (response.data!="success") {
          handleClick2()
          setBackendValidationResponse(response.data)
          setBackendValidationError(true)
        }
        else {
          console.log(response);
          history.push("/");
        }
      }).catch((error) => {
        
        console.log( error)
        
        
        
      });
  }
  
}
  return (


    <Container>

      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
            <h1>Sign in</h1>
          </Grid>

          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <TextField
              onChange={(e) => setUsername(e.target.value)}
              className={classes.field}
              label="Email"
              variant="outlined"
              placeholder="Enter Email"
              required S
              error={usernameError}
              helperText={usernameErrorValidate}
              style={{ width: '100%', margin: "8px 0" }}
            />

            <TextField
              onChange={(e) => setPassword(e.target.value)}
              className={classes.field}
              label="Password"
              placeholder="Enter Password"
              variant="outlined"
              required
              type='password'
              error={passwordError}
              helperText={passwordErrorValidate}
              style={{ width: '100%', margin: "8px 0" }}

            />
            <FormControlLabel
              control={
                <Checkbox
                  name="checkedB"
                  color="primary"
                />
              }
              label="Remember Me"
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              endIcon={<KeyboardArrowRightOutlinedIcon />}
              style={{ width: '100%', fontSize: 20, margin: '8px 0' }}
              
            >Sign In</Button>

              <Link to onClick={()=>{history.push('/editpassword')}}>Forgot Password</Link>

            <br />
            Not a member yet?
            <Link to onClick={()=>{history.push('/signup')}}>Sign Up!</Link>

            <Stack spacing={2} sx={{ width: '100%' }}>
      
      <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
        <Alert onClose={handleClose1} severity="success" sx={{ width: '100%' }}>
          z
        </Alert>
      </Snackbar>
      </Stack>
      <Stack spacing={2} sx={{ width: '100%' }}>
      
      <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
        <Alert onClose={handleClose2} severity="error" sx={{ width: '100%' }}>
        {BackendValidationResponse}
        </Alert>
      </Snackbar>
      </Stack>
          </form>
        </Paper>
      </Grid>
    </Container>



  );
}

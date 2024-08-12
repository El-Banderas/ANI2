import TextComponentPrimary from '../TextComponents/TextPrimary';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Login.scss';
import React, { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';

import axios from 'axios';

export default function Login({ urlBackend, logInDone, setURLBackend }) {
  
  const [password, setPassword] = useState("")
  const [passwordValid, setPasswordValid] = useState(true)
  const [urlValid, setURLValid] = useState(true)
  const [loading, setLoading] = useState(false)


  const changePassword = (value) => {
    setPassword(value)
  }

  const submit = () => {
    setLoading(true)
    console.log("SUBMIT")
    console.log(password)
    console.log(urlBackend)
    axios({
      method: 'put',
      url: `${urlBackend}/login`,
      data: { apiKey: password },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(
      function (response) {
        setLoading(false)
        console.log("Sucess")
        setPasswordValid(true)
        setURLValid(true)
        logInDone()
      }
    ).catch(error => {
      setLoading(false)
      if (error["response"] === undefined) {
        console.log("invalid url")
        setURLValid(false)
        setPasswordValid(true)
      }
      else { console.log("Invalid password") 
      setPasswordValid(false)
      setURLValid(true)
}
    })
  }


  return (
    <div className="Login">
      <div className='flexVertical'>
        <TextComponentPrimary text={"Login"} size={30} />
        <TextField
          error={!passwordValid}
          label={!passwordValid && "Error"}
          id="PasswordTextField"
          defaultValue=""
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => changePassword(e.target.value)}
        />
        {/*URL backend part*/}
        <TextComponentPrimary text={"URL de backend"} size={30} />
        <TextField
          label={"Delete Later"}
          error={!urlValid}
          id="BackendURL"
          defaultValue={urlBackend}
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setURLBackend(e.target.value)}
        />
        <Button variant="outlined" onClick={() => submit()} style={{
          borderRadius: 10,
          backgroundColor: "#32DBC4",
          margin: "0% 0% 1% 0%",
          fontSize: "14px",
          color: "black",
          fontWeight: "lighter",
        }} ><TextComponentPrimary text={"Submeter"} size={16} fontWeightGiven={"regular"} /></Button>


        {loading && <CircularProgress />}

      </div>
    </div>
  );
}


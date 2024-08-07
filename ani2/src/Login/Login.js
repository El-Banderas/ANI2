import TextComponentPrimary from '../TextComponents/TextPrimary';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Login.scss';
import React, {useState} from "react";
import CircularProgress from '@mui/material/CircularProgress';

import axios from 'axios';

export default function Login({urlBackend, logInDone, setURLBackend}) {
  //const urlBackend = "https://backend-valm.onrender.com" 
  const [passowrd, setPassword] = useState("")
  const [passwordValid, setPasswordValid] = useState(true)
  const [loading, setLoading] = useState(false)


  const changePassword = (value) => {
    setPassword(value)
}
const submit = () => {
  setLoading(true)
        console.log("SUBMIT")
        console.log(passowrd)
        axios({
            method: 'put',
            url: `${urlBackend}/login`,
            data: {apiKey: passowrd},
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(
          function (response) {
            setLoading(false)
    if (response["data"] === "error") {
        setPasswordValid(false)
    }
    else{
      console.log("Sucess")
        setPasswordValid(true)
        logInDone()
    }
  }
        )
        }
      
       const getURLBackendterminal = () => {
        console.log("URL backend")
        console.log(urlBackend)
       } 
        // Change page
        // submissionDone()

     return (
    <div className="Login">
    <div className='flexVertical'>
    <TextComponentPrimary text={"Login"}  size={30}/>
<TextField
                error={!passwordValid}
                label={!passwordValid && "Error"}
                id="outlined-number"
                defaultValue=""
                size="small"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(e) => changePassword(e.target.value)}
            />
<Button variant="outlined" onClick={() => submit()} style={{
                borderRadius: 10,
                backgroundColor: "#32DBC4",
                margin: "0% 0% 1% 0%",
                fontSize: "14px",
                color: "black",
                fontWeight: "lighter",
            }} ><TextComponentPrimary text={"Submeter"} size={16} fontWeightGiven={"regular"} /></Button>

{/*URL backend part*/}
<TextComponentPrimary text={"URL de backend"}  size={30}/>
<TextField
                label={"?"}
                id="outlined-number"
                defaultValue={urlBackend}
                size="small"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(e) => setURLBackend(e.target.value)}
            />
<Button variant="outlined" onClick={() => getURLBackendterminal()} style={{
                borderRadius: 10,
                backgroundColor: "#32DBC4",
                margin: "0% 0% 1% 0%",
                fontSize: "14px",
                color: "black",
                fontWeight: "lighter",
            }} ><TextComponentPrimary text={"Mudar url backend"} size={16} fontWeightGiven={"regular"} /></Button>
     

            {loading && <CircularProgress />}

</div>
   </div>
  );
}


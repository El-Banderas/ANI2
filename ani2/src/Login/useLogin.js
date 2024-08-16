
import { useState } from "react";
import axios from 'axios';

export default function useLogin(urlBackend, logInDone, setURLBackend) {
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
        console.log("Response?")
        setLoading(false)
        console.log("Sucess")
        setPasswordValid(true)
        setURLValid(true)
        logInDone()
      }
    ).catch(error => {
      console.log("error?")
      setLoading(false)
      if (error["response"] === undefined) {
        console.log("invalid url")
        setURLValid(false)
        setPasswordValid(true)
      }
      else {
        console.log("Invalid password")
        setPasswordValid(false)
        setURLValid(true)
      }
    })
  }


  return { password, passwordValid, urlValid, loading, changePassword, submit };
}
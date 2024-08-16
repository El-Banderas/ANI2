import { useState, useEffect } from "react";
import axios from 'axios';


export default function useGetAllocations( urlBackend ) {
  /**
   * Default input, in case the server is down, to don't show error to user.
   */
 const [input, setInput] = useState([])

  
const getAttributions =  () => {
  /**
   * Should be better to design a new API endpoint, because this receives too much information.
   * But the endpoint should only retrieve tecns with allocated projects.
   * For that reason, the "tecns/all" is not selected.
   */
        console.log("[MAIN APP] GET initial attris")

        console.log(`${urlBackend}/tecns/efforts_w_stats`)
        axios.get(`${urlBackend}/tecns/efforts_w_stats`).then(
          (response) => {
            const cleanAnswer = response['data']['input']['technicians']
            const tecns_names =Object.keys(cleanAnswer)
            setInput(tecns_names)
          }
        ).catch(error => console.error(`Error: ${error}`))
    }


    useEffect(() => {
      getAttributions();
    },[]);


    
  return input;
}
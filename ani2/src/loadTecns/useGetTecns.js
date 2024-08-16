import { useEffect, useState } from "react";
import axios from 'axios';

export default function useGetTecns(urlBackend) {

  const [tecns, setTecns] = useState({})

  /**
   * Used when loading the component.
   */
  useEffect(() => {
    console.log(`${urlBackend}/tecns/all`)
    axios.get(`${urlBackend}/tecns/all`).then(
      (response) => {
        console.log("Receubeu resposta")
        const cleanAnswer = response['data']
        console.log(cleanAnswer)
        //setProjects([...cleanAnswer, ...cleanAnswer])
        setTecns(cleanAnswer["tecns"])
      }
    ).catch(error => console.error(`Error: ${error}`))
  }, [urlBackend]);

  return { tecns }
}
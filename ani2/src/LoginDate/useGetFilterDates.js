import axios from 'axios';
import { useState, useEffect } from "react";

export default function useGetFilterDates(urlBackend) {

  const [dateInitFromDB, setDateInitFromDB] = useState(null)
  const [dateEndFromDB, setDateEndFromDB] = useState(null)

  useEffect(() => {
    console.log("Get filter dates!!!")
    axios.get(`${urlBackend}/login/get_login_filter_dates`).then(
      (response) => {
        const dateInitFilter = response['data']['startFilterDate']
        const dateEndFilter = response['data']['endFilterDate']
        setDateInitFromDB(dateInitFilter)
        setDateEndFromDB(dateEndFilter)

        //setDateInit(dateInitFilter)
        //setDateEnd(dateEndFilter)
      }
    ).catch(error => console.error(`Error: ${error}`))
  }, [urlBackend]);

  return { dateInitFromDB, dateEndFromDB }
}
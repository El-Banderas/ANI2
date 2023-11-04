import React, { useEffect, useState } from "react";
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import CircularProgress from '@mui/material/CircularProgress';

export default function TaskPage({ request_word, name }) {

  const [info, setInfo] = useState({})
  useEffect(() => {
    getTaskInfo();
  }, [name]);

  const getTaskInfo = () => {
    console.log("GET task info")
    console.log(name)
    const regexpSize = /([0-9]+)/;
    const match = name.match(regexpSize);
    console.log(name)
    axios.get(`http://localhost:7999/?${request_word}=${name}`).then(
      (response) => {
        console.log("Receubeu resposta")
        const cleanAnswer = response['data']
        console.log(cleanAnswer)
        setInfo(cleanAnswer)
      }
    ).catch(error => console.error(`Error: ${error}`))
    //axios.get('http://localhost:7999/')
  }


  const convertInput = () => {
    console.log("CONVERT input")
    console.log(info)
    const header = []
    const content = []
    for (const [key, value] of Object.entries(info)) {
      header.push(<TableCell align="left">{key}</TableCell>)
      content.push(<TableCell align="left">{value}</TableCell>)
    }
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">

          <TableHead>
            <TableRow>
              {header}
            </TableRow>
          </TableHead>
          <TableBody>

            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {content}
            </TableRow>
          </TableBody>

        </Table>
      </TableContainer>
    )
  }

  return (
    <div className='verticalFlex'>
      <div className="nameLine ">

        {Object.keys(info).length >= 0 ?
          convertInput() :
          <CircularProgress color="inherit" />
        }

      </div>
    </div>

  )
}
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import './TaskMain.scss';
import TextComponentPrimary from "../TextComponents/TextPrimary";

import CircularProgress from '@mui/material/CircularProgress';

export default function TaskPage({ request_word, name, urlBackend }) {

  const [info, setInfo] = useState({})

  useEffect(() => {
    getTaskInfo();
  }, [name]);

  const getTaskInfo = () => {
    const regexpSize = /([0-9]+)/;
    const match = name.match(regexpSize);
    console.log(`${urlBackend}/${request_word}/?name='${name}'`)
    axios.get(`${urlBackend}/${request_word}/?name='${name}'`).then(
      (response) => {
        const cleanAnswer = response['data']
        setInfo(cleanAnswer)
      }
    ).catch(error => console.error(`Error: ${error}`))
  }

  const convertBooleanStr = boolValue => {
    return boolValue ? "Sim" : "Não"
  }

  const convertInput = () => {
    if (Object.keys(info).length == 0) {
      return <CircularProgress color="inherit" />
    }
    const header = []
    const content = []
    for (const [key, value] of Object.entries(info["data"])) {
      header.push(<TableCell key={key} align="center"><TextComponentPrimary text={key} size={16} fontWeightGiven={"bold"}/></TableCell>)
      typeof(value) === "boolean" ? 
      content.push(<TableCell key={key} align="center"> <TextComponentPrimary text={convertBooleanStr(value)} size={16} fontWeightGiven={"regular"}/></TableCell>) : 
      content.push(<TableCell key={key}  align="center"><TextComponentPrimary text={value} size={16} fontWeightGiven={"regular"}/></TableCell>)
    }
    const title = request_word === "proj" ? `Informação projeto` : `Informação técnico`

    return (
      <div className="center">
        <Stack
          direction="column"
          justifyContent="space-evenly"
          alignItems="center"
        >

      <div className="title">
      <TextComponentPrimary text={title} size={32} fontWeightGiven={"bold"}/>
</div>
          <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650, border: 2 }} style={{backgroundColor:'#32DBC4',  borderColor: 'grey'}} aria-label="simple table" >

              <TableHead>
                <TableRow >
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
        </Stack>
      </div>
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
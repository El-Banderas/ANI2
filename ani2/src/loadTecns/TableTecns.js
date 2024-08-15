import React, { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import axios from 'axios';
import Button from '@mui/material/Button';
import TextComponentPrimary from "../CommonComponents/TextComponents/TextPrimary";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import MomentUtils from "@date-io/moment";
import moment from "moment";
import "moment/locale/pt";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import useTable from "./useTable"
import useTecnsActive from "./useTecnsActive"


import './LoadTecns.scss'

export default function TableTecns({ tecns, urlBackend, submissionDone }) {
  const {changedTecns, changeActivePhase, checkTecnActive, setTecnDateOut} = useTecnsActive(tecns)
  //const changedTecns= {}
  const submit = () => {
    console.log("PUT tecn")
    console.log(changedTecns)
    axios({
      method: 'put',
      url: `${urlBackend}/tecns/update_info`,
      data: {
        "tecns": changedTecns
        //"name" : "AAA"
      }
    });
    // Change page
    submissionDone()
    console.log("Submit tecns")
    console.log(changedTecns)
  }

  

  const inputActive = (defaultValue, id, value) => {
    const title = "Ativo"
    const content = defaultValue === 1 ? "Sim" : "Não"
    return (
      <TextField
        id="outlined-number"
        label={title}
        defaultValue={content}
        size="small"
        select
        style={{ width: 120 }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => changeActivePhase(e.target.value, id, title)}>
        {["Sim", "Não"].map((state) => (
          <MenuItem key={state} value={state}>
            {state}
          </MenuItem>
        )
        )
        }
      </TextField>
    )
  }

  const {page, visibleRows, emptyRows, rowsPerPage, handleChangePage, handleChangeRowsPerPage} = useTable(tecns)

  const alignText = "center"

    

  const MyPickDate = ({ maybeDisabled, tecnId }) => {

    const dateIsSet = tecnId in changedTecns // && typeof(changedTecns[tecnId]["date"]) == "object"
    const valueDatePicker = dateIsSet ? changedTecns[tecnId]["date"] : new Date()
    return (
      <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={"pt"} >
        <DatePicker
          label="Selecionar data de saída"
          inputformat="dd-MMMM-yyyyy"
          mask="__/__/____"
          placeholder="dd/MM/yyyy"
          okLabel="Escolher"
          clearLabel="Limpar"
          cancelLabel="Cancelar"
          value={valueDatePicker}
          format="L"
          views={["year", "month", "date"]}
          disabled={maybeDisabled}
          onChange={(dateChanged) => setTecnDateOut(tecnId, dateChanged)}
        />
      </MuiPickersUtilsProvider>

    )
  }
  return (
    <div>
      <div className='table'>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align={alignText}>ID</TableCell>
                <TableCell align={alignText}> Nome</TableCell>
                <TableCell align={alignText}> Ativo</TableCell>
                <TableCell align={alignText}> Data saída </TableCell>
                <TableCell align={alignText}> Ano de vínculo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((tecn) => (
                <TableRow
                  key={tecn.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {tecn.id}
                  </TableCell>
                  <TableCell align={alignText}>{tecn.name}</TableCell>
                  <TableCell align={alignText}>{inputActive(tecn.active, tecn.id, "active")}</TableCell>
                  <TableCell align={alignText}>
                    <MyPickDate maybeDisabled={checkTecnActive(tecn.active, tecn.id)} tecnId={tecn.id} />
                  </TableCell>
                  <TableCell align={alignText}>{tecn.start_date}</TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tecns.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={"Técnicos por página"}
        />
      </div>
      <Button variant="outlined" onClick={() => submit()} style={{
        borderRadius: 10,
        backgroundColor: "#32DBC4",
        margin: "0% 0% 1% 0%",
        fontSize: "14px",
        color: "black",
        fontWeight: "lighter",
      }} ><TextComponentPrimary text={"Submeter"} size={16} fontWeightGiven={"regular"} /></Button>
    </div>
  )
}
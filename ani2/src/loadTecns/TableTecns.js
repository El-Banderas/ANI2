import React, {useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import axios from 'axios';
import Button from '@mui/material/Button';
import TextComponentPrimary from "../TextComponents/TextPrimary";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ptBR } from '@mui/x-date-pickers/locales';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MomentUtils from "@date-io/moment";
import moment from "moment";
import "moment/locale/pt";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";


import './LoadTecns.scss'

export default function TableTecns({ tecns, urlBackend, submissionDone }) {
  const [changedTecns, setChangedTecns] = useState({})
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

    const changeActivePhase = (new_value, id, title) => {

        const objIndex = tecns.findIndex((obj => obj.id === id));
        if (title === "Active") {
            // Convert string to value that DB could store
            const to_store = new_value ==="Sim" ? 1 : 0 
            tecns[objIndex].active = to_store
        }
        if (id in changedTecns){
          let copyChangedTecns = {...changedTecns}
          delete copyChangedTecns[id]
          setChangedTecns(old => ({
            ...copyChangedTecns
          }))
        }
        else{
          setChangedTecns({...changedTecns, [id] : {"answer" : new_value, date : new Date()}})
        }
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
                style = {{width: 120}}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(e) => changeActivePhase(e.target.value, id, title)}>
                { ["Sim", "Não"].map((state) => (
         <MenuItem key={state} value={state}>
         {state}
            </MenuItem> 
        )

                    
                )
}
             </TextField>
        )
    }

 
    const alignText = "center"

    // ----------------- Handle table -----------------------

    const orderBy = "ID"
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () =>
      tecns.slice().sort((a,b) => {
        if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
      }).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [orderBy, page, rowsPerPage, tecns],
  );

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tecns.length) : 0;

const checkTecnActive = (active, tecnId) => {
  const tecnSetInactive = tecnId in changedTecns && changedTecns[tecnId]["answer"] === "Não"
  // True => Disabled
  // If the tecn is not active, is out, the datepicker is disabled
  // If the tecn was changed to a state of "Não", it will allow do datepick
  return active === 0 || !tecnSetInactive
}

  const setTecnDateOut = (tecnId, date) => {
    const oldValue = changedTecns[tecnId]["answer"]
          setChangedTecns({...changedTecns, [tecnId] : {"answer" : oldValue, date : date._d}})
  }

    const MyPickDate = ({maybeDisabled, tecnId}) => {
      
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
                    height:  53 * emptyRows,
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
                labelRowsPerPage= {"Técnicos por página"}
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
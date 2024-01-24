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


import './LoadTecns.scss'

export default function TableTecns({ tecns, urlBackend, submissionDone }) {
  const [changedTecns, setChangedTecns] = useState({})
  //const changedTecns= {}
    const submit = () => {
        axios({
            method: 'put',
            url: `${urlBackend}/update_tecns`,
            data: {
                "tecns": changedTecns
                //"name" : "AAA"
            }
        });
        // Change page
        submissionDone()

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
          setChangedTecns({...changedTecns, [id] : new_value})
        }
}

const inputActive = (defaultValue, id, value) => {
        const title = "Active"
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
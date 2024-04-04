import React, { useState, useMemo, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import TextComponentPrimary from "../../TextComponents/TextPrimary";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { IconButton } from '@mui/material';
import './SecondPage.scss'

export default function TableProjs({ projsId, info, tecnId, changeTecn, possibleTecns}) {

  const [tecnsSelected, setSelectedTecns] = useState({});

  if (!possibleTecns.includes("")) {
  possibleTecns.push("")
  }

  const userChooseTecn = (projId1, tecnName) => {
    if(tecnName === null){
      let copyState = tecnsSelected
      delete copyState[projId1]
    setSelectedTecns({...copyState})
    }
    else{

    setSelectedTecns({...tecnsSelected, [projId1] : tecnName})
    }
  }

  const allProjsFiltered = Object.values(Object.fromEntries(Object.entries(info).filter(([k,v]) => projsId.includes(Number(k)))))
  
  const [projsFiltered, setProjsFilterd] = useState(allProjsFiltered);
  useEffect(() => {
    setProjsFilterd(allProjsFiltered)
    setSelectedTecns({})
  }, projsId)
  const sendChangeTecn = (projId) => {
    if (tecnsSelected[projId] !== undefined) {
      if (tecnsSelected[projId] !== tecnId) {
      changeTecn(Number(projId), tecnId, tecnsSelected[projId])
      const filteredProjs = projsFiltered.filter((projDict) => projDict.id !== projId)
      setProjsFilterd(filteredProjs)
      }
    }

  }

  const inputActive = (projId) => {
    const selectedTecn = tecnsSelected[projId] !== undefined ? tecnsSelected[projId] : ""

    return (
      <div className="horizontalFlexStart" key={projId}>
      <Autocomplete
        disablePortal
          fullWidth
        id="ProjectCard-searchTecn"
        onChange={(event, value) => userChooseTecn(projId, value)}
        value={selectedTecn}
        options={possibleTecns}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} key={`Opt-${params}`} label="Técnicos possíveis" />}
        getOptionLabel = {option => String(option)}
      />
      <IconButton children={<SendRoundedIcon />} onClick={() => sendChangeTecn(projId)} />
</div>
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

  const visibleRows = useMemo(
    () =>
      projsFiltered.slice().sort((a, b) => {
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
    [orderBy, page, rowsPerPage, projsFiltered, tecnId],
  );

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - projsFiltered.length) : 0;

  
const cleanDate = (date) => {
  return date.split(" ")[0]
}

  return (
    <div>
      <div className='tableBorder'>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align={alignText}>ID</TableCell>
                <TableCell align={alignText}>Sigla</TableCell>
                <TableCell align={alignText}>Data início</TableCell>
                <TableCell align={alignText}>Data fim</TableCell>
                <TableCell align={alignText}>Fase</TableCell>
                <TableCell align={alignText}>Tema</TableCell>
                <TableCell align={alignText}>Tipo</TableCell>
                <TableCell align={alignText}>Esforço</TableCell>
                <TableCell align={alignText}>Tecn. destino</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((infoProj) => (
                <TableRow
                  key={infoProj.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align={alignText} component="th" scope="row">{infoProj.id}</TableCell>
                  <TableCell align={alignText} component="th" scope="row">{infoProj.Sigla}</TableCell>
                  <TableCell align={alignText} component="th" scope="row">{cleanDate(infoProj["Data início"])}</TableCell>
                  <TableCell align={alignText} component="th" scope="row">{cleanDate(infoProj["Data fim"])}</TableCell>
                  <TableCell align={alignText} component="th" scope="row">{infoProj["Fase realizada"]}</TableCell>
                  <TableCell align={alignText} component="th" scope="row">{infoProj.Tema}</TableCell>
                  <TableCell align={alignText} component="th" scope="row">{infoProj.Tipo}</TableCell>
                  <TableCell align={alignText} component="th" scope="row">{infoProj.Esforço}</TableCell>
                  <TableCell align={alignText} component="th" scope="row">{inputActive(infoProj.id)}</TableCell>
                  
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
          count={projsFiltered.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={"Projetos por página"}
        />
      </div>
      
    </div>
  )
 
}
import React, { useState, useMemo, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { IconButton } from '@mui/material';
import './SecondPage.scss'
import useTableControls from "./useTableControls";

export default function TableProjs({ projsId, costsProjs, tecnId, changeTecn, possibleTecns}) {

  /**
   * Key = project id
   * Value = Tecn name
   */
  const [tecnsSelected, setSelectedTecns] = useState({});


   /** Relative to user selecting a tecn in the input box */
const userChooseTecn = (projId1, tecnName) => {
    //When the user have selected a tecn, but now he deletes him.
    if(tecnName === null){
      let copyState = tecnsSelected
      delete copyState[projId1]
    setSelectedTecns({...copyState})
    }
    else{

    setSelectedTecns({...tecnsSelected, [projId1] : tecnName})
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

 
   /** Relative to projects information */

  /**
   * Convert projects ids to their information, in a list format. 
   * Projects information is in costsProjs variable
   */
  const allProjsFiltered = Object.values(Object.fromEntries(Object.entries(costsProjs).filter(([k,v]) => projsId.includes(Number(k)))))
  
  const [projsFiltered, setProjsFilterd] = useState(allProjsFiltered);

  useEffect(() => {
    setProjsFilterd(allProjsFiltered)
    setSelectedTecns({})
  }, projsId)
  
  const sendChangeTecn = (projId) => {
    if (tecnsSelected[projId] !== undefined) {
      // If the destiny tecn is different from the current, update the project allocation 
      if (tecnsSelected[projId] !== tecnId) {
      changeTecn(Number(projId), tecnId, tecnsSelected[projId])
      // Delete the project from this state.
      const filteredProjs = projsFiltered.filter((projDict) => projDict.id !== projId)
      setProjsFilterd(filteredProjs)
      }
    }

  }




  const alignText = "center"
    
const cleanDate = (date) => {
  return date.split(" ")[0]
}
 
  const {visibleRows, emptyRows, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage} = useTableControls(projsFiltered, tecnId);

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
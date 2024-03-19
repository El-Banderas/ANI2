
import React, {useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


export default function TableProjs({ info }) {
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
      info.slice().sort((a,b) => {
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
    [orderBy, page, rowsPerPage, info],
  );

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - info.length) : 0;
    const alignText = "center"
return (
<div>
                        <TableContainer>
<Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align={alignText}>ID</TableCell>
                            <TableCell align={alignText}> Sigla</TableCell>
                            <TableCell align={alignText}> Data início</TableCell>
                            <TableCell align={alignText}> Data fim </TableCell>
                            <TableCell align={alignText}> Tecn. análise</TableCell>
                            <TableCell align={alignText}> Tecn. acompanhamento</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visibleRows.map((proj) => (
                            <TableRow
                                key={proj.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {proj["id"]}
                                </TableCell>
                                <TableCell align={alignText}>{proj["Sigla"]}</TableCell>
                                <TableCell align={alignText}>{proj["Data início"].split(" ")[0]}</TableCell>
                                <TableCell align={alignText}>{proj["Data fim"].split(" ")[0]}</TableCell>
                                <TableCell align={alignText}>{proj["Técnico análise"]}</TableCell>
                                <TableCell align={alignText}>{proj["Técnico acompanhamento"]}</TableCell>
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
          count={info.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage= {"Projetos por página"}
        />
        </div>

)
}
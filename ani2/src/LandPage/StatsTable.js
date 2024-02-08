import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function StatsTable({ input }) {

    const align = "center"

//return  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
return  <Table size="small" aria-label="a dense table">
     
        <TableBody >
          <TableRow>
              <TableCell className='cell' align={align} >Desvio padrão</TableCell>
              <TableCell  align={align} >{input['std']}</TableCell>
            </TableRow>
          <TableRow>
              <TableCell className='cell' align={align} >Amplitude</TableCell>
              <TableCell align={align} >{input['amp']}</TableCell>
            </TableRow>
          <TableRow>
              <TableCell className='cell' align={align} >Esforço máximo</TableCell>
              <TableCell align={align} >{input['max']}</TableCell>
            </TableRow>

          <TableRow>
              <TableCell className='cell' align={align} >Esforço mínimo</TableCell>
              <TableCell align={align} >{input['min']}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
}
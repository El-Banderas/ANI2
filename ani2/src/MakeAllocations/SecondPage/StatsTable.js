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
      {

          Object.entries(input)
            .map(([nameMetric, value]) =>
           <TableRow key={nameMetric}>
              <TableCell className='cell' align={align} >{nameMetric}</TableCell>
              <TableCell  align={align} >{value}</TableCell>
            </TableRow>
            )
      } 

        </TableBody>
      </Table>
    
}
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import axios from 'axios';
import Button from '@mui/material/Button';
import TextComponentPrimary from "../TextComponents/TextPrimary";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


import './LoadTecns.scss'

export default function TableTecns({ tecns, urlBackend, submissionDone }) {
    const submit = () => {
        console.log("[TableTecns] SUBMIT")
        console.log(tecns)
        axios({
            method: 'put',
            url: `${urlBackend}/update_tecns`,
            data: {
                "tecns": tecns
                //"name" : "AAA"
            }
        });
        // Change page
        submissionDone()

    }

    const changeActivePhase = (new_value, id, title) => {

        const objIndex = tecns.findIndex((obj => obj.id == id));
        if (title === "Active") {
            // Convert string to value that DB could store
            const to_store = new_value ==="Sim" ? 1 : 0 
            tecns[objIndex].active = to_store
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
    return (
        <div>
            <div className='table'>
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
                        {tecns.map((tecn) => (
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
                    </TableBody>
                </Table>
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
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


import './LoadProjects.scss'

export default function TableProjects({ projects, urlBackend, submissionDone }) {

    const submit = () => {
        console.log("SUBMIT")
        axios({
            method: 'put',
            url: `${urlBackend}/add_efforts`,
            data: {
                "projects": projects
                //"name" : "AAA"
            }
        });
        // Change page
        submissionDone()

    }

    const changeEffort = (value, idProject, type) => {
        const objIndex = projects.findIndex((obj => obj.id == idProject));
        if (type === "Esf. acompanhamento") {
            projects[objIndex].effort_accomp = value
        }
        else {
            projects[objIndex].effort_analisis = value

        }
    }

    const inputEffort = (defaultValue, id, value) => {
        const title = value === "effort_accomp" ? "Esf. acompanhamento" : "Esf. análise"
        return (
            <TextField
                id="outlined-number"
                label={title}
                type="number"
                defaultValue={defaultValue}
                size="small"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(e) => changeEffort(parseInt(e.target.value), id, title)}
            />
        )
    }

    return (
        <div>
            <div className='table'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Nome</TableCell>
                            <TableCell align="right">Área Temática</TableCell>
                            <TableCell align="right">Topologia</TableCell>
                            <TableCell align="right">Esf. previsto análise</TableCell>
                            <TableCell align="right">Esf. previsto acompanhamento</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map((project) => (
                            <TableRow
                                key={project.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {project.id}
                                </TableCell>
                                <TableCell align="right">{project.name}</TableCell>
                                <TableCell align="right">{project.area}</TableCell>
                                <TableCell align="right">{project.topology}</TableCell>
                                <TableCell align="right">{inputEffort(project.effort_analisis, project.id, "effort_analisis")}</TableCell>
                                <TableCell align="right">{inputEffort(project.effort_accomp, project.id, "effort_accomp")}</TableCell>
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
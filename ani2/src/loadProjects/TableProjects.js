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


import './LoadProjects.scss'

export default function TableProjects({ projects, urlBackend, submissionDone }) {

    const submit = () => {
        console.log("SUBMIT")
        console.log(projects)
        axios({
            method: 'put',
            url: `${urlBackend}/add_efforts`,
            data: {
                "projects": projects["projects"]
                //"name" : "AAA"
            }
        });
        // Change page
        submissionDone()

    }

    const changeCampProject = (value, idProject, type) => {
        const objIndex = projects["projects"].findIndex((obj => obj.id == idProject));
        if (type === "Esf. acompanhamento") {
            projects["projects"][objIndex].effort_accomp = value
        }
        else {
            if (type ===  "Esf. análise"){
            projects["projects"][objIndex].effort_analisis = value
        }
        else {

            projects["projects"][objIndex].phase = value
        }

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
                onChange={(e) => changeCampProject(parseInt(e.target.value), id, title)}
            />
        )
    }
const inputPhase = (defaultValue, id, value) => {
        const title = "Fase"
        return (
            <TextField
                id="outlined-number"
                label={title}
                defaultValue={defaultValue}
                size="small"
                select
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(e) => changeCampProject(e.target.value, id, title)}>
               {optionsPhases()}
             </TextField>
        )
    }

    const optionsPhases = () => {
        const phasesNames = projects["phase_names"] 
        return phasesNames.map((phaseName) => (
         <MenuItem key={phaseName} value={phaseName}>
         {phaseName}
            </MenuItem> 
        )
        
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
                            <TableCell align={alignText}> Área Temática</TableCell>
                            <TableCell align={alignText}> Topologia</TableCell>
                            <TableCell align={alignText}> Fase</TableCell>
                            <TableCell align={alignText}> Esf. previsto análise</TableCell>
                            <TableCell align={alignText}> Esf. previsto acompanhamento </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects["projects"].map((project) => (
                            <TableRow
                                key={project.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {project.id}
                                </TableCell>
                                <TableCell align={alignText}>{project.name}</TableCell>
                                <TableCell align={alignText}>{project.area}</TableCell>
                                <TableCell align={alignText}>{project.topology}</TableCell>
                                <TableCell align={alignText} style={{ width: 160 }}>{inputPhase(project.phase, project.id, "phase")}
                                
                                </TableCell>
                                <TableCell align={alignText}>{inputEffort(project.effort_analisis, project.id, "effort_analisis")}</TableCell>
                                <TableCell align={alignText}>{inputEffort(project.effort_accomp, project.id, "effort_accomp")}</TableCell>
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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Button from '@mui/material/Button';
import TextComponentPrimary from "TextComponents/TextPrimary";
import TextField from '@mui/material/TextField';
import React from "react";
import { getDate } from 'utils/convertDates'


import TablePagination from '@mui/material/TablePagination';


import './LoadProjects.scss'
import useTableControls from './useTableControls';
import useSubmitChanges from './useSubmitChanges';
import { InsertPageBreakOutlined } from '@mui/icons-material';

export default function TableProjects({ projects, urlBackend, submissionDone, unchangedInput, date, alreadyAllocated, setArgLastPage }) {

    const {changedProjs, setChangedProjs, submit} = useSubmitChanges(urlBackend, unchangedInput, date, submissionDone)

    const removeChange = (idProject, type, new_value) => {
        if (idProject in changedProjs) {
            let project_to_update = changedProjs[idProject]
            delete project_to_update[[type]]
            if (Object.keys(project_to_update).length === 0) {
                let copyProjects = { ...changedProjs }
                delete copyProjects[idProject]
                setChangedProjs(old => ({
                    ...copyProjects
                }))
            }
        }
        else {
            console.log("TABLE PROJECTS - Strange error, remove change but not in changes dict")
            console.log(idProject)
            console.log(changedProjs)

        }
    }

    const addChange = (idProject, type, new_value) => {
        if (idProject in changedProjs) {
            let project_to_update = changedProjs[idProject]
            project_to_update[[type]] = new_value.toString()
            setChangedProjs({ ...changedProjs, [idProject]: project_to_update })
        }
        else {
            const new_project = { [type]: new_value.toString() }
            setChangedProjs({ ...changedProjs, [idProject]: new_project })

        }
    }
    /*
    Here we do 2 things:
    - Change the variable projects, so the changes be consistent when user changes table page, and returns.
    - Change the variable "changeProjs", that is sent to backend, where it only changes the values.
      This way, if a project changes to a next phase, it will trigger allocation.
    So, we check if the change puts the value equal to the original. If the new value is equal to the original, 
    we remove the change, else, we add it.
    */
    const changeCampProject = (value, idProject, type) => {
        const objIndex = projects["projects"].findIndex((obj => obj.id === idProject));
        if (type === "Esf. acompanhamento") {
            if (unchangedInput["projects"][objIndex].effort_accomp === value) {
                removeChange(idProject, type, value)

            }
            else {
                addChange(idProject, type, value)
            }
            projects["projects"][objIndex].effort_accomp = value
        }
        else {
            if (type === "Esf. análise") {

                if (unchangedInput["projects"][objIndex].effort_analisis === value) {
                    removeChange(idProject, type, value)

                }
                else {
                    addChange(idProject, type, value)

                }
                projects["projects"][objIndex].effort_analisis = value
            }
            else {
                if (unchangedInput["projects"][objIndex].phase === value) {
                    removeChange(idProject, type, value)
                }
                else {

                    addChange(idProject, type, value)
                }
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
                onChange={(e) => changeCampProject(parseFloat(e.target.value), id, title)}
            />
        )
    }

    const getTecn = (info, phase) => {
        if (phase === "Analisis") {
            return info["Análise"].length > 0 ? info["Análise"][0] : "---"
        }
        if (phase === "Accomp") {
            return info["Acompanhamento"].length > 0 ? info["Acompanhamento"][0] : "---"
        }
        return <h6>Coisa</h6>
    }

    const alignText = "center"

    const {page, visibleRows, emptyRows, rowsPerPage, handleChangePage, handleChangeRowsPerPage} = useTableControls(projects)

    return (
        <div className='table'>
            <div >
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align={alignText} sortDirection="asc">ID</TableCell>
                                <TableCell align={alignText}> Nome</TableCell>
                                <TableCell align={alignText}> Área Temática</TableCell>
                                <TableCell align={alignText}> Tipologia</TableCell>
                                <TableCell align={alignText}> Fase</TableCell>
                                <TableCell align={alignText}> Esf. previsto análise</TableCell>
                                <TableCell align={alignText}> Técnico análise</TableCell>
                                <TableCell align={alignText}> Esf. previsto acompanhamento </TableCell>
                                <TableCell align={alignText}> Técnico acomp. </TableCell>
                                <TableCell align={alignText}> Data início </TableCell>
                                <TableCell align={alignText}> Data fim</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {visibleRows.map((project) => (
                                <TableRow
                                    key={project.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {project.id}
                                    </TableCell>
                                    <TableCell align={alignText}>{project.name}</TableCell>
                                    <TableCell align={alignText} style={{ height: 80 }}>{project.area}</TableCell>
                                    <TableCell align={alignText}>{project.topology}</TableCell>
                                    {!alreadyAllocated ?
                                        <>

                                            <TableCell align={alignText} style={{ width: 160 }}>{project.phase}</TableCell>
                                            <TableCell align={alignText}>{inputEffort(project.effort_analisis, project.id, "effort_analisis")}</TableCell>
                                            <TableCell align={alignText}>{getTecn(project.allocation, "Analisis")}</TableCell>
                                            <TableCell align={alignText}>{inputEffort(project.effort_accomp, project.id, "effort_accomp")}</TableCell>
                                            <TableCell align={alignText}>{getTecn(project.allocation, "Accomp")}</TableCell>
                                            <TableCell align={alignText}>{getDate(project.data_init)}</TableCell>
                                            <TableCell align={alignText}>{getDate(project.data_end)}</TableCell>
                                        </>
                                        :

                                        <>

                                            <TableCell align={alignText} style={{ width: 160 }}>{project.phase}</TableCell>

                                            <TableCell align={alignText}>{project.effort_analisis}</TableCell>
                                            <TableCell align={alignText}>{getTecn(project.allocation, "Analisis")}</TableCell>
                                            <TableCell align={alignText}>{project.effort_accomp}</TableCell>
                                            <TableCell align={alignText}>{getTecn(project.allocation, "Accomp")}</TableCell>
                                            <TableCell align={alignText}>{getDate(project.data_init)}</TableCell>
                                            <TableCell align={alignText}>{getDate(project.data_end)}</TableCell>
                                        </>
                                    }
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
                    count={projects["projects"].length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage={"Projetos por página"}
                />
            </div>
            {!alreadyAllocated &&
                <Button variant="outlined" onClick={() => submit()} style={{
                    borderRadius: 10,
                    backgroundColor: "#32DBC4",
                    margin: "0% 0% 1% 0%",
                    fontSize: "14px",
                    color: "black",
                    fontWeight: "lighter",
                }} ><TextComponentPrimary text={"Submeter"} size={16} fontWeightGiven={"regular"} /></Button>
            }
        </div>
    )
}
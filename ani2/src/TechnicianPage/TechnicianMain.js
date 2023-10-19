import './TechnicianMain.scss'
import TextField from '@mui/material/TextField';
import ProjectScroll from './ProjectsScroll'

export default function TechMain({ name, listTasks }) {

function goMainPage() {
  //window.location = 'http://localhost:3000'
  window.location = 'https://el-banderas.github.io/ANI2/'
}

    return (
        <div className='verticalFlex'>
            <div className="nameLine ">

                <div className='nameTec'> Olá {name}</div>
                <div className='caixaAvisos'>

                    <TextField
                        fullWidth
                        id="outlined-read-only-input"
                        label="Avisos"
                        defaultValue="- Acho que a nossa aplicação não devia ter avisos..."
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </div>
            </div>
            <div className='projectLine '>
                {/*<ProjectScroll name={"Projetos alocados"} listTasks={[...listTasks, ...listTasks, ...listTasks]} />*/}
                <ProjectScroll name={"Projetos alocados"} listTasks={[...listTasks, ...listTasks, ...listTasks]} />
                <ProjectScroll name={"Projetos Concluidos"} listTasks={listTasks} />

            </div>
        </div>
    )
}
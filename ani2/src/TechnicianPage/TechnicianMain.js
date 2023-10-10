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

                <div className='nameTec'> Hello {name}</div>
                <div className='caixaAvisos'>

                    <TextField
                        fullWidth
                        id="outlined-read-only-input"
                        label="Avisos"
                        defaultValue="- Aqui aparecerão os avisos ou outra coisa qualquer"
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
                 <button type="button" onClick={() => goMainPage()}>Go to Tec page</button>
        </div>
    )
}
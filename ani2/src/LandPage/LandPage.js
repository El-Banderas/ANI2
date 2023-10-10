import ManyTechsGraph from "./ManyTechsGraph";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './LandPage.scss';

export default function LandPage({ input }) {
function goTec() {
  window.location = 'https://el-banderas.github.io/ANI2/TECNaoseiQual'
}

    return (
        <div>
            <h1>Land page</h1>
            <div className="line">

                <ManyTechsGraph className="tabelTecs" input={input} />
                <Stack
  direction="column"
  justifyContent="space-evenly"
  alignItems="center"
  spacing={2}
className="btnsColumn"
>
                    <Button variant="outlined">Correr alocação</Button>
                    <Button variant="outlined" href="#outlined-buttons">
                        Adicionar Projeto
                    </Button>

                    <Button variant="outlined">Retirar projeto</Button>
                 <button type="button" onClick={() => goTec()}>Go to Tec page</button>
                </Stack>
            </div>
        </div>
    )
}
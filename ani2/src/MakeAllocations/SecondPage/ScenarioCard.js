
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextComponentPrimary from '../../TextComponents/TextPrimary';

export default function ScenarioCard({ info, setScenario, metrics }) {
return (
<div >
        <Card sx={{ minWidth: 275 , maxWidth: 400}}>
      <CardContent className="card">
            <TextComponentPrimary text={info} size={20} fontWeightGiven={"bold"} />
<div className='tables'>

          <div className="littleBox">
            <TextComponentPrimary text={"Média: "} size={14} fontWeightGiven={'Bold'} />
            <TextComponentPrimary text={metrics["Média"]} size={14} fontWeightGiven={'regular'} />
          </div>

          <div className="littleBox">
            <TextComponentPrimary text={"Desv. Padrão"} size={14} fontWeightGiven={'Bold'} />
            <TextComponentPrimary text={metrics["Std. Dev."]} size={14} fontWeightGiven={'regular'} />
          </div>
        </div>
 </CardContent>
      <CardActions>
        <Button size="small" onClick={() => setScenario(info)}>Selecionar</Button>
      </CardActions>
    </Card>
</div>
)
}
import { LineChart, ChartsItemTooltipContent } from '@mui/x-charts';

import { ChartsTooltip } from '@mui/x-charts';

import './LineGraph.scss'

export default function LineGraph({ years ,list_tecns  }){
  // Check this cool stuff:
  // https://mui.com/x/react-charts/line-demo/
return (
  <div className='lineGraph'> 
  { list_tecns.length == 0 && <h1>Nada selecionado</h1> } 
  { list_tecns.length > 0 && 
    <LineChart
      xAxis={[
        {
          id: 'Years',
          data: years,
          scaleType: 'time',
          valueFormatter: (date) => date.getFullYear().toString(),
        },
      ]}
      series={
        list_tecns.map(tecn => {
          return {
            id: tecn.TecName,
            label: tecn.TecName,
            data: tecn.efforts,
            showMark: false
          }
        }) 
        }
      width={900}
      height={400}
      margin={{ left: 70 }}
      tooltip={{ trigger: 'item' }}
       slotProps={{ legend: { hidden: true } }}
      
    > 
    
    </ LineChart>
      }
</div>
  );
}

import { Bar } from 'react-chartjs-2';
import StatsTable from './StatsTable';
export default function EffortsGraph({ current_efforts, allocations, costsProjs}) {

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Esforços totais por técnico",
      },
    },
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 90
        }
      }],
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Técnicos"
        }
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Horas de trabalho"
        }
      },
    },
  };



  //const labels = ['Técnico 0', 'Técnico 1', 'Técnico 2', 'Técnico 3', 'Técnico 4', 'Técnico 5', 'Técnico 6', 'Técnico 7', 'Técnico 8', 'Técnico 9', 'Técnico 10', 'Técnico 11', 'Técnico 12', 'Técnico 13', 'Técnico 14', 'Técnico 15', 'Técnico 16', 'Técnico 17', 'Técnico 18', 'Técnico 19', 'Técnico 20', 'Técnico 21', 'Técnico 22', 'Técnico 23', 'Técnico 24', 'Técnico 25', 'Técnico 26', 'Técnico 27', 'Técnico 28', 'Técnico 29', 'Técnico 30', 'Técnico 31', 'Técnico 32']
  const labels = Object.keys(current_efforts).sort()
  const getEffortsCurrentAllcoation = () => {
    const currsEffort = []
    for (const tecnId of labels) {
      if (allocations[tecnId] !== undefined) {
        let costThisTecn = 0
        for (const projId of allocations[tecnId]) {
          costThisTecn += parseInt(costsProjs[projId]["Esforço"])
        }
        currsEffort.push(costThisTecn)
      }
      else {
        currsEffort.push(0)
      }
    }
    return currsEffort
  }
  const current_efforts_tecns = labels.map((tecnId) => current_efforts[tecnId])
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Esforços anteriores',
        data: current_efforts_tecns,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Esforços alocados',
        data: getEffortsCurrentAllcoation(),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
const average = arr => parseInt(arr.reduce( ( p, c ) => p + c, 0 ) / arr.length);

function getStandardDeviation (array) {
  const n = array.length
  const mean = array.reduce((a, b) => a + b) / n
  return parseInt(Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n))
}

  const metrics = () => {
    const allocationEfforts = getEffortsCurrentAllcoation()
    const totalEfforts = current_efforts_tecns.map(function (num, idx) {
      return num + allocationEfforts[idx];
    })

  const indexOfLargestValue = totalEfforts.reduce((maxIndex, currentValue, currentIndex, array) => currentValue > array[maxIndex] ? currentIndex : maxIndex, 0);
    const maxValue = parseInt(totalEfforts[indexOfLargestValue])
    const maxValueTecn = labels[indexOfLargestValue]
  const indexOfLowerValue = totalEfforts.reduce((maxIndex, currentValue, currentIndex, array) => currentValue < array[maxIndex] ? currentIndex : maxIndex, 0);
    const minValue = parseInt(totalEfforts[indexOfLowerValue])
    const minValueTecn = labels[indexOfLowerValue]
    return { 'Média': average(totalEfforts), 'Desvio padrão': getStandardDeviation(totalEfforts)
            , 'Amplitude': maxValue-minValue, 'Máximo': `${maxValueTecn} (${maxValue})`, 'Mínimo': `${minValueTecn} (${minValue})` }
  }
  return (
    <div className='horizontalFlex1'>
      <Bar
        className='growBarChart'
        options={options}
        data={data}
      />
      <div className='statsTable'>
        <StatsTable input={metrics()} />
      </div>
    </div>
  )
} 


import { Bar } from 'react-chartjs-2';
import StatsTable from './StatsTable';
import React, { useState } from "react";

import TextComponentPrimary from "../../TextComponents/TextPrimary";
import Button from '@mui/material/Button';

export default function EffortsGraph({ current_efforts, allocations, costsProjs, totalWorkHours }) {

  const labels = Object.keys(current_efforts).sort()
  
  const current_efforts_tecns = labels.map((tecnId) => current_efforts[tecnId])

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
  // Used to calculate if option of select max is showed or not
  const allocationEfforts1 = getEffortsCurrentAllcoation()
  const totalEfforts1 = current_efforts_tecns.map(function (num, idx) {
    return num + allocationEfforts1[idx];
  })
  const indexOfLargestValue1 = totalEfforts1.reduce((maxIndex, currentValue, currentIndex, array) => currentValue > array[maxIndex] ? currentIndex : maxIndex, 0);
  const maxEffort = parseInt(totalEfforts1[indexOfLargestValue1])
  
  const showOptionChangeTotalEffort = totalWorkHours > maxEffort * 1.1
  
  const [totalWork, setTotalWork] = useState(true);
  
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Esforços totais por técnico",
      },
    },
    scales: {
      x: [{
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
        },
        max: totalWork ? Math.max(Math.floor(totalWorkHours * 1.1), parseInt(maxEffort*1.1)) : undefined,
      },
    },
  };

  const switchShowTotalWorkHours = () => {
    setTotalWork(!totalWork)
  }



  //const labels = ['Técnico 0', 'Técnico 1', 'Técnico 2', 'Técnico 3', 'Técnico 4', 'Técnico 5', 'Técnico 6', 'Técnico 7', 'Técnico 8', 'Técnico 9', 'Técnico 10', 'Técnico 11', 'Técnico 12', 'Técnico 13', 'Técnico 14', 'Técnico 15', 'Técnico 16', 'Técnico 17', 'Técnico 18', 'Técnico 19', 'Técnico 20', 'Técnico 21', 'Técnico 22', 'Técnico 23', 'Técnico 24', 'Técnico 25', 'Técnico 26', 'Técnico 27', 'Técnico 28', 'Técnico 29', 'Técnico 30', 'Técnico 31', 'Técnico 32']
  const datasets1 = [
    {
      label: 'Esforços alocados',
      data: current_efforts_tecns,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Esforços a alocar',
      data: getEffortsCurrentAllcoation(),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Média',
      data: [],
      backgroundColor: 'black',
    },


    {
      type: 'line',
      label: 'Média +/- Desvio padrão',
      data: [],
      //borderDash: [30, 10],
      //backgroundColor: "transparent",
      //borderColor: "grey",
      backgroundColor: "grey",

    },
    {
      label: 'Capacidade máxima',
      data: [],
      backgroundColor: 'red',
    },
  ]

  const data = {
    labels: labels,
    datasets: totalWork ? datasets1 : datasets1.slice(0, -1)
  };



  const average = arr => parseInt(arr.reduce((p, c) => p + c, 0) / arr.length);

  function getStandardDeviation(array) {
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

    return {
      'Média': average(totalEfforts), 'Desvio padrão': getStandardDeviation(totalEfforts)
      , 'Amplitude': maxValue - minValue, 'Esforço Máximo': `${maxValueTecn} (${maxValue})`,
      'Esforço Mínimo': `${minValueTecn} (${minValue})`,
      'Desvio máximo': `${maxValue - average(totalEfforts)}`,
      'Desvio mínimo': `${Math.min(average(totalEfforts) - minValue, 0)}`,
      'Total de horas': `${totalWorkHours}`
    }
  }
  const metricsCalculated = metrics()



  const myLine = {
    id: 'myLine',
    beforeDatasetsDraw(chart, args, plugin) {
      const { ctx, scales: { x, y }, chartArea: { left, right } } = chart;
      ctx.save();
      function drawLine(lineColor, yCoor, dotted) {
        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        const valueDotted = dotted ? 6 : 0
        ctx.setLineDash([valueDotted, valueDotted])
        ctx.lineWidth = 1;
        ctx.moveTo(left, y.getPixelForValue(yCoor))
        ctx.lineTo(right, y.getPixelForValue(yCoor))
        ctx.stroke()
      }
      drawLine('black', metricsCalculated["Média"], false)
      drawLine('grey', metricsCalculated["Média"] + metricsCalculated["Desvio padrão"], true)
      drawLine('grey', Math.max(0, metricsCalculated["Média"] - metricsCalculated["Desvio padrão"]), true)

    }
  }
  const myLineRed = {
    id: 'myLine',
    beforeDatasetsDraw(chart, args, plugin) {
      const { ctx, scales: { x, y }, chartArea: { left, right } } = chart;
      ctx.save();
      function drawLine(lineColor, yCoor, dotted) {
        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        const valueDotted = dotted ? 6 : 0
        ctx.setLineDash([valueDotted, valueDotted])
        ctx.lineWidth = 1;
        ctx.moveTo(left, y.getPixelForValue(yCoor))
        ctx.lineTo(right, y.getPixelForValue(yCoor))
        ctx.stroke()

      }
      drawLine('black', metricsCalculated["Média"], false)
      drawLine('grey', metricsCalculated["Média"] + metricsCalculated["Desvio padrão"], true)
      drawLine('grey', Math.max(0, metricsCalculated["Média"] - metricsCalculated["Desvio padrão"]), true)

      drawLine('red', totalWorkHours, false)

    }
  }
  const button = (onClicki, text) => {
    return (
      <Button variant="outlined" onClick={onClicki} style={{
        borderRadius: 10,
        backgroundColor: "#32DBC4",
        margin: "0% 0% 1% 0%",
        fontSize: "14px",
        color: "black",
        fontWeight: "lighter",
      }} ><TextComponentPrimary text={text} size={16} fontWeightGiven={"regular"} /></Button>

    )
  }
  return (
    <div className='horizontalFlex1' >

      {totalWork ?
        <Bar
          className='growBarChart'
          options={options}
          data={data}
          plugins={[myLineRed]}
        />
        :
        <Bar
          className='growBarChart'
          options={options}
          data={data}
          plugins={[myLine]}
        />
      }

      <div className='verticalFlex'>
        <div className='statsTable'>
          <StatsTable input={metrics()} />
        </div>
        {showOptionChangeTotalEffort && button(switchShowTotalWorkHours, "Visualizar capacidade máxima")}
      </div>
    </div>
  )
} 

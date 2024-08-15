
import { Bar } from 'react-chartjs-2';
import StatsTable from './StatsTable';
import React, { useState } from "react";

import MyButton from 'CommonComponents/MyButton';
import useMetrics from './useMetrics';
import useCalculateEfforts from './useCalculateEfforts';
import 'chart.js/auto'
import './GraphAndStats.scss';

/**
 * 
 * @param {dict[string, float]} old_efforts Constant efforts, showed in the graph with red colour 
 * @returns 
 */
export default function EffortsGraph({ old_efforts, allocations, costsProjs, totalWorkHours }) {

  const workers_ids = Object.keys(old_efforts).sort()

  const { old_efforts_in_list, efforts_current_allocation, total_efforts } = useCalculateEfforts(workers_ids, old_efforts, costsProjs, allocations);

  const indexOfLargestValue = total_efforts.reduce((maxIndex, currentValue, currentIndex, array) => currentValue > array[maxIndex] ? currentIndex : maxIndex, 0);
  const maxEffort = parseInt(total_efforts[indexOfLargestValue])

  const showOptionChangeTotalEffort = totalWorkHours > maxEffort * 1.1

  const [showTotalWork, setShowTotalWork] = useState(true);

  /**
   * Describes graph title, axis titles, and max y value. 
   */
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
        max: showTotalWork ? Math.max(Math.floor(totalWorkHours * 1.1), parseInt(maxEffort * 1.1)) : undefined,
      },
    },
  };

  // What is presented in the graph
  const datasets1 = [
    {
      label: 'Esforços alocados',
      data: old_efforts_in_list,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Esforços a alocar',
      data: efforts_current_allocation,
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
      // If you want to explore different types of lines
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
    labels: workers_ids,
    // Show or not show max capacity
    datasets: showTotalWork ? datasets1 : datasets1.slice(0, -1)
  };


  const { metricsCalculated } = useMetrics(workers_ids, total_efforts, totalWorkHours)

  const metricsLines = {
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
      if (showTotalWork) drawLine('red', totalWorkHours, false)

    }
  }

  const switchShowTotalWorkHours = () => {
    setShowTotalWork(!showTotalWork)
  }

  return (
    <div className='horizontalFlex1' >

      <Bar
        className='growBarChart'
        options={options}
        data={data}
        plugins={[metricsLines]}
      />

      <div className='verticalFlex'>
        <div className='statsTable'>
          <StatsTable input={metricsCalculated} />
        </div>
        {showOptionChangeTotalEffort && <MyButton text={"Visualizar capacidade máxima"} onClicki={switchShowTotalWorkHours} />}
      </div>
    </div>
  )
} 

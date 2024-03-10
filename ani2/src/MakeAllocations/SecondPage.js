import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


export default function SecondPage({}) {

const options = {
        plugins: {
            title: {
                display: true,
                text: "AAA",
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
                    display : true,
                    text : "Técnicos"
                }
            },
            y: {
                stacked: true,
                title: {
                    display : true,
                    text : "Horas de trabalho"
                }
            },
        },
        maintainaspectratio: false,
    };
    const labels = ['Técnico 0', 'Técnico 1', 'Técnico 2', 'Técnico 3', 'Técnico 4', 'Técnico 5', 'Técnico 6', 'Técnico 7', 'Técnico 8', 'Técnico 9', 'Técnico 10', 'Técnico 11', 'Técnico 12', 'Técnico 13', 'Técnico 14', 'Técnico 15', 'Técnico 16', 'Técnico 17', 'Técnico 18', 'Técnico 19', 'Técnico 20', 'Técnico 21', 'Técnico 22', 'Técnico 23', 'Técnico 24', 'Técnico 25', 'Técnico 26', 'Técnico 27', 'Técnico 28', 'Técnico 29', 'Técnico 30', 'Técnico 31', 'Técnico 32']
     const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => 3 ),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => 4 ),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};


return (
<Bar
  options={options}
  data={data}
/>
)
}

import { Bar, getElementAtEvent } from 'react-chartjs-2';
import { useRef } from 'react';
import Chart from 'chart.js/auto';

import './LandPage.scss';
export default function ManyTechsGraph({ input, setCurrentSidePage, setCurrentArg }) {

    let chartRef = useRef();
    const { abs, min, max, round } = Math;
    const moreCostlyTask = max(...Object.values(input["tasks"]))
    function generateRandomColor() {
        let maxVal = 0xFFFFFF; // 16777215
        let randomNumber = Math.random() * maxVal;
        randomNumber = Math.floor(randomNumber);
        randomNumber = randomNumber.toString(16);
        let randColor = randomNumber.padStart(6, 0);
        return `#${randColor.toUpperCase()}`
    }

    function numberToColorHsl(i) {
        const colour_less = "rgb(54, 134, 106)"
        const colour_medium = "rgb(60, 157, 146)"
        const colour_high = "rgb(98, 205, 192)"

        const firstThird = moreCostlyTask * (1/3)
        const secondThird = moreCostlyTask * (2/3)
        if (i < firstThird){
            return colour_less
        }
        if (i > secondThird) return colour_high
        return colour_medium
        
        // as the function expects a value between 0 and 1, and red = 0° and green = 120°
        // we convert the input to the appropriate hue value
        var hue = i * 1.2 / 360;
        // we convert hsl to rgb (saturation 100%, lightness 50%)
        var rgb = hslToRgb(hue, 1, .5);
        // we format to css value and return
        return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
    }
    function hslToRgb(h, s, l) {
        let r, g, b;

        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hueToRgb(p, q, h + 1 / 3);
            g = hueToRgb(p, q, h);
            b = hueToRgb(p, q, h - 1 / 3);
        }

        return [round(r * 255), round(g * 255), round(b * 255)];
    }

    function hueToRgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }


    const options = {
        indexAxis: 'y',
        scales: {
            x: {
                stacked: true,
            },

            y: {
                stacked: true,
            }
        },
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Tarefas por técnico',
            },
            legend: {
        display: false
      },
        },

    };

    /**
     * We start from the first technician, in the first row, and check if the task is there. 
     * If the index is greater than the first row, we go to the next line.
     * We do this until the index is in the row of the current tech.
     * @param {*} globalPosition Adds all the indexes from the top of graph to the selected task
     * @returns Task name
     */
    const getTaskName = (tecIndex, globalPosition) => {
        const techsList = Object.keys(input["technicians"])
        for (let i = 0; i <= Object.keys(input["technicians"]).length; i++){
            const thisTech = techsList[i]
            if (globalPosition >= input["technicians"][thisTech].length) {
                globalPosition = globalPosition - input["technicians"][thisTech].length
            }
            else {
                return input["technicians"][thisTech][globalPosition]
            }
        }
        return "undefined"
    }

    const clicasteAlgo = (event) => {
        try {
            const tecIndex = getElementAtEvent(chartRef.current, event)[0]['index']
            // The position accumulates from the beginning of the graph
            const position = getElementAtEvent(chartRef.current, event)[0]['datasetIndex']
            const taskName = getTaskName(tecIndex, position)
            //const taskName = input["technicians"][`Tecn${tecIndex}`][position]

            setCurrentArg(taskName)
            setCurrentSidePage("task")
        } catch (error) {
            return
        }

    }

    const labels = Object.keys(input["technicians"])  //['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const datasetsFromInput = () => {
        const res = []
        for (let [tecName, tasks] of Object.entries(input["technicians"])) {
            for (let task of tasks) {
                const cost = input["tasks"][task]
                const dataThisTask = Array(labels.length).fill(0);
                dataThisTask[labels.indexOf(tecName)] = cost
                res.push({
                    label: task,
                    data: dataThisTask,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: numberToColorHsl((1 - (cost / moreCostlyTask)) * 100),
                })
            }

        }
        return res
    }

    const data = {
        labels,
        datasets: datasetsFromInput()
    };


    return (
        <div className='tabelTecs'>
            <div className='subBox'>
                <Bar ref={chartRef}
                    options={options}
                    data={data}
                    onClick={clicasteAlgo}
                />
            </div>
        </div>
    )

}
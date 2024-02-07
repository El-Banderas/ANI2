import { Bar, getElementAtEvent } from 'react-chartjs-2';
import { useRef } from 'react';
import Chart from 'chart.js/auto';

import './LandPage.scss';
export default function ManyTechsGraph({ input, setCurrentSidePage, setCurrentArg, tecnsNames }) {

    let chartRef = useRef();
    const { abs, min, max, round } = Math;
    const moreCostlyTask = max(...Object.values(input["tasks"]))


    function numberToColorHsl(i, phase) {
        const is_accomp = phase === 'Análise' ? true : false
        const colour_less_blue = "rgb(54, 134, 106)"
        const colour_medium_blue = "rgb(60, 157, 146)"
        const colour_high_blue = "rgb(98, 205, 192)"

        const colour_less_pink = "rgb(252, 30, 46)"
        const colour_medium_pink = "rgb(250, 85, 96)"
        const colour_high_pink = "rgb(250, 127, 136)"

        const firstThird = moreCostlyTask * (1/3)
        const secondThird = moreCostlyTask * (2/3)
        if (i < firstThird){
            const res = is_accomp ? colour_less_blue :  colour_less_pink
            return res
        }
        if (i > secondThird) {
            const res = is_accomp ? colour_high_blue :  colour_high_pink
            return res
        }
        const res = is_accomp ? colour_medium_blue :  colour_medium_pink
        return res
        
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

    const labels = tecnsNames  //Object.keys(input["technicians"]) //['January', 'February', 'March']
    const maybeTask = (task) => {
        if (task === "-Acompanhamento") return "Indefinido-Acompanhamento" 
        if (task === "-Anális") return "Indefinido-Análise" 
        return task

    }
    const datasetsFromInput = () => {
        const res = []
        //for (let [tecName, tasks] of Object.entries(input["technicians"])) {
        for (let tecName of tecnsNames) {
            const tasks = input["technicians"][tecName]

            for (let task of tasks) {
                const cost = input["tasks"][task]
                const dataThisTask = Array(labels.length).fill(0);
                dataThisTask[labels.indexOf(tecName)] = cost
                
                res.push({
                    label: maybeTask(task),
                    data: dataThisTask,
                    borderColor: 'rgb(56, 43, 43)',
                    borderWidth: 2,
                    backgroundColor: numberToColorHsl((1 - (cost / moreCostlyTask)) * 100, task.split("-").slice(-1)[0]),
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
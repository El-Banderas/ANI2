/**
 * 
 * @param {list[string]} workers_ids 
 * @param {list[float]} totalEfforts Workers total efforts, to calculate metrics.
 * @param {int} totalWorkHours 
 * @returns {dict[string, string]} Metrics, the values are strings to present in the stats table (on the right side of the graph). 
 */
export default function useMetrics(workers_ids, totalEfforts, totalWorkHours) {

  const average = arr => parseInt(arr.reduce((p, c) => p + c, 0) / arr.length);

  function getStandardDeviation(array) {
    const n = array.length
    const mean = array.reduce((a, b) => a + b) / n
    return parseInt(Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n))
  }

  const metrics = () => {
    const indexOfLargestValue = totalEfforts.reduce((maxIndex, currentValue, currentIndex, array) => currentValue > array[maxIndex] ? currentIndex : maxIndex, 0);
    const maxValue = parseInt(totalEfforts[indexOfLargestValue])
    const maxValueTecn = workers_ids[indexOfLargestValue]
    const indexOfLowerValue = totalEfforts.reduce((maxIndex, currentValue, currentIndex, array) => currentValue < array[maxIndex] ? currentIndex : maxIndex, 0);
    const minValue = parseInt(totalEfforts[indexOfLowerValue])
    const minValueTecn = workers_ids[indexOfLowerValue]

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

  return { metricsCalculated }

}
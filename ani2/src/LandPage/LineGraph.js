import { LineChart } from '@mui/x-charts/LineChart';

export default function LineGraph({ }){

const years = [
  new Date(2015, 0, 1),
  new Date(2015, 6, 1),
  new Date(2016, 0, 1),
  new Date(2016, 6, 1),
  new Date(2017, 0, 1),
  new Date(2017, 6, 1),
  new Date(2018, 0, 1),
  new Date(2018, 6, 1),
  new Date(2019, 0, 1),
  new Date(2019, 6, 1),
  new Date(2020, 0, 1),
  new Date(2020, 6, 1),
];

const generate_tecn = (idx) => {
  return {
  TecName : `Tecn${idx}`,
  efforts :  [
  10000*idx, 28114.264, 30619.805,
  28129, 28294.264*idx, 18699.805,
  28129*idx, 28294.264, 23619.805,
]}
}

const Tecn1 ={
  TecName : "Tecn1",
  efforts :  [
  28129, 28294.264, 28619.805,
  28129, 28294.264, 28619.805,
  28129, 28294.264, 28619.805,
]};

const Tecn2  ={
  TecName : "Tecn2",
  efforts :  [
  26189, 25792.014, 25790.186,
  26189, 25792.014, 25790.186,
  26189, 25792.014, 25790.186,
]};

const Tecn3  ={
  TecName : "Tecn3",
  efforts :  [
  25391, 26769.96, 27385.055,
  25391, 26769.96, 27385.055,
  25391, 26769.96, 27385.055,
]};
const Max  ={
TecName : "Max",
 efforts : Array(years.length).fill(30000),
}
const NumTecns = 35; 
const list_tecns = Array.from(Array.from(Array(NumTecns).keys(NumTecns)), (x) => generate_tecn(x))

console.log("Lista tecns?")
console.log(list_tecns)


  // Check this cool stuff:
  // https://mui.com/x/react-charts/line-demo/
return (
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
    />
  );
}
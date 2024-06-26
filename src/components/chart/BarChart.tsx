'use client';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels:{
            font:{
                size:20,
                weight:500,
            }
        }
      },
      title: {
        display: true,
      },
    },
  };

const labels = ["P1", "P2", "P3", "P4", "P5", "P6", "P7"];




const BarChart=({
    UserScoreData,p1
}:{
    UserScoreData:{label:string,data:number[],backgroundColor:string},
    p1:{label:string,data:number[],backgroundColor:string},
})=>{
    return(<>
     <Bar options={options} data={{labels,datasets:[UserScoreData,p1]}} />
    </>);
}
export default BarChart;
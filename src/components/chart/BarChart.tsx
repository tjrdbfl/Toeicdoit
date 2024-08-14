'use client';
import { labels } from "@/constants/chart/constant";
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
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

const options = {
    
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels:{
            font:{
                size:14,
                weight:600,
            },
            padding:20,
            boxWidth: 10,
            boxHeight: 10,
        },
      },
      title: {
        display: true,
      },
      datalabels:{
        display:false
      }
    },
    scales:{
        y:{
            ticks:{
                font:{
                    size:12
                },
                color:'black'
            }
        }
    }
  };



const BarChart=({
    UserScoreData,p
}:{
    UserScoreData:{label:string,data:number[],backgroundColor:string},
    p:{label:string,data:number[],backgroundColor:string},
})=>{
    return(<>
     <Bar
     options={options} data={{labels,datasets:[UserScoreData,p]}} />
    </>);
}
export default BarChart;
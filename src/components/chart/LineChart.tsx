'use client';
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Padding } from "@mui/icons-material";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);


const options = {
    responsive: true,
    interaction: {
        intersect: false,
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
        },
    },
    plugins: {
        legend: {
            position: "bottom" as const,
            labels: {
                font: {
                    size: 13,
                    weight: 700,
                },
                padding:20,
                boxWidth: 10,
                boxHeight: 10,
                usePointStyle: true,
                pointStyle: 'circle',
            },
        },
       
    },
};



const LineChart = ({label,data}:{label:string[],data:number[][]}) => {
    return (
        <Line options={options} data={ {
            labels:label,
            datasets: [
                {
                    label: "실전 모의고사",
                    data: data[0],
                    backgroundColor: "#fef9c3",
                    borderColor: "#fef9c3",
                },
                {
                    label: "수준별 연습문제",
                    data: data[1],
                    backgroundColor: "#000",
                    borderColor: "#000",
                },
                {
                    label: "파트별 연습문제",
                    data: data[2],
                    backgroundColor: "#bfdbfe",
                    borderColor: "#bfdbfe",
                },
                {
                    label: "레벨테스트",
                    data: data[3],
                    backgroundColor: "#3b82f6",
                    borderColor: "#3b82f6",
                },
            ],
        }} />
    );
};

export default LineChart;
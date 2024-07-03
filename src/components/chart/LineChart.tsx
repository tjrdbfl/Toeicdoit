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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

const labels = ["2017", "2018", "2019", "2020", "2021", "2022", "2023"];

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
                    size: 20,
                    weight: 600,
                },
                boxWidth: 10,
                boxHeight: 10,
                usePointStyle: true,
                pointStyle: 'circle',
            },
        },
       
    },
};

export const data = {
    labels,
    datasets: [
        {
            label: "실전 모의고사",
            data: [32, 42, 51, 60, 51, 95, 97],
            backgroundColor: "#fef9c3",
            borderColor: "#fef9c3",
        },
        {
            label: "수준별 연습문제",
            data: [37, 42, 41, 37, 31, 44, 42],
            backgroundColor: "#000",
            borderColor: "#000",
        },
        {
            label: "파트별 연습문제",
            data: [60, 54, 54, 28, 27, 49, 52],
            backgroundColor: "#bfdbfe",
            borderColor: "#bfdbfe",
        },
        {
            label: "레벨테스트",
            data: [37, 74, 41, 30, 35],
            backgroundColor: "#3b82f6",
            borderColor: "#3b82f6",
        },
    ],
};

const LineChart = () => {
    return (
        <Line options={options} data={data} />
    );
};

export default LineChart;
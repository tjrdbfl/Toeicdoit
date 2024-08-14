'use client';
import { Chart as ChartJS, LineElement, PointElement, RadialLinearScale, Legend, Filler, elements, scales } from 'chart.js';
import { callback } from 'chart.js/dist/helpers/helpers.core';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    PointElement,
    RadialLinearScale,
    LineElement,
    Legend,
    Filler,
    elements,
    scales
);


const options = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            labels: {
                font: {
                    size: 10,
                    weight: 600,
                    margin:50,
                   
                },  
                padding:20,  
                boxWidth: 10,
                boxHeight: 10,
                usePointStyle: true,
                pointStyle: 'circle',
            },
        },
        title: {
            display: false,
        },
        datalabels:{
            display:false
        }
    },
    scale: {
        ticks: {
            beginAtZero: true,
            max: 100,
            stepSize: 20,
            font: {
                size: 10,
            },
        },

    },
    scales: {
        r: {
            grid: {
                circular: true,
            },
            pointLabels: {
                font: {
                    size: 9,
                    weight: 600,
                },
            },
        },

    }

};


const RadarChart = ({
    labels, UserData, LevelData
}: {
    labels: (string | string[])[],
    UserData: number[],
    LevelData: number[],
}) => {
    return (<>
        <Radar data={
            {
                labels: labels,
                datasets: [{
                    label: '내 실력',
                    data: UserData,
                    fill: true,
                    backgroundColor: 'rgba(58,129,255, 0.15)',
                    borderColor: 'rgb(58,129,255)',
                    pointBackgroundColor: 'rgb(58,129,255)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(58,129,255)',
                }, {
                    label: '800점 사용자',
                    data: LevelData,
                    fill: false,
                    borderColor: 'rgba(18, 17, 17, 0.5)',
                    pointBackgroundColor: 'rgb(18, 17, 17)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(18, 17, 17)'
                }]
            }
        } options={options} />
    </>);
}
export default RadarChart;
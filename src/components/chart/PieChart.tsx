'use client';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2'; // 원하는 차트 종류를 가져오세요.

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "bottom" as const,
            labels: {
                font: {
                    size: 12,
                    weight: 600,
                },
                padding:10,
                boxWidth: 5,
                boxHeight: 5,
                usePointStyle: true,
                pointStyle: 'circle',
            },
        },

        title: {
            display: true,
        },

    },
};


const PieChart = ({ UserScoreData, labels }: {
    UserScoreData: number[],
    labels: string[]
}) => {
    return (<>
        <Pie 
        data={{
            labels: labels
            , datasets: [{
                data: UserScoreData
                , borderWidth: 3
                , backgroundColor: [
                    'rgba(58,129,255, 0.3)',
                    'rgba(39, 92, 245, 0.2)',
                ],
                datalabels: {
                    display: true,
                    color: 'black',
                    font: {
                        weight: 'bold',
                        size: 14
                    },
                    align: 'center',
                    anchor: 'center'
                },
                borderColor: [
                    'rgba(58,129,255, 0.5)',
                    'rgba(39, 92, 245, 0.5)',
                ],
            }],
            
        }} options={options} />
    </>);
}
export default PieChart;
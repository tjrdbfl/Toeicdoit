'use client';
import {Chart as ChartJS, ArcElement, Tooltip, Legend, Chart} from "chart.js";
import {Doughnut} from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  cutout: '80%', // 중앙 빈 공간 비율 (원의 크기 조절)
  rotation: 200, // 시작 위치 (12시 방향)
  circumference: 360, // 표시되는 원호의 각도 (180도: 반원)
  plugins: {
    legend: {
      display: false, // 범례 숨김
    },
    tooltip: {
      enabled: false, // 툴팁 숨김
    },
  },
};

const DoughnutChart=({data,text}:{data:number[],text:string})=>{
    return(<>
    <Doughnut data={
      {datasets: [{
    data: data,
    backgroundColor: [
      'rgba(12,41,244, 0.6)',
      'rgb(18, 17, 17, 0.3)',
    ],
    borderRadius: 10,
    hoverOffset: 10, 
  }]}} 
  options={options} 
  plugins={[{
    id:'textPlugin',
    beforeDraw: (chart:Chart<'doughnut'>) => {
      const { ctx, chartArea: { top, right, bottom, left, width, height } } = chart;
      ctx.save();
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, width / 2 + left, height / 2 + top);
    },
  }]}/>
    </>);
}
export default DoughnutChart;
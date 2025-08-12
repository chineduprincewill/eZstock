import React from "react";
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
  Filler
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Data for the chart
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [65, 59, 80, 81, 56, 55],
      fill: true, // This fills the area under the line
      backgroundColor: 'rgba(75,192,192,0.2)', // Color for the filled area
      borderColor: 'rgba(75,192,192,1)', // Color for the line
      tension: 0.4, // Controls the smoothness of the curve       
    },
  ],
};

// Chart configuration options
const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true, // Display the legend
    },
    title: {
      display: true,
      text: 'Area Chart Example', // Chart title
    },
  },
  scales: {
    y: {
      beginAtZero: true, // Start y-axis at 0
    },
  },
};

export default function AreaChart() {
  return(
    <div>
      <h2>React Area Chart</h2>
      <Line data={data} options={options} />
    </div>
  );
}
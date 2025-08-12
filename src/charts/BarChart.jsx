import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const BarChart = ({ labels, data, barsColor, title }) => {

    console.log(labels);
    console.log(data);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: `${title} trend`,
                data: data,
                backgroundColor: barsColor,
                borderColor: barsColor,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true },
        },
    };
    
    return <Bar data={chartData} options={options} />;
}

export default BarChart
import React, { useRef, useEffect, useState } from 'react';
import { Chart, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import { LineController } from 'chart.js';
import './styles/chart.css'

Chart.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement, LineController);

function ChartComponent() {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const [chartData, setChartData] = useState({
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        datasets: [
            {
                label: 'Average Heartrate',
                data: [72, 75, 71, 74, 78, 73, 70, 76, 74, 77],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Average Body Temperature',
                data: [36.5, 36.7, 36.6, 36.8, 36.9, 37.0, 36.8, 36.7, 36.6, 36.9],
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
            },
            {
                label: 'Average O2 Level',
                data: [95, 96, 94, 95, 97, 96, 94, 96, 95, 97],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
            {
                label: 'Average Stress',
                data: [3, 4, 3.5, 4.2, 3.8, 4, 3.7, 4.1, 3.9, 4.3],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        fetch('http://localhost:3001/avg')
            .then(response => response.json())
            .then(data => {
                setChartData({
                    labels: data.batch_number,
                    datasets: [
                        {
                            label: 'Average Heartrate',
                            data: data.avg_heartrate,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Average Body Temperature',
                            data: data.avg_body_temperature,
                            backgroundColor: 'rgba(255, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Average O2 Level',
                            data: data.avg_o2level,
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Average Stress',
                            data: data.avg_stress,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            })
            .catch(error => console.error('Error fetching chart data:', error));
    }, []);

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            chartInstanceRef.current = new Chart(ctx, {
                type: 'line',
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            display: true,
                        },
                    },
                },
            });
        }
    }, [chartData]);

    return (
        <div className="chart-container">
            <canvas ref={chartRef}></canvas>
        </div>
    );
}

export default ChartComponent;

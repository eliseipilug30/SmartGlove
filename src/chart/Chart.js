import React, { useRef, useEffect, useState } from 'react';
import { Chart, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import { LineController } from 'chart.js';
import './styles/chart.css';

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
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/avg');
                const data = await response.json();

                const labels = data.map(item => item.batch_number.toString());
                const heartrateData = data.map(item => item.avg_heartrate);
                const bodyTempData = data.map(item => item.avg_body_temperature);
                const o2LevelData = data.map(item => parseFloat(item.avg_o2level));
                const stressData = data.map(item => parseFloat(item.avg_stress));

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Average Heartrate',
                            data: heartrateData,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Average Body Temperature',
                            data: bodyTempData,
                            backgroundColor: 'rgba(255, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Average O2 Level',
                            data: o2LevelData,
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Average Stress',
                            data: stressData,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 5000);

        return () => clearInterval(intervalId);
    }, []);


    useEffect(() => {
        if (chartInstanceRef.current) {
            // Update chart data and re-render the chart
            chartInstanceRef.current.data = chartData;
            chartInstanceRef.current.update();
        } else if (chartRef.current) {
            // Create the chart if it doesn't exist
            const ctx = chartRef.current.getContext('2d');
            chartInstanceRef.current = new Chart(ctx, {
                type: 'line',
                data: chartData,
                options: {
                    responsive: true,
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

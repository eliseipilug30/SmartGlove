import React, { useRef, useEffect, useState } from 'react';
import { Chart, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import { LineController } from 'chart.js';

Chart.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement, LineController);

function ChartComponent() {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const [dataPoints] = useState(new Array(24).fill(0)); // Initial chart data


    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        if (!chartInstanceRef.current) {
            chartInstanceRef.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`), // Hours of the day
                    datasets: [
                        {
                            label: 'Employee Stress Level',
                            data: dataPoints,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                },
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

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
                chartInstanceRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.data.datasets[0].data = dataPoints;
            chartInstanceRef.current.update();
        }
    }, [dataPoints]);

    return (
        <div className="chart">
            <canvas ref={chartRef}></canvas>
        </div>
    );
}

export default ChartComponent;

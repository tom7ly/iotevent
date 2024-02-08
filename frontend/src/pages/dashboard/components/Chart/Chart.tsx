import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartProps {
    labels: string[];
    soundLevels: number[];
}

const chartOptions = {
    interaction: {
        mode: "nearest",
        axis: "x",
        intersect: false
    } as any, // bugged in chart.js types
    scales: {
        x: {
            beginAtZero: true,
            grid: {
                display: false
            },
            ticks: {
                display: false // to hide x axis values
            },
        },
        y: {
            beginAtZero: true,
            grid: {
                display: false
            }
        }
    },
    maintainAspectRatio: false,
};

export default function Chart({ labels, soundLevels }: ChartProps) {
    const data = React.useMemo(() => ({
        labels,
        datasets: [
            {
                label: 'Sound Level',
                data: soundLevels,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.2,
                pointRadius: 5,
                pointHoverRadius: 7,
            },
        ],
    }), [labels, soundLevels]);
    return (
        <div style={{ height: '500px', width: '1000px' }}>
            <Line data={data} options={chartOptions} />
        </div>
    );
}

"use client"
import React, { FC } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
    ChartData
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options: ChartOptions<"bar"> = {
    indexAxis: 'y' as const,
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'right' as const,
        },
        title: {
            display: true,
            text: 'Analytics',
        },
    },
};

const labels = ['Insert 1000', 'Fetch 1000', 'Update 1000', 'Delete 1000'];

export const data = {
    labels,
    datasets: [
        {
            label: 'MongoDb',
            data: labels.map(() => faker.number.int({ min: 100, max: 1000 })),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'PostgresSQL',
            data: labels.map(() => faker.number.int({ min: 100, max: 1000 })),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

type BarChartProps = {
    options?: ChartOptions<"bar">;
    data: ChartData<"bar">;
}

export const BarChart: FC<BarChartProps> = ({ options, data }) => {
    return <Bar options={options} data={data} />;
}

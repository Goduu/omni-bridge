"use client"
import { FC, useEffect } from "react";
import { BarChart } from "./BarChart";
import { useLocalStorage } from "@/utils/useLocalStorage";
import { ChartOptions } from "chart.js";

const labels = {
    insert: 'Insert 1000',
    fetch: 'Fetch 1000',
    update: 'Update 1000',
    delete: 'Delete 1000',
}


let data = {
    labels: Object.entries(labels).map(label => label),
    datasets: [
        {
            id: "mongo",
            label: 'MongoDb',
            data: [],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            id: "postgres",
            label: 'PostgresSQL',
            data: [],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

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

export const TimeComparisonChart: FC = () => {
    const [crudTime, setCrudTime] = useLocalStorage("crudTime")

    useEffect(() => {
        data.datasets = data.datasets.map(dataset => (Object.entries(labels).map(label => crudTime?.[dataset.id]?.[label])))
    }, [crudTime])

    return <BarChart data={data} options={options} />
}
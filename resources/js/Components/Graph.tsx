import React, { useContext } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from "react-chartjs-2";
import { Cars } from '@/types/cars';
import { Maintenaces } from '@/types/maintenaces';
import { usePage } from '@inertiajs/react';
import { CarContext } from '@/Providers/CarProvider';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PageProps {
    cars: Cars[];
    maintenances: Maintenaces[];
    [key: string]: any;  // インデックスシグネチャを追加
  }

type Props = {
    currentYear: number;
}

export const Graph = (props:Props) => {
    const { currentYear } = props;
    // Inertiaからデータを取得
    const { cars, maintenances } =usePage<PageProps>().props;
    // グローバルステートから取得
    const { selectCar } = useContext(CarContext);
    //selectCarから選択中の車のIDを取得
    const currentCarId = cars.find(car => car.id === selectCar)?.id; 
    // 選択中の車のメンテナンス情報を絞りこみ　空の可能性もあるためから配列を置く
    const maintenanceArray = (maintenances || []).filter(maintenance => maintenance.car_id === currentCarId);
    // Inspection_typeごとの累積値を計算する
    const typeSum = maintenanceArray.filter((array) => {
        const date = new Date(array.date);
        const newDate = date.getFullYear();
        return newDate === currentYear;
    })
    .reduce((acc: { [key: string]: number }, array) => {
        const type = array.inspection_type;
        if (!acc[type]) acc[type] = 0; // inspection_typeが初めて出現した場合、0で初期化
        acc[type] += Number(array.amount); // amountを数値に変換
        return acc;
    },{});
    
    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
    return (
        <Pie data={data} />
    )
}

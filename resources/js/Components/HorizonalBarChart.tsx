import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Cars } from '@/types/cars';
import { Maintenaces } from '@/types/maintenaces';
import { usePage } from '@inertiajs/react';
import { CarContext } from '@/Providers/CarProvider';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
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
      text: '月別点検費',
    },
  },
};



type Props = {
    currentYear: number;
  }
  interface PageProps {
    cars: Cars[];
    maintenances: Maintenaces[];
    [key: string]: any;  // インデックスシグネチャを追加
  }

export default function HorizontalBarChart (props:Props) {
    const { currentYear } = props;
    // Inertiaからデータを取得
    const { cars, maintenances } =usePage<PageProps>().props;
    // グローバルステートから取得
    const { selectCar } = React.useContext(CarContext);
    //selectCarから選択中の車のIDを取得
    const currentCarId = cars.find(car => car.id === selectCar)?.id; 
    // 選択中の車のメンテナンス情報を絞りこみ　空の可能性もあるためから配列を置く
    const maintenanceArray = (maintenances || []).filter(maintenance => maintenance.car_id === currentCarId);

    // デフォルトの配列
    const initialMonthSums  = [
        {month: '1月', value: 0},
        {month: '2月', value: 0},
        {month: '3月', value: 0},
        {month: '4月', value: 0},
        {month: '5月', value: 0},
        {month: '6月', value: 0},
        {month: '7月', value: 0},
        {month: '8月', value: 0},
        {month: '9月', value: 0},
        {month: '10月', value: 0},
        {month: '11月', value: 0},
        {month: '12月', value: 0},
      ];
      // メンテナンス月毎に配列に格納していく
      const monthSum = maintenanceArray.filter((array) => {
        // 選択年のデータのみに絞る
        const date = new Date(array.date);
        const newDate = date.getFullYear();
        return newDate === currentYear;
        })
        .reduce((acc, array) => {
            const date = new Date(array.date);
            const month = date.getMonth() + 1; 
            const monthKey = `${month}月`;
            const monthObj = acc.find(item => item.month === monthKey); //同じ月を探す
            if(monthObj){
              monthObj.value += Number(array.amount); //その月に値を加算していく
            }
            return acc;
        },initialMonthSums);
        // メンテナンスデータの有無を判定
        const isAllZero = monthSum.every(item => item.value === 0);

        const labels = ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月', '9月', '10月', '11月', '12月'];

    const data = {
        labels,
        datasets: [
            {
            label: 'Dataset 1',
            data: 1,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

  return <Bar options={options} data={data} />;
}
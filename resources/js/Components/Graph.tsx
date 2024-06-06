import React, { useContext } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { ChartData } from 'chart.js';
import { Pie } from "react-chartjs-2";
import { Cars } from '@/types/cars';
import { InspectionType, Maintenaces } from '@/types/maintenaces';
import { usePage } from '@inertiajs/react';
import { CarContext } from '@/Providers/CarProvider';
import { Box, Typography } from '@mui/material';

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
    .reduce<Record<InspectionType,number>>((acc, array) => {
        const type = array.inspection_type;
        if (!acc[type]) acc[type] = 0; // inspection_typeが初めて出現した場合、0で初期化
        acc[type] += Number(array.amount); // amountを数値に変換
        return acc;
    },{} as Record<InspectionType, number>);
    // 値を配列に格納
    const labels = Object.keys(typeSum);
    const values = Object.values(typeSum);
    // グラフのオプション設定
    const options = {
      maintainAspectRatio: false,
      responsive: true,
      
    }

    const data: ChartData<"pie"> = {
        labels: labels,
        datasets: [
          {
            label: '合計',
            
            data: values,
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
      <>
        <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
          height: '400px'
        }}>
          {!currentCarId ? (
            <Typography>車が登録されていません。</Typography>
          ) : values.length === 0 ? (
            <Typography>データがありません。</Typography>
          ) : (
            <Pie data={data} options={options} />
          )}
        </Box>
      </>

    )
}

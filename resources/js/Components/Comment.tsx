import { CarContext } from "@/Providers/CarProvider";
import { Cars } from "@/types/cars";
import { Maintenaces } from "@/types/maintenaces";
import { usePage } from "@inertiajs/react";
import { Box, Typography } from "@mui/material"
import React from "react";

type Props = {
    currentYear: number;
}
interface PageProps {
    cars: Cars[];
    maintenances: Maintenaces[];
    [key: string]: any;  // インデックスシグネチャを追加
  }

export const Comment = (props:Props) => {
    const { currentYear } = props;
      // Inertiaからデータを取得
    const { cars, maintenances } =usePage<PageProps>().props;
    // グローバルステートから取得
    const { selectCar } = React.useContext(CarContext);
    //selectCarから選択中の車のIDを取得
    const currentCarId = cars.find(car => car.id === selectCar)?.id; 
    const currentCarModel = cars.find(car => car.id === selectCar)?.car_model; 
    // 選択中の車のメンテナンス情報を絞りこみ　空の可能性もあるためから配列を置く
    const maintenanceArray = (maintenances || []).filter(maintenance => maintenance.car_id === currentCarId);
    // 一年の合計金額を算出する
    const yearSum = maintenanceArray.filter((array) => {
        // 選択年のデータのみに絞る
        const date = new Date(array.date);
        const newDate = date.getFullYear();
        return newDate === currentYear;
    }).reduce((acc,array) => {
        acc += Number(array.amount)
        return acc;
    },0)

    return (
        <Box sx={{
            display:"flex",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
            padding: "20px"
        }}
        >
            <Typography fontSize={{md:"2rem"}}>
                {currentYear}年の{currentCarModel}の維持費は{yearSum}円です
            </Typography>
        </Box>
    )
}
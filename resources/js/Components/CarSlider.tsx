import { CarContext } from "@/Providers/CarProvider";
import { Cars } from "@/types/cars";
import { usePage } from "@inertiajs/react";
import { Box, Slider, Typography } from "@mui/material"
import { useContext } from "react";

interface PageProps {
    cars: Cars[];
    [key: string]: any;  // インデックスシグネチャを追加
}

export const CarSlider = () => {
    // Inertiaからデータを取得
    const { cars } =usePage<PageProps>().props;
    // グローバルステートから取得
    const { selectCar } = useContext(CarContext);
    //IDから対象の車種情報を取得
    const currentCar = cars.find(car => car.id === selectCar); 
    const img = currentCar?.img;
    console.log(img);
    return (

            <div>
                <img src="{{ asset('img/'.img) }}" alt="" />    
            </div>

    )
}
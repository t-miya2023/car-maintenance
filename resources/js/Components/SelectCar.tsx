import { FormControl, MenuItem, Select } from "@mui/material"
import InputLabel from "./InputLabel"
import { usePage } from "@inertiajs/react";
import { Cars } from "@/types/cars";
import { Controller, useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { CarContext } from "@/Providers/CarProvider";

interface PageProps {
    cars: Cars[];
    [key: string]: any;  // インデックスシグネチャを追加
}

export const SelectCar = () => {
    // Inertiaからデータを取得
    const { cars } =usePage<PageProps>().props;
    // グローバルステートから取得
    const { selectCar, setSelectCar } = useContext(CarContext);
    
    useEffect(() => {
        if(cars){
            setSelectCar(cars[0].car_model);
        }
    }, [cars]);

    console.log(selectCar);

    const { control } = useForm();

    return (
        <Controller
        name="select"
        control={control}
        defaultValue={selectCar}
        render={({ field }) => (
            <FormControl fullWidth >
                <InputLabel>車種選択</InputLabel>
                <Select
                    {...field}
                    value={field.value}
                    size="small"
                    sx={{backgroundColor:'white', width:'300px'}}
                    onChange={(event) => {
                        field.onChange(event); // react-hook-form の値を更新
                        setSelectCar(event.target.value); // CarContext の値を更新
                    }}
                >
                    {cars.map(car => (
                        <MenuItem key={car.id} value={car.car_model || ''}>{car.car_model || '未登録'}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        )}
        />
    )
}
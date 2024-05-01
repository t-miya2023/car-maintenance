import { FormControl, MenuItem, Select } from "@mui/material"
import InputLabel from "./InputLabel"
import { usePage } from "@inertiajs/react";
import { Cars } from "@/types/cars";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";

interface PageProps {
    cars: Cars[];
    [key: string]: any;  // インデックスシグネチャを追加
}

export const SelectCar = () => {
    // Inertiaからデータを取得
    const { cars } =usePage<PageProps>().props;
    console.log(cars);

    const { control } = useForm();

    const [selectCar, setSelectCar ] = useState(cars[0].car_model);

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
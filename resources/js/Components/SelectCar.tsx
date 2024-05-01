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

    const { control, setValue } = useForm();
    // 初期値を入れる（配列の先頭の車種）
    useEffect(() => {
        if(cars && cars.length > 0){
            const defalutCar = cars[0].car_model;
            setSelectCar(defalutCar);
            setValue('select',defalutCar);
        }else{
            setSelectCar('');  // 初期値を空文字列に設定して、常に制御された状態を保持
            setValue('select', '選択可能な車種がありません');// 車種未登録の場合メッセージを表示
        }
    }, [cars,setSelectCar,setValue]);

    console.log(selectCar);

    return (
        <Controller
        name="select"
        control={control}
        render={({ field }) => (
            <FormControl fullWidth >
                <InputLabel>車種選択</InputLabel>
                <Select
                    {...field}
                    value={field.value || ''}
                    size="small"
                    sx={{backgroundColor:'white', width:'300px'}}
                    onChange={(event) => {
                        field.onChange(event); // react-hook-form の値を更新
                        setSelectCar(event.target.value); // CarContext の値を更新
                    }}
                >
                {cars && cars.length > 0 ? (
                    cars.map(car => (
                        <MenuItem key={car.id} value={car.car_model || ''}>{car.car_model || '未登録'}</MenuItem>
                    ))
                ) : (
                    <MenuItem value='選択可能な車種がありません' disabled>選択可能な車種がありません</MenuItem>
                )}
                </Select>
            </FormControl>
        )}
        />
    )
}
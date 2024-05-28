import { FormControl, MenuItem, Select } from "@mui/material"
import InputLabel from "./other/InputLabel"
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
    // ローカルストレージから選択中の車種IDを取得
    const getStorageCarId = (): number | null => {
        const storeValue = localStorage.getItem('selectedCarId');
        return storeValue ? parseInt(storeValue, 10) : null; //ストレージはstringで保存するためnumber型に変換する
    }
    // ローカルストレージに保存する
    const storeCarId = (carId: number | null) => {
        if(carId){
            localStorage.setItem('selectedCarId', carId.toString()); //strinｇに変換して保存
        }
    }
    // 初期値を入れる（配列の先頭の車種）
    useEffect(() => {
        if(cars && cars.length > 0){
            const storedCarId = getStorageCarId(); //ストレージから選択中のCarIDを取得
            const existingCar = cars.some(car => car.id === storedCarId); //同じIDがあるか確認
            const defalutCarId = existingCar ? storedCarId : cars[0].id; //選択中の車が存在しなければ先頭の車種IDを取得
            setSelectCar(defalutCarId);
            setValue('select',defalutCarId);
            storeCarId(defalutCarId);
            console.log("ストレージ"+storedCarId);
            console.log("車種は存在するか？"+existingCar);
            console.log("選択中の車は"+defalutCarId);
        }else{
            setSelectCar(null);  // 初期値を空文字列に設定して、常に制御された状態を保持
            setValue('select', '選択可能な車種がありません');// 車種未登録の場合メッセージを表示
        }
    }, [cars,setSelectCar,setValue]);


    return (
        <Controller
        name="select"
        control={control}
        render={({ field }) => (
            <FormControl fullWidth sx={{mb:4}}>
                <InputLabel>車種選択</InputLabel>
                <Select
                    {...field}
                    value={field.value || ''}
                    size="small"
                    sx={{backgroundColor:'white', width:'300px'}}
                    onChange={(event) => {
                        const selectedCarId = event.target.value;
                        if(cars.some(car => car.id === selectedCarId)){
                            field.onChange(event); // react-hook-form の値を更新
                            setSelectCar(selectedCarId); // CarContext の値を更新
                            storeCarId(selectedCarId); //ストレージを更新
                        }else{
                            setSelectCar(null);
                        }
                    }}
                >
                {cars && cars.length > 0 ? (
                    cars.map(car => (
                        <MenuItem key={car.id} value={car.id}>
                            {car.car_model || '未登録'}
                        </MenuItem>
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
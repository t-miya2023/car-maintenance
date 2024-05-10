import { CarContext } from "@/Providers/CarProvider";
import { Cars } from "@/types/cars";
import { FormDataConvertible, Inertia } from "@inertiajs/inertia"
import { usePage } from "@inertiajs/react";
import { Box, Button, Input, TextField } from "@mui/material"
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form"

type ItemName = "maintenance_details" | "date" | "next_time" | "amount" | "total_mileage" | "inspection_type" | "shop"| "remarks";

type ItemType = {
    name: ItemName;
    label: string;
    type: string;
    inputmode: "text" | "decimal" | "numeric" | "search" | "none" | "email" | "tel" | "url" | undefined;
}

const items:ItemType[] = [
    { name: "maintenance_details", label: "点検内容", type: "text", inputmode: "text" },
    { name: "date", label: "点検日時", type: "date", inputmode: "text" },
    { name: "next_time", label: "次回点検日時", type: "date" , inputmode: "text"},
    { name: "amount", label: "費用", type: "text" , inputmode: "decimal"},
    { name: "total_mileage", label: "走行距離", type: "text" , inputmode: "numeric"},
    { name: "inspection_type", label: "点検種別", type: "text" , inputmode: "text"},
    { name: "shop", label: "点検店舗", type: "text" , inputmode: "text"},
    { name: "remarks", label: "備考欄", type: "text" , inputmode: "text"}
];

interface PageProps {
    cars: Cars[];
    [key: string]: any;  // インデックスシグネチャを追加
}


export const MaitenanceAddForm = () => {

    // Inertiaからデータを取得
    const { cars } =usePage<PageProps>().props;
    // グローバルステートから取得
    const { selectCar } = useContext(CarContext);
    //selectCarから選択中の車のIDを取得
    const currentCarId = cars.find(car => car.id === selectCar)?.id; 
    
    const { control, handleSubmit  } = useForm();
console.log();

    const onSubmit = (data: Record<string, FormDataConvertible>) => {
        Inertia.post('/maintenance/store',data,{
            preserveScroll: true,
        });
    }


    return (
        <Box component={"form"} 
            onSubmit={handleSubmit(onSubmit)} 
            encType='multipart/form-data'
            sx={{ display: 'flex', 
                flexDirection: 'column' ,
                justifyContent: 'center', 
                maxWidth: '800px',
                margin:'auto'
                }}>
            {items.map(item => (
                <Controller 
                    key={item.name}
                    name={item.name}
                    control={control}
                    render={({field}) => (
                        <TextField
                            {...field}
                            label={item.label}
                            type={item.type}
                            inputMode={item.inputmode}
                            fullWidth
                            sx={{ marginBottom: 4 ,width: "100%"}}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    )}
                />
            ))}
            <Controller 
                name="car_id"
                control={control}
                render={({field}) => (
                    <TextField
                        {...field}
                        type="hidden"
                        value={currentCarId}
                    />
                    )}
                />

            
            <Button sx={{width:'300px',margin:'auto'}}type="submit" variant="contained" color="primary">登録</Button>
        </Box>
    )
}
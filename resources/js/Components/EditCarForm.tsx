import { CarContext } from "@/Providers/CarProvider";
import { Cars } from "@/types/cars";
import { FormDataConvertible, Inertia } from "@inertiajs/inertia"
import { usePage } from "@inertiajs/react";
import { Box, Button, TextField } from "@mui/material"
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form"

type ItemName = "grade" | "model_year" | "color" | "img" | "car_model" | "vehicle_model";

type ItemType = {
    name: ItemName;
    label: string;
    type: string;
}

const items:ItemType[] = [
    { name: "car_model", label: "車種", type: "text" },
    { name: "vehicle_model", label: "型式", type: "text" },
    { name: "grade", label: "グレード", type: "text" },
    { name: "model_year", label: "年式", type: "text" },
    { name: "color", label: "色", type: "text" },
    { name: "img", label: "画像", type: "file" }
];

interface PageProps {
    cars: Cars[];
    [key: string]: any;  // インデックスシグネチャを追加
}

export const EditCarForm = () => {
    // Inertiaからデータを取得
    const { cars } =usePage<PageProps>().props;
    // グローバルステートから取得
    const { selectCar } = useContext(CarContext);
    //IDから対象の車種情報を取得
    const currentCar = cars.find(car => car.id === selectCar); 

    const { control, handleSubmit } = useForm({
        defaultValues:{
            car_model: currentCar?.car_model || '',
            vehicle_model: currentCar?.vehicle_model || '',
            grade: currentCar?.grade || '',
            model_year: currentCar?.model_year || '',
            color: currentCar?.color || '',
            img:currentCar?.img || '',
        }
    })
    // 更新用関数
    const onSubmit = (data: Record<string, FormDataConvertible>) => {
        Inertia.put(`/car/update/${currentCar?.id}`,data,{
            preserveScroll: true
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
                            fullWidth
                            sx={{ marginBottom: 4 ,width: "100%"}}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            value={field.value || ''} 
                        />
                    )}
                />
            ))}

            
            <Button sx={{width:'300px',margin:'auto'}}type="submit" variant="contained" color="secondary">更新</Button>
        </Box>
    )
}
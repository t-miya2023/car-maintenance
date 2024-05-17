import { CarContext } from "@/Providers/CarProvider";
import { Cars } from "@/types/cars";
import { FormDataConvertible, Inertia } from "@inertiajs/inertia"
import { usePage } from "@inertiajs/react";
import { Box, Button, Input, InputLabel, MenuItem, TextField } from "@mui/material"
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form"



interface PageProps {
    cars: Cars[];
    [key: string]: any;  // インデックスシグネチャを追加
}

export const CreatePhotoForm = () => {

    // Inertiaからデータを取得
    const { cars } =usePage<PageProps>().props;
    // グローバルステートから取得
    const { selectCar } = useContext(CarContext);
    //selectCarから選択中の車のIDを取得
    const currentCarId = cars.find(car => car.id === selectCar)?.id; 
    
    const { control, handleSubmit  } = useForm({
        defaultValues:{
            car_id: currentCarId,
            path: '',
            comment: '',
        }
    })

    const onSubmit = (data: Record<string, FormDataConvertible>) => {
        Inertia.post('/photo/store',data,{
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
            {/* 写真 */}
                <Controller 
                    name="path"
                    control={control}
                    render={({field}) => (
                        <Box>
                            <InputLabel>写真を追加してください</InputLabel>
                            <Input
                                {...field}
                                type="file"
                                fullWidth
                                sx={{ marginBottom: 4 ,width: "100%"}}
                            />
                        </Box>
                    )}
                />
            {/* コメント */}
            <Controller 
                name="comment"
                control={control}
                render={({field}) => (
                    <TextField
                        {...field}
                        label="コメント"
                        type="text"
                        fullWidth
                        sx={{ marginBottom: 4 ,width: "100%"}}
                    />
                )}
            />

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
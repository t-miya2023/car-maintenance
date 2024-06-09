import { CarContext } from "@/Providers/CarProvider";
import { Cars } from "@/types/cars";
import { FormDataConvertible, Inertia } from "@inertiajs/inertia"
import { usePage } from "@inertiajs/react";
import { Box, Button, FormHelperText, Input, InputLabel, MenuItem, TextField } from "@mui/material"
import { MuiFileInput } from "mui-file-input";
import { useContext, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form"



interface PageProps {
    cars: Cars[];
    [key: string]: any;  // インデックスシグネチャを追加
}

type  Inputs = {
    car_id: number;
    path: string;
    comment: string;
}

export const CreatePhotoForm = () => {

    // Inertiaからデータを取得
    const { cars } =usePage<PageProps>().props;
    // グローバルステートから取得
    const { selectCar } = useContext(CarContext);
    //selectCarから選択中の車のIDを取得
    const currentCarId = cars.find(car => car.id === selectCar)?.id as number; 
    
    const { control, handleSubmit  } = useForm({
        defaultValues:{
            car_id: currentCarId,
            path: '',
            comment: '',
        }
    })
    // バリデーションルール 
    const validationRules = {
            required: '画像を選択してください',
    }

    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
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
                    rules={validationRules}
                    render={({field: {onChange} , fieldState: {error}}) => (
                        <>
                            <InputLabel>写真を追加してください</InputLabel>
                            {error && <FormHelperText error>{error.message}</FormHelperText>}
                            <Input
                                type="file"
                                sx={{ marginBottom: 4 ,width: "100%"}}
                                onChange={(e) => onChange((e.target as HTMLInputElement).files)}
                            />
                            
                        </>
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
                        sx={{ diaplay: "none" }}
                    />
                    )}
                />

            
            <Button sx={{width:'300px',margin:'auto'}}type="submit" variant="contained" color="primary">登録</Button>
        </Box>
    )
}
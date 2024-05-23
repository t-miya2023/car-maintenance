import { CarContext } from "@/Providers/CarProvider";
import { Cars } from "@/types/cars";
import { FormDataConvertible, Inertia } from "@inertiajs/inertia"
import { Box, Button, Input, TextField } from "@mui/material"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

type ItemName = "grade" | "model_year" | "color" | "car_model" | "vehicle_model";

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
];

type Validation = {
    car_model:{
        required: string,
        maxLength: { value: number, message: string }
    }
}


export const CreateNewCarForm = () => {
    const { control, handleSubmit  } = useForm<Cars>({
        defaultValues:{
            car_model: '',
            vehicle_model: '',
            grade: '',
            model_year: '',
            color: '',
        }
    })
    // ヴァリデーションルール
    const validationRules: Validation = {
        car_model:{
            required: '車種名を入力してください。',
            maxLength: { value: 30, message: '30文字以内で入力してください。' }
        }
    }

    // 登録用関数
    const onSubmit:SubmitHandler<Cars> = (data) => {
        Inertia.post('/car/store',data,{
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
                    rules={validationRules[item.name as keyof Validation] }
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            label={item.label}
                            type={item.type}
                            error={fieldState.invalid}
                            helperText={fieldState.error?.message}
                            fullWidth
                            sx={{ marginBottom: 4 ,width: "100%"}}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            />
                    )}
                />
            ))}
            <Button sx={{width:'300px',margin:'auto'}}type="submit" variant="contained" color="secondary">登録</Button>
        </Box>
    )
}
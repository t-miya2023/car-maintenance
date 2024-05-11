import { FormDataConvertible, Inertia } from "@inertiajs/inertia"
import { Box, Button, Input, TextField } from "@mui/material"
import { useState } from "react";
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



export const CreateNewCarForm = () => {
    const { control, handleSubmit  } = useForm({
        defaultValues:{
            car_model: '',
            vehicle_model: '',
            grade: '',
            model_year: '',
            color: '',
            img:'',
        }
    })
    const [ selectedFile, setSelectedFile ] = useState<File | null>(null);



    const onSubmit = (data: Record<string, FormDataConvertible>) => {

        const formData = new FormData();
        for(const key in data){
            if(key === 'img' && selectedFile ){
                formData.append(key,selectedFile);
            }else{
                formData.append(key,data[key]);
            }
        }
        console.log(formData);
        Inertia.post('/car/store',formData,{
            preserveScroll: true,
            forceFormData: true,
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
                        item.type === 'file' ? (
                            <Input
                                {...field}
                                type="file"
                                fullWidth
                                aria-label="画像"
                                sx={{ marginBottom: 4 ,width: "100%"}}
                                inputProps={{
                                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setSelectedFile(e.target.files[0]);
                                        }
                                    }
                                }}
                            />
                        ):(
                        <TextField
                            {...field}
                            label={item.label}
                            type={item.type}
                            fullWidth
                            sx={{ marginBottom: 4 ,width: "100%"}}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            />
                        )
                    )}
                />
            ))}

            
            <Button sx={{width:'300px',margin:'auto'}}type="submit" variant="contained" color="secondary">登録</Button>
        </Box>
    )
}
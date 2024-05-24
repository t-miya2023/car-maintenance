import { Link } from "@inertiajs/react"
import { Box, Button, Stack, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia"; 
import { BackButton } from "@/Components/other/BackButton";

type Props = {
    car : {
        id: number,
        car_model: string,
        vehicle_model: string,
        grade: string,
        model_year: string,
        color: string,
    }
}


export default function carUpdate({ car }:Props) {
    const [formData, setFormData] = useState({
        car_model: '',
        vehicle_model: '',
        grade: '',
        model_year: '',
        color: '',
    });

    useEffect(() => {
        if(car){
            setFormData({
                car_model: car.car_model,
                vehicle_model: car.vehicle_model,
                grade: car.grade,
                model_year: car.model_year,
                color: car.color,
            })
        }
    },[car])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData,[e.target.name] :e.target.value});
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Inertia.put(`/car-maintenance/public/car/update/${car.id}`,formData);
    }

    return (
        <div>
            <h2>create</h2>
            <Box component={"form"} onSubmit={handleSubmit}>
            <Stack spacing={2} sx={{m:4}}>
                    <TextField
                    id="car_model"
                    name="car_model"
                    label="車種"
                    value={formData.car_model}
                    onChange={handleChange}
                    />
                    <TextField
                    id="vehicle_model"
                    name="vehicle_model"
                    label="型式"
                    value={formData.vehicle_model}
                    onChange={handleChange}
                    />
                    <TextField
                    id="grade"
                    name="grade"
                    label="グレード"
                    value={formData.grade}
                    onChange={handleChange}
                    />
                    <TextField
                    id="model_year"
                    name="model_year"
                    label="年式"
                    value={formData.model_year}
                    onChange={handleChange}
                    />
                    <TextField
                    id="color"
                    name="color"
                    label="カラー"
                    value={formData.color}
                    onChange={handleChange}
                    />
                </Stack>
                <Button type="submit" variant="contained" color="secondary">更新</Button>
            </Box>
            <BackButton />
        </div>
    )
}
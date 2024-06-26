import { Link } from "@inertiajs/react"
import { Box, Button, Stack, TextField } from "@mui/material"
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia"; 




export default function carCreate() {
    const [formData, setFormData] = useState({
        car_model: '',
        vehicle_model: '',
        grade: '',
        model_year: '',
        color: '',
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData,[e.target.name] :e.target.value});
    }

    const handleBack = () => {
        window.history.back();
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Inertia.post('/car-maintenance/public/car/store',formData);
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
                <Button type="submit" variant="contained" color="secondary">登録</Button>
            </Box>
        <Button onClick={handleBack} variant="contained" color="warning">戻る</Button>
        </div>
    )
}
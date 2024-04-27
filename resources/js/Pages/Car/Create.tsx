import { Link } from "@inertiajs/react"
import { Box, Button, Stack, TextField } from "@mui/material"
import { useState } from "react";



export default function carCreate() {
    const [formData, setFormData] = useState([
        // car_model: '',
        // vehicle_model: '',
        // grade: '',
        // model_year: '',
        // color: '',
    ]);
    const handleChange = () => {
        // setFormData({...formData,[e.target.name] :e.target.value})
    }
    return (
        <div>
            <h2>create</h2>
            <Box component={"form"}>
                <Stack spacing={2} sx={{m:4}}>
                    <TextField
                    id="car_model"
                    label="車種"
                    onChange={handleChange}
                    />
                    <TextField
                    id="vehicle_model"
                    label="型式"
                    onChange={handleChange}
                    />
                    <TextField
                    id="grade"
                    label="グレード"
                    onChange={handleChange}
                    />
                    <TextField
                    id="model_year"
                    label="年式"
                    onChange={handleChange}
                    />
                    <TextField
                    id="color"
                    label="カラー"
                    onChange={handleChange}
                    />
                </Stack>
                <Button type="submit" variant="contained" color="secondary">登録</Button>
            </Box>
        <Button  variant="contained" color="warning">戻る</Button>
        </div>
    )
}
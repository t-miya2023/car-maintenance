import { CarContext } from "@/Providers/CarProvider";
import { Cars } from "@/types/cars";
import { usePage } from "@inertiajs/react";
import { Box, Slider, Typography } from "@mui/material"
import { useContext } from "react";



export const CarSlider = () => {

    return (

            <Box sx={{ height:"200px", flex: 1, overflow: 'hidden' }}>
                <img src="/images/test.jpg" style={{ height: '100%', width: 'auto' }} />    
            </Box>

    )
}
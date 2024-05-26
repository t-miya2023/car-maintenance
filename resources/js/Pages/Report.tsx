import { BarChart } from "@/Components/BarChart"
import { Graph } from "@/Components/Graph"
import { SelectCar } from "@/Components/SelectCar"
import { YearSelector } from "@/Components/YearSelector"
import { Grid, Paper } from "@mui/material"
import { useState } from "react"

export const Report = () => {
    const paperStyle = {
        height:{ xs: "auto", md: "400px" },
        display: "flex",
        flexDrection: "column",
    }
    const day = new Date();
    const year = day.getFullYear();
    const [ currentYear, setCurrentYear ] = useState(year);
    //  console.log(currentYear);
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <SelectCar />
            </Grid>
            <Grid item xs={12}>
                <YearSelector setCurrentYear={setCurrentYear} currentYear={currentYear} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper sx={paperStyle}>
                    <Graph currentYear={currentYear} />
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper sx={paperStyle}>
                    <BarChart />
                </Paper>
            </Grid>
        </Grid>
    )
}
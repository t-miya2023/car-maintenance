import { Graph } from "@/Components/Graph"
import { SelectCar } from "@/Components/SelectCar"
import { YearSelector } from "@/Components/YearSelector"
import { Grid, Paper } from "@mui/material"
import { useState } from "react"
import { Comment } from "@/Components/Comment"
import HorizontalBarChart from "@/Components/HorizonalBarChart"

export const Report = () => {
    const paperStyle = {
        height:{ xs: "auto", md: "400px" },
        display: "flex",
        flexDrection: "column",
        width: "100%"
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
            <Grid item xs={12}>
                <Paper>
                    <Comment currentYear={currentYear} />
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper sx={paperStyle}>
                    <Graph currentYear={currentYear} />
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper sx={paperStyle}>
                    <HorizontalBarChart  currentYear={currentYear} />
                </Paper>
            </Grid>
        </Grid>
    )
}
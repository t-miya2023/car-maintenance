import { BarChart } from "@/Components/BarChart"
import { Graph } from "@/Components/Graph"
import { YearSelector } from "@/Components/YearSelector"
import { Grid, Paper } from "@mui/material"

export const Report = () => {
    const paperStyle = {
        height:{ xs: "auto", md: "400px" },
        display: "flex",
        flexDrection: "column",
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <YearSelector />
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper sx={paperStyle}>
                    <Graph />
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
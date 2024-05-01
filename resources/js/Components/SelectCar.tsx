import { FormControl, MenuItem, Select } from "@mui/material"
import InputLabel from "./InputLabel"

export const SelectCar = () => {
    return (
        <FormControl fullWidth >
            <InputLabel id="demo-simple-select-label">車種選択</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                size="small"
                sx={{backgroundColor:'white', width:'300px'}}
            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </FormControl>
    )
}
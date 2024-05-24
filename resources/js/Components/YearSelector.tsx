import { Box, Button } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { ja } from "date-fns/locale" 

export const YearSelector = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button variant="contained" color={"error"}>
                    前
                </Button>
                <DatePicker 
                    sx={{mx: 2, backgroundColor: "white"}} 
                    views={["year"]}
                    format="yyyy年"
                    slotProps={{
                        toolbar: {
                            toolbarFormat: "yyyy年",
                        },
                    }}
                    />
                <Button variant="contained" color={"primary"}>
                    後
                </Button>
            </Box>
        </LocalizationProvider>

    )
}
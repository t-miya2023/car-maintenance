import { Box, Button } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { addYears } from "date-fns"
import { ja } from "date-fns/locale" 

type Props = {
    currentYear: number;
    setCurrentYear: React.Dispatch<React.SetStateAction<number>>
}

export const YearSelector = (props:Props) => {
    const { currentYear, setCurrentYear } = props;
    // number型をdate型に変換
    const datePickerValue = new Date(currentYear, 0, 1);

    const handleYearChange = (year:Date | null) => {
        if(year){
            const newYear = year.getFullYear();
            setCurrentYear(newYear);
        }
    }
    // 前ボタン
    const handlePreviousYear = () => {
        const previousYear = currentYear - 1 ;
        setCurrentYear(previousYear);
    }
    // 後ボタン
    const handleNextYear = () => {
        const nextYear = currentYear + 1;
        setCurrentYear(nextYear);
    }
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button variant="contained" color={"error"} onClick={handlePreviousYear}>
                    前
                </Button>
                <DatePicker 
                    onChange={handleYearChange}
                    sx={{mx: 2, backgroundColor: "white"}} 
                    views={["year"]}
                    format="yyyy年"
                    slotProps={{
                        toolbar: {
                            toolbarFormat: "yyyy年",
                        },
                    }}
                    value={datePickerValue}
                    />
                <Button variant="contained" color={"primary"} onClick={handleNextYear}>
                    後
                </Button>
            </Box>
        </LocalizationProvider>

    )
}
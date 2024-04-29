import { Box, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export const AddCar = () => {
    const handleClick = () => {
        alert("test");
    }
    return(
        <Box>
            <Button onClick={handleClick} variant="outlined">
                <AddIcon />管理する車を追加する
            </Button>
        </Box>
    )
}
import { Box, Button } from "@mui/material"
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteCarModal } from "./DeleteCarModal";


export const DeleteCarButton = () => {
    const [open, setOpen] = React.useState(false);
    // モーダルを開ける関数
    const handleOpen = () => setOpen(true);

    return (
        <Box>
            <Button onClick={handleOpen} color="error">
                削除
                <DeleteIcon />
            </Button>
            <DeleteCarModal open={open} setOpen={setOpen}/>
        </Box>
    )
}


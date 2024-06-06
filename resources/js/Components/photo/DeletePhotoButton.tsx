import { Box, Button } from "@mui/material"
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { DeletePhotoModal } from "./DeletePhotoModal";

type Props = {
    photoId:number;
}

export const DeletePhotoButton = (props:Props) => {
    const { photoId } = props;
    const [open, setOpen] = React.useState(false);
    // モーダルを開ける関数
    const handleOpen = () => setOpen(true);

    return (
        <Box>
            <Button onClick={handleOpen} color="error">
                <DeleteIcon />
            </Button>
            <DeletePhotoModal open={open} setOpen={setOpen} photoId={photoId} />
        </Box>
    )
}
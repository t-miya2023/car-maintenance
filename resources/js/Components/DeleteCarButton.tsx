import { Box, Button, Modal } from "@mui/material"
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteCarModal } from "./DeleteCarModal";


export const DeleteCarButton = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <Box>
            <Button onClick={handleOpen} color="error">
                削除
                <DeleteIcon />
            </Button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <DeleteCarModal handleClose={handleClose}/>
            </Modal>
        </Box>
    )
}
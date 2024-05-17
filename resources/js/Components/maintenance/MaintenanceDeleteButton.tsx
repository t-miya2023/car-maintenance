import { Box, Button } from "@mui/material"
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { MaintenanceDeleteModal } from "./MaintenanceDeleteModal";

type Props = {
    maintenanceId:number;
}

export const MaintenanceDeleteButton = (props:Props) => {
    const { maintenanceId } = props;
    const [open, setOpen] = React.useState(false);
    // モーダルを開ける関数
    const handleOpen = () => setOpen(true);

    return (
        <Box>
            <Button onClick={handleOpen} color="error">
                <DeleteIcon />
            </Button>
            <MaintenanceDeleteModal open={open} setOpen={setOpen} maintenanceId={maintenanceId}/>
        </Box>
    )
}


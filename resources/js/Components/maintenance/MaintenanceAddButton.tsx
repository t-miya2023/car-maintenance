import { Box, Button, Drawer, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import { MaitenanceAddForm } from "./MaintenanceAddForm";
import { CarContext } from "@/Providers/CarProvider";


export const MaintenanceAddBotton = () => {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    // グローバルステートから取得
    const { selectCar } = React.useContext(CarContext);

    const DrawerForm = (
        <Box sx={{ width: "auto" }} p={5} role="presentation" >
            <MaitenanceAddForm />
        </Box>
    );

    return (
        <Box textAlign={"right"} mb={2}>
            <Button onClick={toggleDrawer(true)} variant="outlined" disabled={!selectCar}>
                <AddIcon />メンテナンスの追加
            </Button>
            <Drawer
                open={open}
                onClose={toggleDrawer(false)}
                anchor='left'
            >
                {DrawerForm}
            </Drawer>
        </Box>
    )
}
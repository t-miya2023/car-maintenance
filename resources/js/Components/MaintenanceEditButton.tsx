import { Box, Button, Drawer, Typography } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import * as React from 'react';
import { MaitenanceEditForm } from "./MaintenanceEditForm";

type Props = {
    maintenanceId:number;
}

export const MaintenanceEditBotton = (props:Props) => {
    const { maintenanceId } = props;
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerForm = (
        <Box sx={{ width: "auto" }} p={5} role="presentation" >
            <MaitenanceEditForm maintenanceId={maintenanceId} />
        </Box>
    );

    return (
        <Box textAlign={"center"} mb={2}>
            <Button onClick={toggleDrawer(true)}>
                <EditIcon />
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
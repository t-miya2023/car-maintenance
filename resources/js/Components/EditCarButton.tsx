import { Box, Button, Drawer } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import React from "react";
import { EditCarForm } from "./EditCarForm";


export const EditCarButton = () => {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const DrawerForm = (
        <Box sx={{ width: "auto" }} p={5} role="presentation" >
            <EditCarForm />
        </Box>
    );
    return (
        <Box>
            <Button onClick={toggleDrawer(true)}>
                情報編集
                <EditIcon />
            </Button>
            <Drawer
                open={open}
                onClose={toggleDrawer(false)}
                anchor='bottom'
            >
                {DrawerForm}
            </Drawer>
        </Box>
    )
}
import { Box, Button, Drawer, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import { CreatePhotoForm } from "./CreatePhotoForm";


export const CreatePhotoButton = () => {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerForm = (
        <Box sx={{ width: "auto" }} p={5} role="presentation" >
            <CreatePhotoForm />
        </Box>
    );

    return (
        <Box textAlign={"right"} mb={2}>
            <Button onClick={toggleDrawer(true)} variant="outlined">
                <AddIcon />写真の追加
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
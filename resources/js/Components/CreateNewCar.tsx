import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { CreateNewCarForm } from './CreateNewCarForm';


export default function CreateNewCar() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerForm = (
        <Box sx={{ width: "auto" }} p={5} role="presentation" >
            <CreateNewCarForm />
        </Box>
    );
    

    return (
        <Box mb={3}>
            <Button onClick={toggleDrawer(true)} variant="outlined">
                <AddIcon />管理する車を追加する
            </Button>
            <Drawer
                open={open}
                onClose={toggleDrawer(false)}
                anchor='bottom'
            >
                {DrawerForm}
            </Drawer>
        </Box>
        
    );
}
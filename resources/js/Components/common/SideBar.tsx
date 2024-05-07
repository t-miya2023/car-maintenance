import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material"
import React, { CSSProperties } from "react";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import { NavLink } from "react-router-dom";

type Props = {
    drawerWidth:number;
    mobileOpen:boolean;
    handleDrawerTransitionEnd: () => void;
    handleDrawerClose: () => void;
}

type MenuItem = {
    text: string;
    path: string;
    icon: React.ComponentType;
}


export const SideBar = (props:Props) => {
    const {drawerWidth, mobileOpen, handleDrawerTransitionEnd, handleDrawerClose} = props;
    // メニューのリスト
    const MenuItems:MenuItem[] = [
        {text: "HOME", path: "/home", icon: DirectionsCarIcon},
        {text: "REPORT", path: "/report", icon: SignalCellularAltIcon},
    ]
    const baseLinkStyle:CSSProperties = {
        textDecoration:"none",
        color:"inherit",
        display:"block"

    }
    //選択したページの色を変える
    const activeLinkStyle:CSSProperties = {
        backgroundColor : "rgba(0,0,0,0.08)"
    }

    const drawer = (
        <div>
        <Toolbar />
        <Divider />
        <List>
            {MenuItems.map((item, index) => (
            <NavLink key={index} to={item.path} style={({isActive}) => {
                // console.log(item.text + isActive);
                return {
                    ...baseLinkStyle,
                    ...(isActive ? activeLinkStyle : {})
                }
            }}>
                <ListItem key={index} disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <item.icon />
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                    </ListItemButton>
                </ListItem>
            </NavLink>
            ))}
        </List>
        <Divider />
        </div>
    );

    return (
        <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
    >
        {/* SP用 */}
        <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
            keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        >
        {drawer}
        </Drawer>
        {/* PC用 */}
        <Drawer
        variant="permanent"
        sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
        >
        {drawer}
        </Drawer>
    </Box>
    )
}
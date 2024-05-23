import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet } from 'react-router-dom';
import Dropdown from '@/Components/Dropdown';
import { User } from '@/types';
import { SideBar } from '@/Components/common/SideBar';
const drawerWidth = 240;

interface Props {
  user:User;
}

export default function AppLayout(props: Props) {
  const { user } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box sx={{ display: 'flex' ,bgcolor: '#cfd8dc', minHeight:'100vh'}}>
      <CssBaseline />
      {/* ヘッダー */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Box display={'flex'} justifyContent={'space-between'} px={4}>
          {/* タイトル */}
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Car Maintenance
            </Typography>
          </Toolbar>
          {/* 名前 */}
          <div className="hidden sm:flex sm:items-center sm:ms-6">
            <div className="ms-3 relative">
                <Dropdown>
                    <Dropdown.Trigger>
                        <span className="inline-flex rounded-md">
                            <button
                                type="button"
                                
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white-500 focus:outline-none transition ease-in-out duration-150"
                            >
                                {user.name}

                                <svg
                                    className="ms-2 -me-0.5 h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </span>
                    </Dropdown.Trigger>

                    <Dropdown.Content>
                        <Dropdown.Link href={route('profile.edit')}>登録情報</Dropdown.Link>
                        <Dropdown.Link href={route('logout')} method="post" as="button">
                            ログアウト
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
          </div>
        </Box>
      </AppBar>
      {/* サイドバー */}
        <SideBar
          drawerWidth={drawerWidth}
          mobileOpen={mobileOpen}
          handleDrawerTransitionEnd={handleDrawerTransitionEnd}
          handleDrawerClose={handleDrawerClose}
        />
      {/* メイン */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

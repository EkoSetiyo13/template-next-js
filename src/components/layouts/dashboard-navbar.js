import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar,Divider , Avatar, Badge, Box, IconButton, Toolbar, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Bell as BellIcon } from '../icons/bell';
import { UserCircle as UserCircleIcon } from '../icons/user-circle';
import { Users as UsersIcon } from '../icons/users';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { useUser } from '@lib/hooks'


const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
  const router = useRouter();
  const user = useUser()

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    const res = await fetch('/api/logout').then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
    window.location.reload();

   
  }

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280
          },
          width: {
            lg: 'calc(100% - 280px)'
          }
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              <Badge
                badgeContent={4}
                color="primary"
                variant="dot"
              >
                <BellIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="User">
            <IconButton sx={{ ml: 1 }} onClick={handleOpenUserMenu} >
              <Avatar
                sx={{
                  height: 40,
                  width: 40,
                  ml: 1
                }}
                src="/static/images/avatars/avatar_1.png"
              >
                <UserCircleIcon fontSize="small" />
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {/* {settings.map((item, index) => (
              <MenuItem key={index} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{item}</Typography>
              </MenuItem>
            ))} */}
            <Typography textAlign="left" sx={{ pl: '10px' }}>Name: {user.username}</Typography>
            <Typography textAlign="left" sx={{ pl: '10px' }}>Role: {user.is_admin ? "Admin": "User"}</Typography>
            <Divider />
            <MenuItem onClick={handleLogout}>
                <Typography textAlign="left">Logout</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};

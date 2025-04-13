import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Typography,
  ListItemButton,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  CalendarMonth as CalendarIcon,
  Star as StarIcon,
  Person as PersonIcon,
  SmartToy as SmartToyIcon,
  Favorite as FavoriteIcon,
  FitnessCenter,
} from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Calendar', icon: <CalendarIcon />, path: '/calendar' },
  { text: 'Feature 1', icon: <StarIcon />, path: '/feature-1' },
  { text: 'Feature 2', icon: <PersonIcon />, path: '/feature-2' },
  { text: 'Ask AI', icon: <SmartToyIcon />, path: '/ask-ai' },
  { text: 'Belly-safe', icon: <FavoriteIcon />, path: '/belly-safe' },
  { text: 'Mamma Moves', icon: <FitnessCenter />, path: '/mamma-moves' },
];

export const SideMenu = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#f5f5f5',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" noWrap component="div">
            Mamma Moves
          </Typography>
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}; 
import React, { useState } from 'react';
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  ListAlt as ListAltIcon,
  Search as SearchIcon,
  AccountBalance as AccountBalanceIcon,
  VolumeUp as VolumeUpIcon,
  ShowChart as ShowChartIcon,
  Person as PersonIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { Outlet, useNavigate } from 'react-router-dom';

const MainLayout = () => {
  const [open, setOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true); // Add state for right sidebar

  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleRightDrawerOpen = () => {
    setRightOpen(true);
  };

  const handleRightDrawerClose = () => {
    setRightOpen(false);
  };

  return (
    <div style={{ display: 'flex' }}>
 

      {/* Left Drawer (Sidebar) */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
       
        <List>
          {[
            { text: 'Dashboard', icon: <DashboardIcon />, route: '/' },
            { text: 'Products', icon: <ShoppingCartIcon />, route: '/product-listing' },
            {
              text: 'Orders',
              icon: <ListAltIcon />,
              children: [
                { text: 'Order Management', route: '/order-management' },
                { text: 'Payment Integration', route: '/payment-integration' },
                { text: 'Delivery Scheduling', route: '/delivery-scheduling' },
                { text: 'Rider Management', route: '/rider-management' },
              ],
            },
            { text: 'Job Postings', icon: <SearchIcon />, route: '/job-postings' },
            { text: 'Inventory', icon: <AccountBalanceIcon />, route: '/inventory-tracking' },
            { text: 'Promotions', icon: <VolumeUpIcon />, route: '/promotions' },
            { text: 'Analytics', icon: <ShowChartIcon />, route: '/shop-analytics' },
            {
              text: 'Suppliers',
              icon: <PersonIcon />,
              children: [
                { text: 'Supplier Interaction', route: '/supplier-interaction' },
                { text: 'Supplier Payments', route: '/supplier-payment' },
              ],
            },
            {
              text: 'Support',
              icon: <PeopleIcon />,
              children: [
                { text: 'User Interaction', route: '/user-interaction' },
                { text: 'Shop Support', route: '/shop-support' },
                { text: 'Shop Ratings', route: '/shop-ratings' },
                { text: 'Shop Notifications', route: '/shop-notifications' },
                { text: 'Feedback Management', route: '/feedback-management' },
              ],
            },
            { text: 'Settings', icon: <SettingsIcon />, route: '/shop-settings' },
          ].map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={() => {
                if (item.route) {
                  navigate(item.route);
                  handleDrawerClose();
                }
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      {/* Right Drawer (Sidebar) */}
      <Drawer
        variant="persistent"
        anchor="right"
        open={rightOpen}
        sx={{
          width: 20,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 80,
            boxSizing: 'border-box',
          },
        }}
      >
        {/* Right Sidebar Content */}
      </Drawer>

      {/* Content */}
      <div style={{ flexGrow: 1, padding: '10px 1px 1px', marginLeft: open ? 20 : 0 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;

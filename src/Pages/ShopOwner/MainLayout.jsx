import React, { useState } from 'react';
import {
  Drawer,
  //AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  //IconButton,
  //Typography,
  Collapse,
} from '@mui/material';
import {
  //Menu as MenuIcon,
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
  const [openItems, setOpenItems] = useState([]);

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

  const handleItemClick = (index, route) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter((item) => item !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
    if (route) {
      navigate(route);
    }
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
            width: 220,
            boxSizing: 'border-box',
            
          },
        }}
      >
        <Toolbar />
       
        <List>
          {[
            { text: 'Dashboard', 
            icon: <DashboardIcon />, 
            route: '/' },

            { text: 'Products', 
            icon: <ShoppingCartIcon />, 
            route: '/productListing' },
            {
              text: 'Orders',
              icon: <ListAltIcon />,
              children: [
                { text: 'Order Management', route: '/ordermanagement' },
                { text: 'Payment Integration', route: '/paymentintegration' },
                { text: 'Delivery Scheduling', route: '/deliveryscheduling' },
                { text: 'Rider Management', route: '/ridermanagement' },
              ],
            },
            { text: 'Job Postings', icon: <SearchIcon />, route: '/joblisting' },
            { text: 'Inventory', icon: <AccountBalanceIcon />, route: '/inventorytracking' },
            { text: 'Promotions', icon: <VolumeUpIcon />, route: '/promotions' },
            { text: 'Analytics', icon: <ShowChartIcon />, route: '/shopanalytics' },
            {
              text: 'Suppliers',
              icon: <PersonIcon />,
              children: [
                { text: 'Supplier Interaction', route: '/supplierinteraction' },
                { text: 'Supplier Payments', route: '/supplierpayment' },
              ],
            },
            {
              text: 'Support',
              icon: <PeopleIcon />,
              children: [
                { text: 'User Interaction', route: '/userinteraction' },
                { text: 'Shop Support', route: '/shopsupport' },
                { text: 'Shop Ratings', route: '/shopratings' },
                { text: 'Shop Notifications', route: '/shopnotifications' },
                { text: 'Feedback Management', route: '/feedbackmanagement' },
              ],
            },
            { text: 'Settings', icon: <SettingsIcon />, route: '/shopsettings' },
          ].map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                button
                onClick={() => handleItemClick(index, item.route)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
              <Collapse in={openItems.includes(index)}>
                <List>
                  {item.children &&
                    item.children.map((child, childIndex) => (
                      <ListItem
                        button
                        key={childIndex}
                        onClick={() => {
                          handleItemClick(childIndex, child.route);
                        }}
                      >
                        {/* render child item content */}
                        <ListItemIcon>{/* child icon */}</ListItemIcon>
                        <ListItemText primary={child.text} />
                      </ListItem>
                    ))}
                </List>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </Drawer>
      {/* Right Drawer (Sidebar) */}
      <Drawer
        variant="persistent"
        anchor="right"
        open={rightOpen}
        sx={{
          width: 20, // Adjust the width as needed
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 70, // Adjust the width as needed
            boxSizing: 'border-box',
            position: 'fixed', // Ensure it doesn't affect other elements
            top: 0, // Position it at the top
            height: '100%', // Occupy the full height
            overflowY: 'hidden', // Hide scrollbar, content won't scroll
          },
        }}
      >
        {/* Right Sidebar Content */}
        <List>
          <ListItem>
            <ListItemText primary="Right" />
          </ListItem>
        </List>
      </Drawer>

        {/* Content */}
        <div style={{ flexGrow: 1, padding: '10px 1px 1px', marginLeft: open ? -30 : 0 , marginRight: open ? 80 : 0 }}>  
        <div style={{ overflowY: 'auto', height: '100vh' }}>
          <Outlet />
        </div>
        </div>
        </div>
        );
        };

export default MainLayout;
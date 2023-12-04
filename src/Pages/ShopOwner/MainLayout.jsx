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
import { AccountCircle as AccountCircleIcon, Edit as EditIcon } from '@mui/icons-material';
import "../../styles/ShopOwner.css";

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
  ExitToApp as ExitToAppIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Help as HelpIcon,
} from '@mui/icons-material';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {Typography,Avatar,} from '@mui/material';

const MainLayout = () => {
  const location = useLocation();
  const user = location.state?.user;
  console.log('User in MainLayout:', user);
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
    console.log('Item clicked:', route);
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter((item) => item !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
    if (route) {
      navigate(route, { state: { user } });
    }
  };

  const handleRightItemClick = (index, route) => {
    console.log('Right Sidebar Item clicked:', route);
    // Handle right sidebar item click logic here
    if (route === '/login') {
      handleLogout();
    } else if (route) {
      navigate(route, { state: { user } });
    }
  };

  

  const handleLogout = async () => {
    // Perform any necessary logout actions on the server side
  
    // Clear authentication data on the client side
    // Example: Clearing a user session
    // This might vary based on your authentication mechanism
    // For example, if using a session:
    
   
  
    // Navigate to the login page
    navigate('/login', { replace: true });
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
        {/* Display username at the top of the left sidebar */}
       
        <div className="username">
        <div style={{ textAlign: 'center' }}>
          <Typography variant="h5">{user}</Typography>
        </div>
        </div>
        
        
        <List>
          {[
            

            { text: 'Dashboard', 
            icon: <DashboardIcon />, 
            route: '/'},
            
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
        {[
          { text: 'Profile', icon: <PersonIcon />, route: '/shopownerprofile' },
          { text: 'Message', icon: <MessageIcon />, route: '/messages' },
          { text: 'Notification', icon: <NotificationsIcon />, route: '/notifications' },
          { text: 'Help', icon: <HelpIcon />, route: '/help' },
         // { text: 'Settings', icon: <SettingsIcon />, route: '/settings' },
          { text: 'Logout', icon: <ExitToAppIcon />, route: '/login'}, 
        ].map((item, index) => (
          
          <ListItem
            button
            key={index}
            onClick={() => handleRightItemClick(index, item.route)}
            title={item.text} // Set the title attribute
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
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
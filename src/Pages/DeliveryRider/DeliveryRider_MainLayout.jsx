// Import necessary modules and components
import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
} from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  TwoWheeler as TwoWheelerIcon,
  Person as PersonIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Help as HelpIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon,
  HourglassEmpty as PendingDeliveriesIcon,
  CheckCircle as CompletedDeliveriesIcon,
  ThumbUp as AcceptedDeliveriesIcon,
} from '@mui/icons-material';
//import "../../styles/ShopOwner.css"; // Import your custom styles
import { useLocation } from 'react-router-dom';

const DeliveryRider_MainLayout = () => {
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();
  const [Open, setOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [leftOpenItems, setLeftOpenItems] = useState([]);
  const [rightOpenItems, setRightOpenItems] = useState([]);

  // Add any specific state for the delivery rider layout here

  const handleLeftDrawerOpen = () => {
    setOpen(true);
  };

  const handleLeftDrawerClose = () => {
    setOpen(false);
  };

  const handleRightDrawerOpen = () => {
    setRightOpen(true);
  };

  const handleRightDrawerClose = () => {
    setRightOpen(false);
  };

  const handleLeftItemClick = (index, route) => {
    console.log('Left Sidebar Item clicked:', route);
    // Implement your logic for handling left sidebar item clicks
    // You can navigate to the corresponding route if needed
    navigate(route, { state: { user } });
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
        open={Open}
        sx={{
          width: 20,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 220,
            boxSizing: 'border-box',
          },
        }}
      >
        {/* Display any rider-specific information at the top of the left sidebar */}
        <div className="rider-info">
          <div style={{ textAlign: 'center' }}>
            <Typography variant="h5">{user}</Typography>
          </div>
        </div>

        {/* List of items in the left sidebar */}
        <List>
          {[
            { text: 'Dashboard', icon: <DashboardIcon />, route: '/deliveryrider_mainlayout/DeliveryRider_Dashboard' },
            { text: 'Pending Deliveries', icon: <PendingDeliveriesIcon />, route: '/deliveryrider_mainlayout/DeliveryRider_pending_deliveries' },
            { text: 'Completed Deliveries', icon: <CompletedDeliveriesIcon />, route: '/deliveryrider_mainlayout/DeliveryRider_completed_deliveries' },
            { text: 'Accepted Deliveries', icon: <AcceptedDeliveriesIcon />, route: '/deliveryrider_mainlayout/DeliveryRider_accepted_deliveries' },
            // Add any additional items specific to the delivery rider layout
           ].map((item, index) => (
            <React.Fragment key={index}>
              <ListItem button onClick={() => handleLeftItemClick(index, item.route)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
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
          width: 240, // Adjust the width as needed
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
            { text: 'Profile', icon: <PersonIcon />, route: '/deliveryrider_mainlayout/deliveryriderprofile' },
            { text: 'Message', icon: <MessageIcon />, route: '/messages' },
            { text: 'Notification', icon: <NotificationsIcon />, route: '/notifications' },
            { text: 'Help', icon: <HelpIcon />, route: '/help' },
            { text: 'Settings', icon: <SettingsIcon />, route: '/settings' },
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
      <div style={{ flexGrow: 1, padding: '10px 1px 1px', marginLeft: Open ? -30 : 0, marginRight: open ? 80 : 0 }}>  
        <div style={{ overflowY: 'auto', height: '100vh' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DeliveryRider_MainLayout;

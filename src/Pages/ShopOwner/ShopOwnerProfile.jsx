
import React from 'react';
import {
  Paper,
  Typography,
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
import { AccountCircle as AccountCircleIcon, Edit as EditIcon } from '@mui/icons-material';
import "../../styles/ShopOwner.css";
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const ShopOwnerProfile = () => {
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();

  console.log('User in ShopOwnerProfile:', user);
  // Shop owner details
  const shopOwner = {
    username: 'user',
    password: 'pwd',
    role: 'role',
    shopName: 'Doe\'s Emporium',
    contact: 'phone',
    branch: 'branch',
    location: 'location',
    email: 'email@example.com',
  };

  const updateProfile = () => {
    navigate('/updateshopownerprofile',{ state: { user } });
  };

  return (
    <div style={{ padding: '20px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        {/* Shop owner avatar and name */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <Avatar style={{ marginRight: '10px' }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography variant="h5">{user}</Typography>
        </div>

        {/* Shop information */}
        <Typography variant="h6" gutterBottom>
          {shopOwner.shopName}
        </Typography>

        <Divider style={{ margin: '20px 0' }} />

        {/* Shop owner details */}
        <List>
          

          <ListItem>
           
            <ListItemText primary={`Email: ${shopOwner.email}`} />
          </ListItem>

          <ListItem>
            
            <ListItemText primary={`Contact: ${shopOwner.contact}`} />
          </ListItem>

          <ListItem>
           
            <ListItemText primary={`Branch: ${shopOwner.branch}`} />
          </ListItem>

          <ListItem>
            
            <ListItemText primary={`Location: ${shopOwner.location}`} />
          </ListItem>
        </List>

        
        <div className="button-container">
      
          <button onClick={updateProfile}>Update Profile</button>
        </div>
      </Paper>
    </div>
  );
};

export default ShopOwnerProfile;



import React, { useState, useEffect } from 'react';
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
import ShopOwnerRegisterService from '../../Services/ShopOwnerRegisterService';
import loginService from '../../Services/loginService';



const ShopOwnerProfile = () => {
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();

  console.log('User in ShopOwnerProfile:', user);
  // Shop owner details
  /*
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
  */

  const [shopOwner, setShopOwner] = useState({
    username: '',
    password: '',
    role: '',
    shop_name: '',
    contact: '',
    branch: '',
    location: '',
    email: '',
  });

  useEffect(() => {
    // Fetch shop owner details when the component mounts
    fetchShopOwners(user);
  }, [user]); // Empty dependency array ensures this effect runs once on mount


  const fetchShopOwners = (userName) => {
    ShopOwnerRegisterService.getShopOwnerByUserName(userName)
      .then(response => {
        setShopOwner(response.data);
      })
      .catch(error => {
        console.error('Error fetching shop owners:', error);
  
        // Log the details of the Axios error for debugging
        if (error.response) {
          // The request was made, but the server responded with a status code that falls out of the range of 2xx
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received. Request:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error in setting up the request:', error.message);
        }
      });
  };
  

  const updateProfile = () => {
    navigate('/updateshopownerprofile/${shopOwner.user',{ state: { user } });
  };

  const deleteProfile = () => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to delete your profile?');
  
    if (isConfirmed) {
      // User confirmed, proceed with deletion
      loginService.deleteUser(user)
        .then(() => {
          // If deletion is successful, navigate to the login page
          navigate('/login');
        })
        .catch(error => {
          console.error('Error deleting profile:', error);
  
          // Handle the error, you might want to show an error message to the user
        });
    } else {
      // User canceled, do nothing
      console.log('Deletion canceled by the user');
    }
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
          {shopOwner.shop_name}
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

          <button onClick={deleteProfile}>Delete Profile</button>

        </div>
      </Paper>
    </div>
  );
};

export default ShopOwnerProfile;
/*
import React, { useState, useEffect } from 'react';
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
import ShopOwnerRegisterService from '../../Services/ShopOwnerRegisterService';


const ShopOwnerProfile = () => {
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();

  console.log('User in ShopOwnerProfile:', user);
  // Shop owner details
  /*
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
  

  const [shopOwner, setShopOwner] = useState({
    username: '',
    password: '',
    role: '',
    shop_name: '',
    contact: '',
    branch: '',
    location: '',
    email: '',
  });

  useEffect(() => {
    // Fetch shop owner details when the component mounts
    fetchShopOwners(user);
  }, [user]); // Empty dependency array ensures this effect runs once on mount


  const fetchShopOwners = (userName) => {
    ShopOwnerRegisterService.getShopOwnerByUserName(userName)
      .then(response => {
        setShopOwner(response.data);
      })
      .catch(error => {
        console.error('Error fetching shop owners:', error);
  
        // Log the details of the Axios error for debugging
        if (error.response) {
          // The request was made, but the server responded with a status code that falls out of the range of 2xx
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received. Request:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error in setting up the request:', error.message);
        }
      });
  };
  

  const updateProfile = () => {
    navigate('/updateshopownerprofile/${shopOwner.user',{ state: { user } });
  };

  return (
    <div style={{ padding: '20px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        {/* Shop owner avatar and name }
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <Avatar style={{ marginRight: '10px' }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography variant="h5">{user}</Typography>
        </div>

        {/* Shop information }
        <Typography variant="h6" gutterBottom>
          {shopOwner.shop_name}
        </Typography>

        <Divider style={{ margin: '20px 0' }} />

        {/* Shop owner details }
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
*/

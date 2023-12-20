import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import DeliveryRiderRegisterService from '../../Services/DeliveryRiderRegisterService';


const DeliveryRiderProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;
  const [deliveryRider, setDeliveryRider] = useState({
    username: '',
    password: '',
    role: '',
    name: '',
    email: '',
    contact: '',
    area_of_pref: '',
    license: '',
    vehicle_type: '',
    vehicle_no: '',
  });

  useEffect(() => {
    // Fetch delivery rider details when the component mounts
    fetchDeliveryRider(user);
  }, [user]);

  const fetchDeliveryRider = (userName) => {
    DeliveryRiderRegisterService.getDeliveryRiderByUserName(userName)
      .then(response => {
        setDeliveryRider(response.data);
      })
      .catch(error => {
        console.error('Error fetching delivery rider details:', error);
        // Log the details of the Axios error for debugging
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          console.error('No response received. Request:', error.request);
        } else {
          console.error('Error in setting up the request:', error.message);
        }
      });
  };

  const updateProfile = () => {
    navigate(`/deliveryrider_mainlayout/updatedeliveryriderprofile/${deliveryRider.username}`, { state: { user } });
  };

  return (
    <div style={{ padding: '20px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        {/* Delivery rider avatar and name */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <Avatar style={{ marginRight: '10px' }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography variant="h5">{user}</Typography>
        </div>

        {/* Delivery rider details */}
        <List>
          <ListItem>
            <ListItemText primary={`Name: ${deliveryRider.name}`} />
          </ListItem>

          <ListItem>
            <ListItemText primary={`Email: ${deliveryRider.email}`} />
          </ListItem>

          <ListItem>
            <ListItemText primary={`Contact: ${deliveryRider.contact}`} />
          </ListItem>

          <ListItem>
            <ListItemText primary={`Area of Preference: ${deliveryRider.area_of_pref}`} />
          </ListItem>

          <ListItem>
            <ListItemText primary={`License: ${deliveryRider.license}`} />
          </ListItem>

          <ListItem>
            <ListItemText primary={`Vehicle Type: ${deliveryRider.vehicle_type}`} />
          </ListItem>

          <ListItem>
            <ListItemText primary={`Vehicle No: ${deliveryRider.vehicle_no}`} />
          </ListItem>
        </List>

        <Divider style={{ margin: '20px 0' }} />

        <div className="button-container">
          <button onClick={updateProfile}>Update Profile</button>
        </div>
      </Paper>
    </div>
  );
};

export default DeliveryRiderProfile;

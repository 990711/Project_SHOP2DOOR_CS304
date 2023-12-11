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
  TextField,
  InputLabel,
} from '@mui/material';
import { AccountCircle as AccountCircleIcon, Save as SaveIcon } from '@mui/icons-material';
//import "../../styles/ShopOwner.css";
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import DeliveryRiderRegisterService from '../../Services/DeliveryRiderRegisterService';

const UpdateDeliveryRiderProfile = () => {
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();

  console.log('User in UpdateDeliveryRiderProfile:', user);

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
    DeliveryRiderRegisterService.getDeliveryRiderByUserName(user).then((res) => {
      let deliveryRiderData = res.data;
      setDeliveryRider((prevDeliveryRider) => ({
        ...prevDeliveryRider,
        username: deliveryRiderData.username || '',
        password: deliveryRiderData.password || '',
        role: deliveryRiderData.role || '',
        name: deliveryRiderData.name || '',
        email: deliveryRiderData.email || '',
        contact: deliveryRiderData.contact || '',
        area_of_pref: deliveryRiderData.area_of_pref ||'',
        license: deliveryRiderData.license || '',
        vehicle_type: deliveryRiderData.vehicle_type || '',
        vehicle_no: deliveryRiderData.vehicle_no || '',
      }));
    });
  }, [user]);

  const handleChange = (field) => (event) => {
    setDeliveryRider({ ...deliveryRider, [field]: event.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();

    let updatedDeliveryRider = {
      username: user,
      password: deliveryRider.password,
      role: deliveryRider.role,
      name: deliveryRider.name,
      email: deliveryRider.email,
      contact: deliveryRider.contact,
      area_of_pref: deliveryRider.area_of_pref,
      license: deliveryRider.license,
      vehicle_type: deliveryRider.vehicle_type,
      vehicle_no: deliveryRider.vehicle_no,
    };

    console.log('updatedDeliveryRider =>', JSON.stringify(updatedDeliveryRider));

    DeliveryRiderRegisterService.updateDeliveryRiderByUserName(updatedDeliveryRider)
      .then((res) => {
        console.log('Server response:', res);
        navigate('/deliveryriderprofile', { state: { user } });
      })
      .catch((error) => {
        console.error('Error from server:', error);
      });
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

        <Divider style={{ margin: '20px 0' }} />

        {/* Delivery rider details */}
        <List>
          <ListItem>
            <ListItemText
              primary={
                <>
                  <InputLabel>Name</InputLabel>
                  <TextField
                    value={deliveryRider.name}
                    onChange={handleChange('name')}
                  />
                </>
              }
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary={
                <>
                  <InputLabel>Email</InputLabel>
                  <TextField
                    value={deliveryRider.email}
                    onChange={handleChange('email')}
                  />
                </>
              }
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary={
                <>
                  <InputLabel>Contact</InputLabel>
                  <TextField
                    value={deliveryRider.contact}
                    onChange={handleChange('contact')}
                  />
                </>
              }
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary={
                <>
                  <InputLabel>Area of Preference</InputLabel>
                  <TextField
                    value={deliveryRider.area_of_pref}
                    onChange={handleChange('area_of_pref')}
                  />
                </>
              }
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary={
                <>
                  <InputLabel>License</InputLabel>
                  <TextField
                    value={deliveryRider.license}
                    onChange={handleChange('license')}
                  />
                </>
              }
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary={
                <>
                  <InputLabel>Vehicle Type</InputLabel>
                  <TextField
                    value={deliveryRider.vehicle_type}
                    onChange={handleChange('vehicle_type')}
                  />
                </>
              }
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary={
                <>
                  <InputLabel>Vehicle No</InputLabel>
                  <TextField
                    value={deliveryRider.vehicle_no}
                    onChange={handleChange('vehicle_no')}
                  />
                </>
              }
            />
          </ListItem>
        </List>

       

        <div className="button-container">
          <button variant="contained" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </Paper>
    </div>
  );
};

export default UpdateDeliveryRiderProfile;

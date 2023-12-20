// UpdateShopOwnerProfile.js
import React, { useState, useEffect } from 'react';
import { Paper, Typography, Avatar, Button, Divider, List, ListItem, ListItemText, ListItemAvatar, TextField ,InputLabel} from '@mui/material';
import { AccountCircle as AccountCircleIcon, Save as SaveIcon } from '@mui/icons-material';
import "../../styles/ShopOwner.css";
import { Link } from 'react-router-dom';
//const { username } = useParams();
import { useNavigate } from 'react-router-dom';
import ShopOwnerRegisterService from '../../Services/ShopOwnerRegisterService';

import { useLocation } from 'react-router-dom';

const UpdateShopOwnerProfile = () => {
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();

  console.log('User in UpdateShopOwnerProfile:', user);

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
    ShopOwnerRegisterService.getShopOwnerByUserName(user).then((res) => {
      let ShopOwnerData = res.data;
      setShopOwner((prevShopOwner) => ({
        ...prevShopOwner,
        //username: ShopOwnerData.username || '',
        password: ShopOwnerData.password || '',
        role: ShopOwnerData.role || '',
        shop_name: ShopOwnerData.shop_name || '',
        contact: ShopOwnerData.contact || '',
        branch: ShopOwnerData.branch || '',
        location: ShopOwnerData.location || '',
        email: ShopOwnerData.email || '',
      }));
    });
  }, [user]);



  const handleChange = (field) => (event) => {
    setShopOwner({ ...shopOwner, [field]: event.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    let updatedShop = {
      username:user,
      password: shopOwner.password,
      role: shopOwner.role,
      shop_name: shopOwner.shop_name,
      contact: shopOwner.contact,
      branch: shopOwner.branch,
      location: shopOwner.location,
      email: shopOwner.email,
      
  };

  console.log('updatedShop =>' + JSON.stringify(updatedShop));

  ShopOwnerRegisterService.updateShopOwnerByUserName(updatedShop)
  .then((res) => {
    console.log('Server response:', res);
    navigate('/shopownerprofile',{ state: { user } });
  })
  .catch((error) => {
    console.error('Error from server:', error);
  });
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

        

        <Divider style={{ margin: '20px 0' }} />

        {/* Shop owner details */}
        <List>
          

        <ListItem>
           
           <ListItemText primary={
               <>
               <InputLabel>Shop Name</InputLabel>

             <TextField
               
               value={shopOwner.shop_name}
               onChange={handleChange('shop_name')}
             />
             </>
           } />
         </ListItem>

          <ListItem>
           
            <ListItemText primary={
                <>
                <InputLabel>Email</InputLabel>

              <TextField
                
                value={shopOwner.email}
                onChange={handleChange('email')}
              />
              </>
            } />
          </ListItem>

          <ListItem>
            
            <ListItemText primary={
                <>
                
                <InputLabel>Contact</InputLabel>
              <TextField
                
                value={shopOwner.contact}
                onChange={handleChange('contact')}
              /></>
            } />
          </ListItem>

          <ListItem>
            
            <ListItemText primary={
                <>
                
                <InputLabel>Branch</InputLabel>
              <TextField
                
                value={shopOwner.branch}
                onChange={handleChange('branch')}
              /></>
            } />
          </ListItem>

          <ListItem>
            
            <ListItemText primary={
                <>
                
                <InputLabel>Location</InputLabel>
              <TextField
               
                value={shopOwner.location}
                onChange={handleChange('location')}
              />
              </>
            } />
          </ListItem>
        </List>

        <div className="button-container">
          <button onClick={handleSave}  variant="contained">
            Save Changes
          </button>
        </div>
      </Paper>
    </div>
  );
};

export default UpdateShopOwnerProfile;

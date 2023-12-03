// UpdateShopOwnerProfile.js
import React from 'react';
import { Paper, Typography, Avatar, Button, Divider, List, ListItem, ListItemText, ListItemAvatar, TextField ,InputLabel} from '@mui/material';
import { AccountCircle as AccountCircleIcon, Save as SaveIcon } from '@mui/icons-material';
import "../../styles/ShopOwner.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

const UpdateShopOwnerProfile = () => {
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();

  console.log('User in UpdateShopOwnerProfile:', user);

  // Shop owner details
  const [shopOwner, setShopOwner] = React.useState({
    username: 'user',
    password: 'pwd',
    role: 'role',
    shopName: 'Doe\'s Emporium',
    contact: 'phone',
    branch: 'branch',
    location: 'location',
    email: 'email@example.com',
  });

  const handleChange = (field) => (event) => {
    setShopOwner({ ...shopOwner, [field]: event.target.value });
  };

  const handleSave = () => {
    // Add logic to save the updated profile details
    // This can involve making an API call to update the user's information
    // For now, let's just log the updated profile details
    console.log('Updated Shop Owner Profile:', shopOwner);
    navigate('/shopownerprofile',{ state: { user } });
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

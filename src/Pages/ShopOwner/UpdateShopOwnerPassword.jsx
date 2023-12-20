import React, { useState } from 'react';
import { Paper, Typography, Avatar, Button, Divider, List, ListItem, ListItemText, TextField, InputLabel } from '@mui/material';
import { Lock as LockIcon, Save as SaveIcon } from '@mui/icons-material';

const UpdateShopOwnerPassword = ({ onSave }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = (field) => (event) => {
    if (field === 'password') {
      setPassword(event.target.value);
    } else if (field === 'confirmPassword') {
      setConfirmPassword(event.target.value);
    }
  };

  const handleSave = () => {
    onSave(password, confirmPassword);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <Avatar style={{ marginRight: '10px' }}>
            <LockIcon />
          </Avatar>
          <Typography variant="h5">Change Password</Typography>
        </div>

        <Divider style={{ margin: '20px 0' }} />

        <List>
          <ListItem>
            <ListItemText
              primary={
                <>
                  <InputLabel>New Password</InputLabel>
                  <TextField type="password" value={password} onChange={handleChange('password')} />
                </>
              }
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary={
                <>
                  <InputLabel>Confirm Password</InputLabel>
                  <TextField type="password" value={confirmPassword} onChange={handleChange('confirmPassword')} />
                </>
              }
            />
          </ListItem>
        </List>

        <div className="button-container">
          <Button onClick={handleSave} variant="contained">
            Save Changes
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default UpdateShopOwnerPassword;

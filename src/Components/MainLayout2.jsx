import React, { useState } from 'react';
import { Drawer, Grid, Paper, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MainLayout2 = () => {
  const [rightOpen, setRightOpen] = useState(true);
  const navigate = useNavigate();

  const handleRightDrawerOpen = () => {
    setRightOpen(true);
  };

  const handleRightDrawerClose = () => {
    setRightOpen(false);
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Right Drawer (Sidebar) */}
      <Drawer
        variant="persistent"
        anchor="right"
        open={rightOpen}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: "50%",
            boxSizing: 'border-box',
          },
        }}
      >
        {/* Right Sidebar Content */}
        {/* You can add any content here, for example, an image */}
        <img src="your-image-url.jpg" alt="Sample" style={{ width: '100%', height: 'auto' }} />
      </Drawer>

      {/* Content */}
      <div style={{ flexGrow: 1, width: '50%', padding: '100px 20px 20px', marginLeft: rightOpen ? 240 : 0, textAlign: 'left' }}>
        <Grid container spacing={2}>
          {/* Left Section (Form) */}
          <Grid item xs={12}>
            <Paper style={{ padding: '20px', height: '100%' }}>
              {/* Your form content goes here */}
              <h2>Form Section</h2>
              <form>
                <TextField label="Name" variant="outlined" fullWidth margin="normal" />
                <TextField label="Email" variant="outlined" fullWidth margin="normal" />
                <TextField label="Message" variant="outlined" multiline fullWidth rows={4} margin="normal" />
                <Button variant="contained" color="primary" fullWidth>
                  Submit
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default MainLayout2;

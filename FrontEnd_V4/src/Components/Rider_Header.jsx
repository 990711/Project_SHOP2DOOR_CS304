import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Toolbar > 
          
          <Typography variant="h3" component="div" sx={{ flexGrow: 1, textAlign: 'left' ,fontWeight: 'bold',color:'#003d2b'}}>
            SHOP2DOOR
          </Typography>
          <Button color="inherit" sx={{ color:'#003d2b'}}>Home</Button>
          <Button color="inherit" sx={{ color:'#003d2b'}}>Login</Button>
          <Button color="inherit" sx={{ color:'#003d2b'}}>Contact</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
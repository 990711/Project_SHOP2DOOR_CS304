import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Rider_Account from '../Components/Rider_Account';
import Rider_Functions from '../Components/Rider_Functions';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#003d2b',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius:0,
  height: "100vh",
}));

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" sx={{ color: '#003d2b'  }}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        SHOP2DOOR
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Footer = () => (
  // Define your footer component here
  <Box sx={{
    py: 3,
    px: 2,
    backgroundColor: 'white',
  }}>
    <Copyright/>
  </Box>
);

export default function Profile() {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={0} >

    <Grid item xs={6} md={4}>
        <Item >
          <div style={{display: 'flex',alignItems: 'center',justifyContent: 'center',height:'80vh'}}>
          <Rider_Account/>
          </div>
         
        </Item>
      </Grid>
      <Grid item xs={6} md={8}>
        <Item>
          <div style={{display: 'flex',alignItems: 'center',justifyContent: 'center',height:'60vh',
          width:'120vh', border: '2px solid #b9f7c6',marginTop:80}}>
          <Rider_Functions/>
          </div>
          
        </Item>
      </Grid>
      
      
    </Grid>

   <Footer/>

  </Box>
  )
}
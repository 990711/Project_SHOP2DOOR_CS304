import React from 'react'
import { styled } from '@mui/system';

const CircularContainer = styled('div')({
  width: '180px', // Adjust the width and height as needed
  height: '180px',
  backgroundColor: '#b9f7c6', // Background color for the circle
  borderRadius: '50%', // Makes the container circular
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden', // Ensures the image is clipped to the circular shape
  
});

export default function Account() {
  return (
    <div>
        
        <CircularContainer>

        <img src="https://easydrawingguides.com/wp-content/uploads/2022/07/Cute-Girl_cute_anime_girls_head_and_face_drawing_tutorials.png" 
        alt="Profile Image" style={{ maxWidth: '100%', height: 'auto' }} />

          
        </CircularContainer>

        <h3 style={{color:'#b9f7c6'}}>
          Anushka Reshani
        </h3>
        <hr/>
        <h1 style={{color:'#b9f7c6'}}>
          Delivery Rider
        </h1>

        <br/><br/><br/>

        <p style={{color:'#b9f7c6'}}>Find more {'>'}{'>'}{'>'}</p> {/*this must be a link */}
      
    </div>
  )
}
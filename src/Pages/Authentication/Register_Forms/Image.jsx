import React from 'react';
//import myImage from '../../../images/shoptodoor.jpg'; // Adjust the path to your image file
import myImage from "../../../assets/shoptodoor.jpg";
const Image = () => {
    return (
      <div>
        
        <img src={myImage} 
        alt="" 
        style={{ height: '837px' }} 
        />
      </div>
    );
  }
  
  export default Image;
  
  
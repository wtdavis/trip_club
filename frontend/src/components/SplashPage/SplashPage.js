import React, { useState, useEffect } from 'react';
import './SplashPage.css'


function SplashPage() {
 return (
  <div className='splash_container'>
    <video muted autoplay="autoplay" playsinline loop id="bg_video">
      <source src="https://trip-club-dev.s3.amazonaws.com/splash/bg_video.mp4" type="video/mp4"></source>      
    </video>  

    <div className='text_container'>
      <h1>HELLO</h1>  
    </div>  
  </div>
 ) 
}
export default SplashPage;


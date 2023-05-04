import React, { useState, useEffect } from 'react';
import './SplashPage.css'


function SplashPage() {
 return (
  
  <div className='splash_container'>
    <video muted autoplay="autoplay" playsinline loop id="bg_video">
      <source src="https://trip-club-dev.s3.amazonaws.com/splash/bg_video.mp4" type="video/mp4"></source>      
    </video> 
     

    <div className='text_container'>
      <div className='text_content'>

      <h1 className='text_h1'>Welcome to Trip Club</h1>  
      <p className='text_p'>the ultimate platform for planning your dream travel and events with your friends</p>
      <p className='text_p'>We understand that planning a trip can be stressful, time-consuming, and overwhelming. That's why we've created Trip Club, a convenient tool for all your travel planning needs.</p>
      <p className='text_p'>Our platform allows easily plan and customize your travel itineraries, invite your friends to join, and collaborate together to create unforgettable memories. </p>
      {/* <span className='text_h1' id="tooltip" data-tooltip="With Trip Club, you can easily share your travel plans, make real-time updates, and communicate with your travel buddies to ensure everyone is on the same page.
        No more endless group chats, lost emails, or scattered notes - with Trip Club, you can keep all your travel plans and event details in one convenient location. 
        Access your travel plans from anywhere, at any time, so you can focus on enjoying your trip without any added stress!
        Join the Trip Club community today and experience hassle-free travel planning like never before. Start planning your next adventure and get ready for a journey of a lifetime!">Welcome to Trip Club</span>     */}
      </div>

   </div>  
  </div>
 ) 
}
export default SplashPage;


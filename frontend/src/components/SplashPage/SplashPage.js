import React, { useState, useEffect } from 'react';
import './SplashPage.css'


function SplashPage() {
 return (
  
  <div className='splash_container'>

    <div className='video_container'>
      <video muted autoplay="autoplay" playsinline loop id="bg_video">
        <source src="https://trip-club-dev.s3.amazonaws.com/splash/bg_video.mp4" type="video/mp4"></source>      
      </video> 

      <div className='text_container'>
        <div className='text_content'>
          <h1 className='text_h1'>welcome to the Trip Club</h1>  
       </div>
      </div>  
    </div>

    <div className='about_container'>
      <h1 className='text_h1'>ABOUT</h1>
      <p className='text_p'>TRIP CLUB is the platform for planning your dream travel with your friends</p>
      
      <div className="about_grid_container">
      <div className="about_column">
            <div class="flip_card" tabIndex="0">
              <div class="flip_card_inner">
                <div class="flip_card_front">
                  <h3>Hover, please!</h3>
                </div>
                <div class="flip_card_back">
                  <h3>Responsive Design</h3>
                </div>
              </div>
            </div>

            <div className="about_bullet">
              <p>customize your travel itineraries, invite your friends to join, and collaborate together to create unforgettable memories</p>
            </div>

          </div>

          <div className="about_column">
            <div class="flip_card" tabIndex="0">
              <div class="flip_card_inner">
                <div class="flip_card_front">
                  <h3>Hover, please!</h3>
                </div>
                <div class="flip_card_back">
                  <h3>Easy to use</h3>
                </div>
              </div>
            </div>

            <div className="about_bullet">
              <p>Intuitive and simple design</p>
            </div>

          </div>

          <div className="about_column">
            <div class="flip_card" tabIndex="0">
              <div class="flip_card_inner">
                <div class="flip_card_front">
                  <h3>Hover, please!</h3>
                </div>
                <div class="flip_card_back">
                  <h3>Effective Planning</h3>
                </div>
              </div>
            </div>

            <div className="about_bullet">
              <p>No more endless group chats, lost emails, or scattered notes - with Trip Club, you can keep all your travel plans and event details in one convenient location. </p>
            </div>

          </div>
        </div>
      
    </div>
     


  </div>
 ) 
}
export default SplashPage;


import React, { useState, useEffect } from 'react';
import './SplashPage.css'


function SplashPage() {
 return (
  
  <div className='splash_container'>

    <div className='video_container'>
      <video muted autoplay="autoplay" playsinline loop id="bg_video">
        <source src="https://trip-club-dev.s3.amazonaws.com/splash/bg_video.mp4" type="video/mp4"></source>      
      </video> 

          <h1 className='video_h1' data-bf="Welcome to the" data-af="ultimate trip planner">TRIP CLUB</h1>
      {/* <div className='text_container'>

      </div>   */}
    </div>

    <div className='about_container'>
      <h1 className='about_h1'>ABOUT</h1>
      <p className='about_p'>TRIP CLUB is the platform for planning your dream travel with your friends</p>
      
      <div className="about_grid_container">
        <div className="about_column">
            <div class="flip_card" tabIndex="0">
              <div class="flip_card_inner">
                <div class="flip_card_front">
                <i className="fa-solid fa-laptop-code fa-10x"></i>
                </div>
                <div class="flip_card_back">
                  <h3>Responsive Design</h3>
                </div>
              </div>
            </div>

            <div className="about_bullet">
              <p>Customize your travel itineraries, invite your friends to join, and collaborate together to create unforgettable memories</p>
            </div>

        </div>

        <div className="about_column">
            <div class="flip_card" tabIndex="0">
              <div class="flip_card_inner">
                <div class="flip_card_front">
                  <i class="fa-regular fa-face-grin-wide fa-10x"></i>
                </div>
                <div class="flip_card_back">
                  <h3>Easy to Use</h3>
                </div>
              </div>
            </div>

            <div className="about_bullet">
              <p>The navigation is intuitive. Collaboratively create and edit trip and event details</p>
            </div>

        </div>

        <div className="about_column">
            <div class="flip_card" tabIndex="0">
              <div class="flip_card_inner">
                <div class="flip_card_front">
                  <i class="fa-solid fa-chart-line fa-10x"></i>
                </div>
                <div class="flip_card_back">
                  <h3>Effective Planning</h3>
                </div>
              </div>
            </div>

            <div className="about_bullet">
              <p>No more endless group chats, lost emails, or scattered notes - with Trip Club, you can keep all your travel details in one convenient place. </p>
            </div>

        </div>
      </div>
      
    </div>
     


  </div>
 ) 
}
export default SplashPage;


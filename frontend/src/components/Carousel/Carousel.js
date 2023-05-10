import React, { useState } from 'react';
import { RxDotFilled } from 'react-icons/rx';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

function Carousel() {
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    {url: "https://trip-club-dev.s3.amazonaws.com/trips/1/event1/1.jpg"},
    {url: "https://trip-club-dev.s3.amazonaws.com/trips/1/event1/2.jpg"},
    {url: "https://trip-club-dev.s3.amazonaws.com/trips/1/event1/3.jpg"},
    {url: "https://trip-club-dev.s3.amazonaws.com/trips/1/event3/1.jpg"}         
  ];

  const prevPhoto = () => {
    const nextIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(nextIndex);
  };

  const nextPhoto = () => {
    const nextIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);  
  };

  const switchToPhoto = (photoIndex) => {
    setCurrentIndex(photoIndex);
  };

  return (
    <div className="max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group">
      <div 
        style={{backgroundImage:`url(${slides[currentIndex].url})`}} 
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500">
      </div>

      <div className='absolute -translate-x-0 translate-y-[-50%] left-7 text-3xl top-[50%] rounded-full p-3 cursor-pointer bg-black/20 text-white'>
        <BsChevronCompactLeft onClick={prevPhoto} />
      </div>
      <div className='absolute -translate-x-0 translate-y-[-50%] right-7 text-3xl top-[50%] rounded-full p-3 cursor-pointer bg-black/20 text-white'>
        <BsChevronCompactRight onClick={nextPhoto} />
      </div>

      <div className='flex justify-center py-1 '>
        {slides.map((photo, photoIndex) => (
          <div
            className='text-3xl cursor-pointer'
            key={photoIndex}
            onClick={() => switchToPhoto(photoIndex)}
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
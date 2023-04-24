function SplashPage() {

  const slides = [
    {url: "https://trip-club-dev.s3.amazonaws.com/trips/1/event1/1.jpg"},
    {url: "https://trip-club-dev.s3.amazonaws.com/trips/1/event1/2.jpg"},
    {url: "https://trip-club-dev.s3.amazonaws.com/trips/1/event1/3.jpg"},
    {url: "https://trip-club-dev.s3.amazonaws.com/trips/1/event3/1.jpg"}         
  ];
  
  return (
    <div className="max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative">
      <div 
        style={{backgroundImage:`url(${slides[0].url})`}} 
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500">
      </div>
    </div>
  );
}

export default SplashPage;

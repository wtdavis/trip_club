import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';
import Navigation from './components/NavBar/Navigation';
import Footer from './components/Footer/Footer';

import SplashPage from './components/SplashPage/SplashPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import ContactUs from './components/ContactUs/ContactUs';
// import Tweets from './components/Tweets/Tweets';
// import Trips from './components/Trips/Trips';
// import Profile from './components/Profile/Profile';
import ProfilePage from './components/Profile/ProfilePage';
// import TweetCompose from './components/Tweets/TweetCompose';
import TripForm from './components/TripForm/TripForm';

import { getCurrentUser } from './store/session';
import TripShow from './components/TrpShow/TripShow';
import TripEditForm from './components/TripForm/TripEditForm'

function App() {
  const [loaded, setLoaded] = useState(false);
  // const [showLoginModal, setShowLoginModal] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <Navigation />
      {/* <NavBar /> */}
      <Switch>
        <AuthRoute exact path="/" component={SplashPage} />
        {/* <AuthRoute exact path="/login" component={LoginForm} /> */}
        {/* <AuthRoute exact path="/signup" component={SignupForm} /> */}
        <Route exact path={'/contact'}><ContactUs /></Route> 


        {/* <ProtectedRoute exact path="/tweets" component={Tweets} /> */}
        {/* <ProtectedRoute exact path="/trips" component={Trips} /> */}
        {/* <ProtectedRoute exact path="/profile" component={Profile} /> */}
        <ProtectedRoute exact path="/trips/show" component={(props) => <TripShow {...props}/>}/> 
        {/* <ProtectedRoute exact path="/trips/show" component={TripShow}/>  */}

        <ProtectedRoute exact path="/profile"><ProfilePage /></ProtectedRoute>
        {/* <ProtectedRoute exact path="/tweets/new" component={TweetCompose} /> */}
        <ProtectedRoute exact path="/trips/:tripId/edit" component={TripEditForm} />
        <ProtectedRoute exact path="/trips/new" component={TripForm} />
        {/* <ProtectedRoute exact path='/trips/show'><TripShow /></ProtectedRoute>  */}
        {/* <ProtectedRoute exact path="/trips/show" component={TripShow} /> */}
        {/* <Route exact path={'/trips/show'}><TripShow /></Route>  */}
      </Switch>

      {/* <Footer /> */}

    </>
  );
}

export default App;

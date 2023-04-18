import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';

import SplashPage from './components/SplashPage/SplashPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import Tweets from './components/Tweets/Tweets';
// import Trips from './components/Trips/Trips';
import Profile from './components/Profile/Profile';
import ProfilePage from './components/Profile/ProfilePage';
import TweetCompose from './components/Tweets/TweetCompose';
// import TripShow from './components/Trips/TripShow';
// import TripForm from './components/TripForm/TripForm';

import { getCurrentUser } from './store/session';
import TripForm from './components/TripForm/TripForm';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <NavBar />
      <Switch>
        <AuthRoute exact path="/" component={SplashPage} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />

        <ProtectedRoute exact path="/tweets" component={Tweets} />
        {/* <ProtectedRoute exact path="/trips" component={Trips} /> */}
        {/* <ProtectedRoute exact path="/profile" component={Profile} /> */}
        <ProtectedRoute exact path="/profile"><ProfilePage /></ProtectedRoute>
        <ProtectedRoute exact path="/tweets/new" component={TweetCompose} />
        <ProtectedRoute exact path="/trips/new" component={TripForm} />
        {/* <ProtectedRoute exact path="/trips/show" component={TripShow} /> */}
        {/* <Route exact path={'/trips/show'}><TripShow /></Route>  */}
      </Switch>
    </>
  );
}

export default App;

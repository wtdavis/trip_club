import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

  const getLinks = () => {
    if (loggedIn) {
      return (

        <div className="navlinkdiv" >
          {/* <Link className="navlink"  to={'/tweets'}>All Tweets</Link> */}
          <Link className="navlink"  to={'/profile'}>Profile</Link>
          {/* <Link  className="navlink" to={'/tweets/new'}>Write a Tweet</Link> */}
          <Link className="navlink"  to={'/trips/new'}> Create a Trip</Link>

          {/* <Link to={'/login'}> <button onClick={logoutUser}>Logout</button></Link> */}
          <div id="logoutbutton" className="navlink" onClick={logoutUser}>Logout</div>
        </div>
      );
    } else {
      return (
        <div className="navlinkdiv" >
          <Link className="navlink"  to={'/signup'}>Signup</Link>
          <Link className="navlink"  to={'/login'}>Login</Link>
        </div>
      );
    }
  }

  return (
    <div className="NavBar">
      <div className="navtitlediv">
      <h1 classname="navtitle">The Trip Club</h1>
      </div>
      { getLinks() }
    </div>
  );
}

export default NavBar;

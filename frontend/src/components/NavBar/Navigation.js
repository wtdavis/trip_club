import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../store/session';
// import ContactUs from '../ContactUs/ContactUs';
import { Modal } from '../../context/Modal';
import LoginFormModal from '../SessionForms/LoginFormModal';
import SignupFormModal from '../SessionForms/SignupFormModal';
import './NavBar.css';

function Navigation () {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

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
          <Link className="navlink"  to={'/profile'}>profile</Link>
          {/* <Link  className="navlink" to={'/tweets/new'}>Write a Tweet</Link> */}
          <Link className="navlink"  to={'/trips/new'}> create a trip</Link>

          <Link className="navlink" to={'/'}> <button id="navlink_logout" onClick={logoutUser}>logout</button></Link>
          <Link className="navlink"  to={'/contact'}>contact us</Link>
          {/* <div className="navlink"  onClick={logoutUser}>logout</div> */}
        </div>
      );
    } 
    else {
      return (
        <div className="navlinkdiv" >
          {/* <Link className="navlink"  to={'/login'}>login</Link> */}
          <button className="navlink" onClick={()=> setShowLoginModal(true)}>login</button>
          {/* <Link className="navlink"  to={'/signup'}>signup</Link> */}
          <button className="navlink" onClick={()=> setShowSignupModal(true)}>signup</button>
          <Link className="navlink"  to={'/contact'}>contact us</Link>
          


        </div>
      );
    }
  }

  return (
    <>
      <header className="site-header">
        <NavLink className="nav-title" exact to="/" >
          <div className = "logo-box">
            <div className="logo-name">trip club</div>
          </div>
        </NavLink>

        <div className="site_header_right_side">
            { getLinks() }
        </div>

        {/* <div className='site_header_right_side_________'>
          <div className="site_header_right_side">
            { getLinks() }
          </div>

          <Link className="contact_us_link"  to={'/contact'}>
            <div className='contact_us'>Contact Us</div>
          </Link>
        </div> */}

        {showLoginModal && (
          <Modal onClose={() => setShowLoginModal(false)}>
            <LoginFormModal setShowLoginModal={setShowLoginModal} />
            {/* <LoginFormModal /> */}
          </Modal>
        )}

        {showSignupModal && (
          <Modal onClose={() => setShowSignupModal(false)}>
            <SignupFormModal setShowSignupModal={setShowSignupModal}/>
          </Modal>
        )}

        
        

      </header>


    </>
    // <div className="navlinkdiv" >
    //   {/* <Link className="navlink"  to={'/login'}>login</Link> */}
    //   <button onClick={()=> setShowLoginModal(true)}>login</button>
      
    //   {/* <Link className="navlink"  to={'/signup'}>signup</Link> */}
    //   <button onClick={()=> setShowSignupModal(true)}>signup</button>

    //   <Link className="navlink"  to={'/contact'}>contact us</Link>
      
    //   {showLoginModal && (
    //     <Modal onClose={() => setShowLoginModal(false)}>
    //       <LoginFormModal setShowLoginModal={setShowLoginModal} />
    //     </Modal>
    //   )}

    //   {showSignupModal && (
    //     <Modal onClose={() => setShowSignupModal(false)}>
    //       <SignupFormModal setShowSignupModal={setShowSignupModal}/>
    //     </Modal>
    //   )}
    // {console.log(showLoginModal)}
    // </div>
  );
}

export default Navigation;
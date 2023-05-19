import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../store/session';
import { Modal } from '../../context/Modal';
import LoginFormModal from '../SessionForms/LoginFormModal';
import SignupFormModal from '../SessionForms/SignupFormModal';
import TripFormModal from '../TripForm/TripFormModal';
import './Navigation.css';
import { useLocation } from "react-router-dom";


function Navigation () {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showCreateTripModal, setShowCreateTripModal] = useState(false);
  const currentUser = useSelector(state => state.session.user);

  const loggedIn = useSelector(state => !!state.session.user);

  const location = useLocation();
  const dispatch = useDispatch();
  
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

  const getLinks = () => {
    if (loggedIn) {
      return (

        <div className="navlinkdiv" >
          <Link className="navlink"  to={'/profile'}>
            {currentUser.profileImageUrl ?
              <img className="profile_image" src={currentUser.profileImageUrl} alt=""/> :
              undefined
            }
            <span className='navlink_profile'>profile</span>
          </Link>
          
          <button className="navlink" onClick={()=> setShowCreateTripModal(true)}>create a trip</button>

          <Link className="navlink" to={'/'}> <button id="navlink_logout" onClick={logoutUser}>logout</button></Link>
          <Link className="navlink"  to={'/contact'}>contact us</Link>
        </div>
      );
    } 
    else {
      return (
        <div className="navlinkdiv" >
          <button className="navlink splash_page" onClick={()=> setShowLoginModal(true)}>login</button>
          <button className="navlink splash_page" onClick={()=> setShowSignupModal(true)}>signup</button>
          <Link className="navlink splash_page"  to={'/contact'}>contact us</Link> 


        </div>
      );
    }
  }

  return (
    <>
      {location.pathname === "/" ? (
              <header className="site_header">
              <NavLink className="nav-title" exact to="/" >
                <div className = "logo-box">
                  <div className="logo_name">trip club</div>
                </div>
              </NavLink>
      
              <div className="site_header_right_side">
                  { getLinks() }
              </div>
              
              {showLoginModal && (
                <Modal onClose={() => setShowLoginModal(false)}>
                  <LoginFormModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal}/>
                  {/* <LoginFormModal /> */}
                </Modal>
              )}
      
              {showSignupModal && (
                <Modal onClose={() => setShowSignupModal(false)}>
                  <SignupFormModal setShowSignupModal={setShowSignupModal}/>
                </Modal>
              )}
      
              {showCreateTripModal && (
                <Modal onClose={() => setShowCreateTripModal(false)}>
                  <TripFormModal setShowCreateTripModal={setShowCreateTripModal} />
                </Modal>
              )}
      
              
              
      
            </header>
      ) : (
        <header className="site_header notsplash_page">
        <NavLink className="nav-title" exact to="/" >
          <div className = "logo-box">
            <div className="logo_name notsplash_page">trip club</div>
          </div>
        </NavLink>

        <div className="site_header_right_side">
            { getLinks() }
        </div>
        
        {showLoginModal && (
          <Modal onClose={() => setShowLoginModal(false)}>
            <LoginFormModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal}/>
            {/* <LoginFormModal /> */}
          </Modal>
        )}

        {showSignupModal && (
          <Modal onClose={() => setShowSignupModal(false)}>
            <SignupFormModal setShowSignupModal={setShowSignupModal}/>
          </Modal>
        )}

        {showCreateTripModal && (
          <Modal onClose={() => setShowCreateTripModal(false)}>
            <TripFormModal setShowCreateTripModal={setShowCreateTripModal} />
          </Modal>
        )}

        
        

      </header>
      )
      }
    </>
  );
}

export default Navigation;

import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import TripFormModal from '../TripForm/TripFormModal';
import { logout } from '../../store/session';

import './DropDown.css';

const DropDown = ({ user }) => {
  const [showCreateTripModal, setShowCreateTripModal] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setMenu(open => !open);
  };

  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (!menu) return;

    const closeMenu = () => {
      setMenu(false);
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [menu]);

  const logoutUser = e => {
    e.preventDefault();
    dispatch(logout());
}

  return (
    <>
      <button className='profile_button' onClick={toggleMenu}>
          {user.profileImageUrl ?
            <img className="profile_image" src={user.profileImageUrl} alt=""/> :
              undefined
          }
          <span className='drop_down_username'>{user.username}</span>
        {/* <i id="profile_button_bars" className="fa-solid fa-bars"></i> */}
        {/* <i id="profile_button_user_circle" className="fa-regular fa-user-circle" /> */}
      </button>

      {menu && (
        <ul className="profile_dropdown_login" onClick={() => setMenu(false)}>
          <li>{user.username}</li>
          <li><Link className="navlink"  to={'/profile'}>
            <span className='navlink_profile'>your trips</span>
            </Link>
          </li>
          <li> <Link className="navlink" to={'/'}> <button id="navlink_logout" onClick={logoutUser}>logout</button></Link></li>

          <li> <button className="navlink" onClick={()=> setShowCreateTripModal(true)}>create a trip</button></li>
          <li> Name</li>
          <li> Name</li>
          <li className='dropdown-divider'></li>
        </ul>
      )}

      {showCreateTripModal && (
        <Modal onClose={() => setShowCreateTripModal(false)}>
          <TripFormModal setShowCreateTripModal={setShowCreateTripModal} />
        </Modal>
      )}
    </>
  );
}

export default DropDown;
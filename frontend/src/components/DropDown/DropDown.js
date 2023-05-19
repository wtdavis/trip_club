import React, { useState, useEffect} from 'react';
import { Modal } from '../../context/Modal';
import { useSelector } from 'react-redux';
import './DropDown.css';

const DropDown = ({}) => {
  const user = useSelector(({session}) => session.user)
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

  return (
    <>
      <button className='profile_button' onClick={toggleMenu}>
        <i id="profile_button_bars" className="fa-solid fa-bars"></i>
        <i id="profile_button_user_circle" className="fa-regular fa-user-circle" />
      </button>

      {menu && (
          <ul className="profile_dropdown_login" onClick={() => setMenu(false)}>
              <li> Name</li>
              <li> Name</li>
              <li> Name</li>
              <li> Name</li>
              <li> Name</li>
              <li> Name</li>
              <li className='dropdown-divider'></li>
          </ul>
      )}
    </>
  );
}

export default DropDown;
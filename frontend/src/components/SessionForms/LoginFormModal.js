
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from "../../store/session";
import './FormModal.css';


const LoginFormModal = (props) => {
  // const LoginFormModal = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const {setShowLoginModal} = props;
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(sessionActions.clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login({ email, password })); 
  };

  const handleDemo = (e) => {

    return dispatch(sessionActions.login({ 
      email: 'demo@user.io', 
      password: 'password' 
    })); 
  };

  return (

    <div className='login-modal'>
      <div onClick={() => setShowLoginModal(false)} className="close-button">
        <i className="fa-solid fa-x"></i>
      </div>

      <header className="login-header">
        <div className="login-header-text">Log in</div>
      </header> 

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="errors">{errors?.email}</div>
        <div className="email-div">
          <input className="email-login-input" type="text"
            value={email}
            onChange={update('email')}
            placeholder="Email"
          />
        </div>

        <div className="errors">{errors?.password}</div>
        <div className="password-div">
          <input className="password-login-input" type="password"
            value={password}
            onChange={update('password')}
            placeholder="Password"
          />
        </div>
        {/* <div className="agree-message">            
            By clicking <span className="continue-span"> Continue </span>
            
            I agree to Trip Club's  
            
            <span className="bold" target="_blank" rel="noopener noreferrer"><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">  Terms of Service</a></span>
          </div> */}
        <button type="submit" className="continue-button">Continue</button>

        {/* <input
          className="continue-button"
          type="submit"
          value="Log In"
          // disabled={!email || !password}
        /> */}

    </form>

        <div id="demo-button-div">
          <button className="demo_button" onClick={handleDemo}>Continue with Demo User</button>
        </div>


    </div>

    
  );
}

export default LoginFormModal;

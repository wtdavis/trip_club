import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';
import { signup, clearSessionErrors } from '../../store/session';

function SignupFormModal (props) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();
  const { setShowSignupModal } = props;


  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = field => {
    let setState;

    switch (field) {
      case 'email':
        setState = setEmail;
        break;
      case 'username':
        setState = setUsername;
        break;
      case 'password':
        setState = setPassword;
        break;
      case 'password2':
        setState = setPassword2;
        break;
      default:
        throw Error('Unknown field in Signup Form');
    }

    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      email,
      username,
      password
    };

    dispatch(signup(user)); 
  }

  return (
    <div className='login-modal'>

        <div onClick={() => setShowSignupModal(false)} className="close-button">
          <i className="fa-solid fa-x"></i>
        </div>

        <header className="login-header">
          <div className="login-header-text">Sign up</div>
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

        <div className="errors">{errors?.username}</div>
        <div className="username-div">
          <input className="username-login-input" type="text"
            value={username}
            onChange={update('username')}
            placeholder="Username"
          />
        </div>
        <div className="errors">{errors?.password}</div>
        <div>
          <input className="password-login-input" type="password"
            value={password}
            onChange={update('password')}
            placeholder="Password"
          />
        </div>
        <div className="errors">
          {password !== password2 && 'Confirm Password field must match'}
        </div>
        <div>
          <input  className="password-login-input" type="password"
            value={password2}
            onChange={update('password2')}
            placeholder="Confirm Password"
          />
        </div>
        <div className="agree-message">            
            By clicking <span className="continue-span"> Continue </span>
            
            I agree to Trip Club's  
            
            <span className="bold" target="_blank" rel="noopener noreferrer"><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">  Terms of Service</a></span>
            {/* ,<span className="bold" target="_blank" rel="noopener noreferrer"><a href="https://www.airbnb.com/help/article/2855"> Privacy Policy</a></span>, 
            <span className="bold" target="_blank" rel="noopener noreferrer"><a href="https://www.airbnb.com/help/article/2868"> Guest Refund Policy</a></span>, and
            <span className="bold" target="_blank" rel="noopener noreferrer"><a href="https://www.airbnb.com/help/article/2869"> Host Damage Protection Terms</a></span>. 
             */}
          </div>
        {/* <button
          type="submit"
          value="Sign Up"
          // disabled={!email || !username || !password || password !== password2}
        /> */}
        <button type="submit" className="continue-button">Continue</button>

      </form>
    </div>
  );
}

export default SignupFormModal;

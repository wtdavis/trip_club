import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from "../../store/session";
import './SessionForm.css';

// import { login, clearSessionErrors } from '../../store/session';

function LoginForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
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
    <>
      <form className="session-form" onSubmit={handleSubmit}>
      <h2>Log In Form</h2>
      <div className="errors">{errors?.email}</div>
      <label>
        <span>Email</span>
        <input type="text"
          value={email}
          onChange={update('email')}
          placeholder="Email"
        />
      </label>
      <div className="errors">{errors?.password}</div>
      <label>
        <span>Password</span>
        <input type="password"
          value={password}
          onChange={update('password')}
          placeholder="Password"
        />
      </label>
      <input
        type="submit"
        value="Log In"
        disabled={!email || !password}
      />


    </form>
      <div id="demo-button-div">
        <button className="demo-button" onClick={handleDemo}>Continue with Demo User</button>
      </div>

      {/* <div id="demo-button-div">
        <button className="demo-button" >Continue with Demo User</button>
      </div> */}

    </>
    
  );
}

export default LoginForm;

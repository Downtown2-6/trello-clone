import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../features/auth/authSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogin = async (evt) => {
    evt.preventDefault();
    await dispatch(authenticate({username, password, method: 'login'}));
    setUsername('');
    setPassword('');
  };

  return (
    <form id='login-form' className='form' onSubmit={handleLogin}>
      <label htmlFor='username'>Username:</label>
      <input
        name='username'
        value={username}
        onChange={(evt) => setUsername(evt.target.value)}
      />

      <label htmlFor='password'>Password:</label>
      <input
        type='password'
        name='password'
        value={password}
        onChange={(evt) => setPassword(evt.target.value)}
      />

      <button type='submit'>Log In</button>
      {error && <div> {error} </div>}
    </form>
  );
};

export default Login;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../features/auth/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogin = async (evt) => {
    evt.preventDefault();
    await dispatch(authenticate({email, password, method: 'login'}));
    setEmail('');
    setPassword('');
  };

  return (
    <form id='login-form' className='form' onSubmit={handleLogin}>
      <label htmlFor='email'>Email:</label>
      <input
        name='email'
        value={email}
        onChange={(evt) => setEmail(evt.target.value)}
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

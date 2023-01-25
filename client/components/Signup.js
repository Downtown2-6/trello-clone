import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../features/auth/authSlice';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleSignup = async (evt) => {
    evt.preventDefault();
    if (!email || !password) {
      alert('All fields must be completed to sign up.');
    } else {
      await dispatch(authenticate({email, password, method: 'signup'}));
      setEmail('');
      setPassword('');
    }
  };

  return (
    <form id='signup-form' className='form' onSubmit={handleSignup}>
      <label htmlFor='email'>email:</label>
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

      <button type='submit'>Sign Up</button>
      {error && <div> {error} </div>}
    </form>
  );
};

export default Signup;

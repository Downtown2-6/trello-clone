import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../auth';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleSignup = async (evt) => {
    evt.preventDefault();
    if (!username || !password) {
      alert('All fields must be completed to sign up.');
    } else {
      await dispatch(authenticate({username, password, method: 'signup'}));
      setUsername('');
      setPassword('');
    }
  };

  return (
    <form id='signup-form' className='form' onSubmit={handleSignup}>
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

      <button type='submit'>Sign Up</button>
      {error && <div> {error} </div>}
    </form>
  );
};

export default Signup;
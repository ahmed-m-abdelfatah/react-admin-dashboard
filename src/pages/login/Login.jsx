import './login.scss';

import { useState } from 'react';
import Joi from 'joi';
import { v4 as uuidV4 } from 'uuid';
import { loginInputs } from '../../formSource.js';

const Login = () => {
  console.log('~ Login');

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  function handelChange(e) {
    // console.log('~ e', e);
    setError(false);
    setErrorMsg('');
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log('~ user', user);
  }

  function validateForm(user) {
    let schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),

      password: Joi.string().required(),
    });

    return schema.validate(user, { abortEarly: true });
  }

  function handelSubmit(e) {
    e.preventDefault();
    let validationResult = validateForm(user);

    if (validationResult.error) {
      setError(true);
      setErrorMsg(validationResult.error.message);
      console.log('~ eeeeeeeeeeeeeeeeeeeeee');
    } else {
      // TODO firebase
      console.log('~ TODO firebase');
    }
  }

  return (
    <div className='login'>
      <form onSubmit={handelSubmit}>
        {/* NOT WORKING WITH ON CHANGE */}
        {loginInputs.map(({ type, placeholder, name }) => {
          return (
            <input
              key={uuidV4()}
              onChange={handelChange}
              type={type}
              placeholder={placeholder}
              name={name}
            />
          );
        })}

        {/*  WORKING WITH ON CHANGE */}
        <input
          onChange={handelChange}
          type='email'
          placeholder='Email'
          name='email'
        />
        <input
          onChange={handelChange}
          type='password'
          placeholder='Password'
          name='password'
        />

        <button type='submit'>Login</button>
        {error && <span>{errorMsg.replace(/"/g, '')}</span>}
      </form>
    </div>
  );
};

export default Login;

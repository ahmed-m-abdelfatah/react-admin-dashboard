import './login.scss';

import { useState } from 'react';
import Joi from 'joi';

const Login = () => {
  console.log('~ Login');

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  function handelChange(e) {
    setError(false);
    setErrorMsg('');
    return setUser({ ...user, [e.target.name]: e.target.value });
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
    } else {
      // TODO firebase
    }
    console.log('~ TODO firebase');
  }

  return (
    <div className='login'>
      <form onSubmit={handelSubmit}>
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

import './login.scss';

import { useState } from 'react';
import Joi from 'joi';
import { loginInputs } from '../../formSource.js';

const Login = () => {
  console.log('~ Login');

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  function clearErrors() {
    setError(false);
    setErrorMsg('');
  }

  function handelChange(e) {
    clearErrors();
    setUser({ ...user, [e.target.name]: e.target.value }); // setUser like an async
    // console.log('~ user', user); // log goes first sync
  }
  // console.log('~ user', user); // after handelChange

  function validateForm(user) {
    let schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: false })
        .required(),

      password: Joi.string().required(),
    });

    return schema.validate(user, { abortEarly: true });
  }

  function handelSubmit(e) {
    e.preventDefault();
    clearErrors();

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
        {loginInputs.map(({ type, placeholder, name }, index) => {
          return (
            <input
              // key={uuidV4()} wrong cuz in each render (setState) this key creates a new input with different key value
              key={index}
              onChange={handelChange}
              type={type}
              placeholder={placeholder}
              name={name}
            />
          );
        })}

        <button type='submit'>Login</button>
        {error && <span>{errorMsg.replace(/"/g, '')}</span>}
      </form>
    </div>
  );
};

export default Login;

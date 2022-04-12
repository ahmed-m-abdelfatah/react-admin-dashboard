import './login.scss';

import { useState } from 'react';
import Joi from 'joi';
import { loginInputs } from '../../formSource.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.js';
import { useNavigate } from 'react-router-dom';
import { homePath } from '../../pathsSource.js';

const Login = () => {
  console.log('~ Login');

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

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
    } else {
      firebaseLogin(user);
    }
  }

  function firebaseLogin({ email, password }) {
    // console.log('~ email', email);
    // console.log('~ password', password);

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        // console.log('~ user', user);
        navigate(homePath);
        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log('~ errorCode', errorCode);
        // console.log('~ errorMessage', errorMessage);
      });
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

import './new.scss';

import noImage from '../../assets/no_image.png';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { productInputs, userInputs } from '../../formSource.js';
import { usersPath, productsPath } from '../../pathsSource.js';

// firebase firestore
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase.js';
import { getDataObjectFromInputs } from '../../utilities.js';

// joi validation
import Joi from 'joi';

const New = () => {
  console.log('~ New');

  const locationUrl = useLocation().pathname;
  let pageDisplayData = { title: '', submit: '', inputsData: [] };
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [data, setData] = useState(() => {
    switch (true) {
      case locationUrl.startsWith(productsPath): {
        return getDataObjectFromInputs(productInputs);
      }

      case locationUrl.startsWith(usersPath): {
        return getDataObjectFromInputs(userInputs);
      }

      default:
        return null;
    }
  });

  // Add page data depending on url
  switch (true) {
    case locationUrl.startsWith(productsPath): {
      pageDisplayData = {
        ...pageDisplayData,
        title: 'Add New Product',
        submit: 'Add New Product',
        inputsData: productInputs,
      };
      break;
    }

    case locationUrl.startsWith(usersPath): {
      pageDisplayData = {
        ...pageDisplayData,
        title: 'Add New User',
        submit: 'Add New User',
        inputsData: userInputs,
      };
      break;
    }

    default: {
      break;
    }
  }

  function clearErrors() {
    setError(false);
    setErrorMsg('');
  }

  function handelChange(e) {
    clearErrors();
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function validateForm(data) {
    let schema;

    switch (true) {
      case locationUrl.startsWith(productsPath): {
        schema = Joi.object({
          title: Joi.string().min(3).required(),
          description: Joi.string().min(3).required(),
          category: Joi.string().min(3).required(),
          price: Joi.number().min(0).required(),
          stock: Joi.number().min(0).required(),
        });
        break;
      }

      case locationUrl.startsWith(usersPath): {
        schema = Joi.object({
          username: Joi.string().min(3).required(),
          firstName: Joi.string().min(3).required(),
          lastName: Joi.string().min(3).required(),
          email: Joi.string()
            .email({ minDomainSegments: 2, tlds: false })
            .required(),
          phone: Joi.string()
            .length(11)
            .pattern(/^01[0|1|2][0-9]{8}$/)
            .label('phone')
            .messages({
              'string.min': 'Must have at least 11 numbers',
              'object.regex': 'This is not a valid EGY number',
              'string.pattern.base': 'This is not a valid EGY number',
            }) // EGY phone pattern
            .required(),
          password: Joi.string().required(),
          address: Joi.string().min(3).required(),
          country: Joi.string().min(3).required(),
        });
        break;
      }

      default: {
        return; // type is undefined
      }
    }

    return schema.validate(data, { abortEarly: true });
  }

  function handelSubmit(e) {
    e.preventDefault();

    let validationResult = validateForm(data);
    console.log('~ validationResult', validationResult);
    if (validationResult.error) {
      setError(true);
      setErrorMsg(validationResult.error.message);
    } else {
      addDataToFireBase(data);
    }
  }

  function addDataToFireBase(data) {
    let dataBaseId;

    switch (true) {
      case locationUrl.startsWith(productsPath): {
        dataBaseId = 'products';
        break;
      }

      case locationUrl.startsWith(usersPath): {
        dataBaseId = 'users';
        break;
      }

      default: {
        return;
      }
    }

    addDoc(collection(db, dataBaseId), {
      ...data,
      timestamp: serverTimestamp(),
    })
      .then(res => console.log(res))
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(true);
        setErrorMsg(`errorCode : ${errorCode} errorMessage : ${errorMessage}`);
      });
  }

  return (
    <div className='new'>
      <div className='top'>
        <div className='content'>
          <h2>{pageDisplayData.title}</h2>
        </div>
      </div>
      <div className='bottom'>
        <div className='left'>
          <div className='content'>
            <img
              src={file ? URL.createObjectURL(file) : noImage}
              alt='nothing'
            />
          </div>
        </div>
        <div className='right'>
          <div className='content'>
            <form className='formControl' onSubmit={handelSubmit}>
              <label htmlFor='file'>
                <DriveFolderUploadOutlinedIcon />
              </label>
              <input
                type='file'
                id='file'
                accept='image/*'
                onChange={e => setFile(e.target.files[0])}
              />

              {pageDisplayData.inputsData.map(
                ({ placeholder, type, name }, index) => {
                  return (
                    <input
                      key={index}
                      type={type}
                      placeholder={placeholder}
                      name={name}
                      onChange={handelChange}
                    />
                  );
                },
              )}
              <button type='submit'>{pageDisplayData.submit}</button>
              {error && <span>{errorMsg.replace(/"/g, '')}</span>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;

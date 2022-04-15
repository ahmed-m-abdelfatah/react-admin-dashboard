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
import { camelize, getDataObjectFromInputs } from '../../utilities.js';

const New = () => {
  console.log('~ New');

  const locationUrl = useLocation().pathname;
  let pageDisplayData = { title: '', submit: '', inputsData: [] };
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

  console.log('~ data', data);

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

  // TODO joi check

  function clearErrors() {
    setError(false);
    setErrorMsg('');
  }

  function handelChange(e) {
    clearErrors();
    // setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handelSubmit(e) {
    e.preventDefault();

    // Add a new document in collection "cities"
    const res = await addDoc(collection(db, 'cities'), {
      name: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      timestamp: serverTimestamp(),
    });
    console.log('~ res', res);
  }

  const [file, setFile] = useState(null);
  // console.log('~ file', file);

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
                ({ placeholder, type }, index) => {
                  return (
                    <input key={index} type={type} placeholder={placeholder} />
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

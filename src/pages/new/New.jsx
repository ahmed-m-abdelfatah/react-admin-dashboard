import './new.scss';

import noImage from '../../assets/no_image.png';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { v4 as uuidV4 } from 'uuid';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { productInputs, userInputs } from '../../formSource.js';
import { usersPath, productsPath } from '../../pathsSource.js';

const New = () => {
  console.log('~ New');

  let locationUrl = useLocation().pathname;
  let pageData = { title: '', submit: '', inputsData: [] };

  switch (true) {
    case locationUrl.startsWith(productsPath):
      pageData = {
        ...pageData,
        title: 'Add New Product',
        submit: 'Add New Product',
        inputsData: productInputs,
      };
      break;
    case locationUrl.startsWith(usersPath):
      pageData = {
        ...pageData,
        title: 'Add New User',
        submit: 'Add New User',
        inputsData: userInputs,
      };
      break;

    default:
      break;
  }

  function handelSubmit(e) {
    e.preventDefault();
  }

  const [file, setFile] = useState(null);
  console.log('~ file', file);

  return (
    <div className='new'>
      <div className='top'>
        <div className='content'>
          <h2>{pageData.title}</h2>
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

              {pageData.inputsData.map(({ placeholder, type }) => {
                return (
                  <input key={uuidV4()} type={type} placeholder={placeholder} />
                );
              })}
              <button type='submit'>{pageData.submit}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;

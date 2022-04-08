import './notFound.scss';

import { Link } from 'react-router-dom';
import { homePath } from '../../pathsSource.js';
import { useEffect } from 'react';

const NotFound = ({ setNotFound }) => {
  console.log('~ NotFound');

  useEffect(() => {
    setNotFound(true);

    return () => {
      setNotFound(false);
    };
  });

  return (
    <div className='notFound'>
      <p>404 Not Found</p>
      <Link to={homePath}>Go to home</Link>
    </div>
  );
};

export default NotFound;

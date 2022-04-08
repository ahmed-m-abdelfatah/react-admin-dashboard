import React from 'react';
import { Link } from 'react-router-dom';
import { homePath } from '../../pathsSource.js';

const NotFound = () => {
  return (
    <div>
      404 Not Found
      <Link to={homePath}>Go to home</Link>
    </div>
  );
};

export default NotFound;

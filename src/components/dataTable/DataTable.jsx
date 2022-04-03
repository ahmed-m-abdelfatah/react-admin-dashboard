import './dataTable.scss';

import { DataGrid } from '@mui/x-data-grid';
import { userRows, userColumns } from '../../dataTableSource.js';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { newPath, productsPath, usersPath } from '../../pathsSource.js';

const DataTable = () => {
  console.log('~ DataTable');

  let isUser = useLocation().pathname;
  let pageData = { title: '', link: '', singleLink: '' };

  switch (isUser) {
    case productsPath:
      pageData = {
        ...pageData,
        title: 'Add New product',
        link: productsPath + '/',
        singleLink: productsPath + '/' + newPath,
      };
      break;
    case usersPath:
      pageData = {
        ...pageData,
        title: 'Add New User',
        link: usersPath + '/',
        singleLink: usersPath + '/' + newPath,
      };
      break;

    default:
      break;
  }

  const [data, setData] = useState(userRows);

  const handleDelete = id => {
    setData(data.filter(item => item.id !== id));
  };

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: params => {
        return (
          <div className='cellAction'>
            <Link
              to={pageData.link + params.row.id}
              style={{ textDecoration: 'none' }}>
              <div className='viewButton'>View</div>
            </Link>
            <div
              className='deleteButton'
              onClick={() => handleDelete(params.row.id)}>
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className='datatable'>
      <div className='datatableTitle'>
        {pageData.title}
        <Link to={pageData.singleLink} className='link'>
          Add New
        </Link>
      </div>

      <DataGrid
        className='datagrid'
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default DataTable;

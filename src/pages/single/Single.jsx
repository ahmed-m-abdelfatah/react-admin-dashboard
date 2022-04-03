import './single.scss';

import Chart from '../../components/chart/Chart.jsx';
import TableList from '../../components/table/Table.jsx';

const Single = () => {
  console.log('~ Single');

  return (
    <div className='single'>
      <div className='top'>
        <div className='left'>
          <div className='content'>
            <div className='editButton'>Edit</div>
            <h2 className='title'>Information</h2>
            <div className='item'>
              <img
                src='http://unsplash.it/200?gravity=center'
                alt='avatar'
                className='itemImage'
              />
              <div className='details'>
                <h1 className='itemTitle'>Jane Doe</h1>
                <div className='detailItem'>
                  <span className='itemKey'>Email:</span>
                  <span className='itemValue'>janedoe@gmail.com</span>
                </div>
                <div className='detailItem'>
                  <span className='itemKey'>Phone:</span>
                  <span className='itemValue'>+1 2345 67 89</span>
                </div>
                <div className='detailItem'>
                  <span className='itemKey'>Address:</span>
                  <span className='itemValue'>
                    Elton St. 234 Garden Yd. NewYork
                  </span>
                </div>
                <div className='detailItem'>
                  <span className='itemKey'>Country:</span>
                  <span className='itemValue'>USA</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Chart title='User Spending ( Last 6 Months)' type='monotone' />
      </div>

      <div className='bottom'>
        <div className='content'>
          <h2 className='title'>Last Transactions</h2>
          <TableList />
        </div>
      </div>
    </div>
  );
};

export default Single;

import './home.scss';

import Widget from '../../components/widget/Widget.jsx';
import Featured from '../../components/featured/Featured.jsx';
import Chart from '../../components/chart/Chart.jsx';
import Table from '../../components/table/Table.jsx';

const Home = () => {
  console.log('~ Home');

  return (
    <div className='home'>
      <div className='widgets'>
        <Widget type='user' />
        <Widget type='order' />
        <Widget type='earning' />
        <Widget type='balance' />
      </div>

      <div className='charts'>
        <Featured />
        <Chart title='Last 6 Months (Revenue)' />
      </div>

      <div className='listContainer'>
        <div className='listTitle'>Latest Transactions</div>
        <Table />
      </div>
    </div>
  );
};

export default Home;

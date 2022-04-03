import './chart.scss';

import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Chart = ({ title, type = 'linear' }) => {
  console.log('~ Chart');

  const data = [
    { name: '', Total: 0 },
    { name: 'January', Total: 1200 },
    { name: 'February', Total: 2100 },
    { name: 'March', Total: 800 },
    { name: 'April', Total: 1600 },
    { name: 'May', Total: 900 },
    { name: 'June', Total: 1700 },
  ];

  return (
    <div className='chart'>
      <div className='content'>
        <div className='title'>{title}</div>
        <div className='chartItem'>
          <ResponsiveContainer height='80%' minHeight={200}>
            <AreaChart data={data}>
              <XAxis dataKey='name' stroke='gray' />
              <Tooltip />
              <Area
                type={type}
                dataKey='Total'
                stroke='#8884d8'
                fill='#8884d8'
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Chart;

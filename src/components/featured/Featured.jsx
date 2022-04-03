import 'react-circular-progressbar/dist/styles.css';
import './featured.scss';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import { CircularProgressbar } from 'react-circular-progressbar';

const Featured = () => {
  console.log('~ Featured');

  const value = 0.66;

  return (
    <div className='featured'>
      <div className='content'>
        <div className='top'>
          <h2 className='title'>Total Revenue</h2>
          <MoreVertIcon fontSize='small' />
        </div>
        <div className='bottom'>
          <div className='featuredChart'>
            <CircularProgressbar
              value={value}
              maxValue={1}
              strokeWidth={3}
              text={`${value * 100}%`}
            />
          </div>

          <p className='title'>Total sales made today</p>
          <p className='amount'>$420</p>
          <p className='description'>
            Previous transactions processing. Last payments may not be included.
          </p>

          <div className='summary'>
            <div className='item'>
              <div className='itemTitle'>Target</div>
              <div className='itemResult negative'>
                <KeyboardArrowDownIcon fontSize='small' />
                <div className='resultAmount'>$12.4k</div>
              </div>
            </div>
            <div className='item'>
              <div className='itemTitle'>Last Week</div>
              <div className='itemResult positive'>
                <KeyboardArrowUpOutlinedIcon fontSize='small' />
                <div className='resultAmount'>$12.4k</div>
              </div>
            </div>
            <div className='item'>
              <div className='itemTitle'>Last Month</div>
              <div className='itemResult positive'>
                <KeyboardArrowUpOutlinedIcon fontSize='small' />
                <div className='resultAmount'>$12.4k</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;

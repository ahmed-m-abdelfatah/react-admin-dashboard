import './navbar.scss';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
// import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
// import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
// import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
// import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import Menu from '@mui/icons-material/Menu';
// import Avatar from '../../assets/avatar.svg';
import { toggleSidebar } from '../../App.js';
// import { Link } from 'react-router-dom';
// import { notificationsPath } from '../../pathsSource.js';
import {
  actionToggleCase,
  useDarkModeContext,
} from '../../context/darkModeContext.js';

const Navbar = () => {
  console.log('~ Navbar');

  const { dispatch } = useDarkModeContext();

  return (
    <div className='navbar'>
      <div className='wrapper'>
        <div className='sidebarIcon' onClick={() => toggleSidebar()}>
          <Menu className='icon' />
        </div>

        <div className='search'>
          <input type='text' placeholder='Search...' />
          <SearchOutlinedIcon />
        </div>

        <div className='items'>
          {/* <div className='item'>
            <LanguageOutlinedIcon className='icon' />
          </div> */}
          <div className='item' onClick={() => dispatch(actionToggleCase)}>
            <DarkModeOutlinedIcon className='icon' />
          </div>
          {/* <div className='item'>
            <FullscreenExitOutlinedIcon className='icon' />
          </div> */}
          {/* <div className='item'>
            <Link to={notificationsPath}>
              <NotificationsNoneOutlinedIcon className='icon' />
              <div className='counter'>1</div>
            </Link>
          </div>
          <div className='item'>
            <ChatBubbleOutlineOutlinedIcon className='icon' />
            <div className='counter'>2</div>
          </div>
          <div className='item'>
            <img src={Avatar} alt='avatar' className='avatar' />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

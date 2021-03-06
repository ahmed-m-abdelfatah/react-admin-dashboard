import './sidebar.scss';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import CreditCardIcon from '@mui/icons-material/CreditCard';
import StoreIcon from '@mui/icons-material/Store';
// import InsertChartIcon from '@mui/icons-material/InsertChart';
// import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
// import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
// import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
// import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import { useEffect } from 'react';
import { hideSidebarInMobile, toggleSidebar } from '../../App.js';
import { Link, NavLink } from 'react-router-dom';
import {
  // deliveryPath,
  homePath,
  // notificationsPath,
  // ordersPath,
  productsPath,
  // statsPath,
  // systemHealthPath,
  usersPath,
  // logsPath,
  // settingsPath,
  // profilePath,
  // logoutPath,
} from '../../pathsSource.js';
import {
  actionDarkCase,
  actionLightCase,
  useDarkModeContext,
} from '../../context/darkModeContext.js';
import { mobileScreen } from '../../utilities.js';

const Sidebar = ({ sidebarRef }) => {
  console.log('~ Sidebar');

  const { dispatch } = useDarkModeContext();

  // component did mount
  useEffect(() => {
    !mobileScreen() && toggleSidebar();
    // console.log('~ mobileScreen()', mobileScreen());
  }, []);

  return (
    <aside className='sidebar' ref={sidebarRef}>
      <div className='top'>
        <h1 className='logo'>
          <Link to={homePath}>logo</Link>
        </h1>
        <span className='close' onClick={() => toggleSidebar()}>
          close x
        </span>
      </div>

      <div className='center'>
        <ul>
          <p className='title'>MAIN</p>
          <li>
            <NavLink onClick={hideSidebarInMobile} end to={homePath}>
              <DashboardIcon className='icon' />
              <span>Dashboard</span>
            </NavLink>
          </li>

          <p className='title'>LISTS</p>
          <li>
            <NavLink onClick={hideSidebarInMobile} end to={usersPath}>
              <PersonOutlineIcon className='icon' />
              <span>Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink onClick={hideSidebarInMobile} end to={productsPath}>
              <StoreIcon className='icon' />
              <span>Products</span>
            </NavLink>
          </li>
          {/* <li>
            <NavLink onClick={hideSidebarInMobile} end to={ordersPath}>
              <CreditCardIcon className='icon' />
              <span>Orders</span>
            </NavLink>
          </li>
          <li>
            <NavLink onClick={hideSidebarInMobile} end to={deliveryPath}>
              <LocalShippingIcon className='icon' />
              <span>Delivery</span>
            </NavLink>
          </li> */}

          {/* <p className='title'>USEFUL</p>
          <li>
            <NavLink onClick={hideSidebarInMobile} end to={statsPath}>
              <InsertChartIcon className='icon' />
              <span>Stats</span>
            </NavLink>
          </li>
          <li>
            <NavLink onClick={hideSidebarInMobile} end to={notificationsPath}>
              <NotificationsNoneIcon className='icon' />
              <span>Notifications</span>
            </NavLink>
          </li> */}

          {/* <p className='title'>SERVICE</p>
          <li>
            <NavLink onClick={hideSidebarInMobile} end to={systemHealthPath}>
              <SettingsSystemDaydreamOutlinedIcon className='icon' />
              <span>System Health</span>
            </NavLink>
          </li>
          <li>
            <NavLink onClick={hideSidebarInMobile} end to={logsPath}>
              <PsychologyOutlinedIcon className='icon' />
              <span>Logs</span>
            </NavLink>
          </li>
          <li>
            <NavLink onClick={hideSidebarInMobile} end to={settingsPath}>
              <SettingsApplicationsIcon className='icon' />
              <span>Settings</span>
            </NavLink>
          </li> */}

          {/* <p className='title'>USER</p>
          <li>
            <NavLink onClick={hideSidebarInMobile} end to={profilePath}>
              <AccountCircleOutlinedIcon className='icon' />
              <span>Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink onClick={hideSidebarInMobile} end to={logoutPath}>
              <ExitToAppIcon className='icon' />
              <span>Logout</span>
            </NavLink>
          </li> */}
        </ul>
      </div>

      <div className='bottom'>
        <p className='title'>THEME</p>
        <div
          className='colorOption'
          onClick={() => dispatch(actionLightCase)}></div>
        <div
          className='colorOption'
          onClick={() => dispatch(actionDarkCase)}></div>
      </div>
    </aside>
  );
};

export default Sidebar;

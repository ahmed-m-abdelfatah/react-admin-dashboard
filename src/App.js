import './styles/app.scss';
import './styles/dark.scss';

import Home from './pages/home/Home.jsx';
import Login from './pages/login/Login.jsx';
import List from './pages/list/List.jsx';
import Single from './pages/single/Single.jsx';
import New from './pages/new/New.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';
import Navbar from './components/navbar/Navbar.jsx';

import { Routes, Route } from 'react-router-dom';
import { useRef } from 'react';
import {
  homePath,
  loginPath,
  newPath,
  productIdPath,
  productsPath,
  userIdPath,
  usersPath,
} from './pathsSource.js';
import { useDarkModeContext } from './context/darkModeContext.js';

let sidebarRef;

export default function App() {
  console.log('~ App');
  sidebarRef = useRef('sidebar');

  const { state: darkMode } = useDarkModeContext();

  return (
    <>
      <div className={darkMode ? 'app dark' : 'app'}>
        <Sidebar sidebarRef={sidebarRef} />
        <section className='container'>
          <Navbar />

          <Routes>
            <Route path={homePath}>
              <Route index element={<Home />} />
              <Route path={loginPath} element={<Login />} />

              <Route path={usersPath}>
                <Route index element={<List />} />
                <Route path={userIdPath} element={<Single />} />
                <Route path={newPath} element={<New />} />
              </Route>

              <Route path={productsPath}>
                <Route index element={<List />} />
                <Route path={productIdPath} element={<Single />} />
                <Route path={newPath} element={<New />} />
              </Route>
            </Route>
          </Routes>
        </section>
      </div>
    </>
  );
}

export const toggleSidebar = () => {
  sidebarRef.current.classList.toggle('active');
};

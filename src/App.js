import './styles/app.scss';
import './styles/dark.scss';

import Home from './pages/home/Home.jsx';
import Login from './pages/login/Login.jsx';
import List from './pages/list/List.jsx';
import Single from './pages/single/Single.jsx';
import New from './pages/new/New.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';
import Navbar from './components/navbar/Navbar.jsx';

import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useRef, useState } from 'react';
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
import { mobileScreen } from './utilities.js';
import NotFound from './pages/notFound/NotFound.jsx';

let sidebarRef;

export default function App() {
  console.log('~ App');

  sidebarRef = useRef('sidebar');
  const { pathname } = useLocation();
  const { state: darkMode } = useDarkModeContext();

  const [notFound, setNotFound] = useState(false);

  function showSidebarAndNavbar() {
    if (pathname === loginPath || notFound === true) {
      return false;
    }

    return true;
  }

  // Start path protection
  const user = false;

  const RequireAuth = ({ children }) => {
    if (user) {
      return children;
    } else {
      return <Navigate to={loginPath} />;
    }
  };

  return (
    <>
      <div className={darkMode ? 'app dark' : 'app'}>
        {showSidebarAndNavbar() && <Sidebar sidebarRef={sidebarRef} />}
        <section className='container'>
          {showSidebarAndNavbar() && <Navbar />}

          <Routes>
            <Route path={homePath}>
              <Route
                index
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              />
              <Route path={loginPath} element={<Login />} />

              <Route path={usersPath}>
                <Route
                  index
                  element={
                    <RequireAuth>
                      <List />
                    </RequireAuth>
                  }
                />
                <Route
                  path={userIdPath}
                  element={
                    <RequireAuth>
                      <Single />
                    </RequireAuth>
                  }
                />
                <Route
                  path={newPath}
                  element={
                    <RequireAuth>
                      <New />
                    </RequireAuth>
                  }
                />
              </Route>

              <Route path={productsPath}>
                <Route
                  index
                  element={
                    <RequireAuth>
                      <List />
                    </RequireAuth>
                  }
                />
                <Route
                  path={productIdPath}
                  element={
                    <RequireAuth>
                      <Single />
                    </RequireAuth>
                  }
                />
                <Route
                  path={newPath}
                  element={
                    <RequireAuth>
                      <New />
                    </RequireAuth>
                  }
                />
              </Route>

              <Route
                path='*'
                element={<NotFound setNotFound={setNotFound} />}
              />
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

export const hideSidebarInMobile = () => {
  mobileScreen() && setTimeout(toggleSidebar, 0);
  console.log('~ mobileScreen()', mobileScreen());
};

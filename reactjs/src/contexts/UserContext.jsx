import { PropTypes } from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      if (searchParams.has('id') && !localStorage.getItem('tokenID')) {
        localStorage.setItem('tokenID', JSON.stringify(searchParams.get('id')));
        searchParams.delete('id');
        setSearchParams(searchParams);
      }
    }

    if (localStorage.getItem('tokenID')) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  }, [location.pathname, searchParams, setSearchParams]);

  return (
    <UserContext.Provider value={{ userLoggedIn, setUserLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

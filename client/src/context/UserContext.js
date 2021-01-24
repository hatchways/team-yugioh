import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [url, setUrl] = useState('');

  const value = {
    updateUrl: setUrl,
    url: url
  }

  return (
    <UserContext.Provider value={value}>
        {props.children}
    </UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.func,
};

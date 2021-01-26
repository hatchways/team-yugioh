import React, { useState, useContext, createContext, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

const UserContext = createContext()

// custom hook
export function useUserContext() {
  return useContext(UserContext)
}

export function UserContextProvider({children}) {
  const [userData, setUserData] = useState([])

  useEffect(() => {
    axios
      .get("/api/user/data")
      .then((res) => {
        console.log(res.data)
        setUserData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  
  return (
    <UserContext.Provider value={}>
      {children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
  children : PropTypes.func,
}

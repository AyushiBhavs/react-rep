import React, { useState } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import DashBoard from './pages/DashBoard';


const dashContext = React.createContext()

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <dashContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        {isLoggedIn ? <DashBoard /> : <Login />}
      </dashContext.Provider>

    </>
  )
}

export default App;
export { dashContext }
import React, { useState,useEffect } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import DashBoard from './pages/DashBoard';


const dashContext = React.createContext()

function App() {
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 

  const logoutFunction =()=>{ 
      localStorage.removeItem("islogged")
      setIsLoggedIn(false)
  }

  useEffect(() => {
   let token = localStorage.getItem("islogged")
   console.log(token)
   setIsLoggedIn(token)
  });



  return (
    <>
      <dashContext.Provider value={{isLoggedIn,setIsLoggedIn,logoutFunction}}>        
       {isLoggedIn?<DashBoard/>:<Login/>}
      </dashContext.Provider>

    </>
  )
}

export default App;
export { dashContext }
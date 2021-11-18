import React,{useContext} from 'react'
import { dashContext } from '../App'
import { Button } from 'react-bootstrap'

export default function DashBoard() {
   const LoginCtx = useContext(dashContext)
   
  return (
    <>
    <div className="text-end m-5">
      <Button variant="secondary mt-3" onClick={()=>LoginCtx.logoutFunction()}>
        Logout
      </Button>
      </div>
      <h1 className="text-center mt-5">Dashboard Join Eight</h1>
      
    </>

  )
}

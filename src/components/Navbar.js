import React from 'react'

export default function Navbar() {
  return (
    <>
       <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">About</Link>
          </li>
        </ul>
    </>
  )
}

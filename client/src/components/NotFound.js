import React from 'react'
import { NavLink } from 'react-router-dom';
import './generalStyle.scss'

function NotFound() {
  return (
    <div className='errorpage'>
        <h1>Hi I'm error page</h1>
        <h2>Click on Homepage to navigate back</h2>
        <br></br>
        <NavLink to='/'>
            Back to HomePage
        </NavLink>
    </div>
  )
}

export default NotFound;
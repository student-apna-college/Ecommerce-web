import React from 'react'
import { Link } from 'react-router-dom'

 function Footer() {
  return (
    <div className='footer'>
    <h2 className='text-center'>All Right Reserved &copy; Dev Developent</h2>
    <p className='text-center mt-3'>
      <Link to="/about">About</Link>
      <Link to="/policy">Policy</Link>
      <Link to="/contact">Contact</Link>
      

    </p>
    </div>
  )
}
export default Footer
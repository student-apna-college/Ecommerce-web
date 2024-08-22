import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'

 function PagenotFound() {
  return (
    <>
    <Layout title={'privacy Policy'} description={'hello'}>
    <div className='pnf'>
      <h2 className='pnf-title'>404</h2>
      <h3 className='pnf-heading'>Oops ! Page not found</h3>
      <Link className='pnf-btn' to="/">Go back</Link>
          </div>
    </Layout>
    </>
  )
}
export default PagenotFound
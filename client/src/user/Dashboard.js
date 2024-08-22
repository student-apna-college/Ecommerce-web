import React from 'react'
import Layout from '../components/Layout/Layout'
import UserMenu from '../components/Layout/UserMenu'
import { useAuth } from '../context/auth'

 function Dashboard() {
  const [auth]= useAuth("")
  return (
    <Layout title={'Dashboard'}>
    <div className='container-fluid m-3 p-3' >
      <div className='row'>
        <div className='col-md-3'>
          <UserMenu></UserMenu>
        </div>
        <div className='col-md-9'>
        <div className='card w-75 p-2'>
            <h4>User Name :{auth?.user?.name}</h4>
            <h4>User Email :{auth?.user?.email}</h4>
            <h4>User Phone :{auth?.user?.phone}</h4>
            <h4>User Address :{auth?.user?.address}</h4>
            </div>
        </div>
      </div>
    </div>
    </Layout> 
  )
}
export default Dashboard
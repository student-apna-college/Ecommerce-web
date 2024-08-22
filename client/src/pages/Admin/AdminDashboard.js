import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import {useAuth} from "../../context/auth";
 function AdminDashboard() {
  const [auth] = useAuth();
  console.log(auth?.user);
  return (
    <Layout title={"Dashboard - Admin"}>
    <div className='container-fluid m-3 p-3'>
      <div className='row'>
        <div className='col-md-4'>
          <AdminMenu></AdminMenu>
        </div>
        <div className='col-md-4'>
          <div className='card w-100 p-2'>
          <h4>Admin Name  :{auth?.user?.name}</h4>
          <h4>Admin Email :{auth?.user?.email}</h4>
          <h4>Admin Phone :{auth?.user?.phone}</h4>
          </div>
        </div>        
      </div>

    </div>
    </Layout>
  )
}
export default AdminDashboard
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import axios from 'axios'
import { useAuth } from '../../context/auth'
import moment from "moment"

 function Orders() {
    const [orders, setOrders] = useState([])
    const [auth, setAuth]= useAuth()

    const getOrders= async() =>{
        try{
                const {data} = await axios.get('/api/v1/auth/all-orders')
                setOrders(data)
        }catch(error){
            console.log(error)
        }
    };

    useEffect(()=> {
        if(auth?.token) getOrders();
    }, [auth?.token]);
  return (
        <Layout title={"user-orders"}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu></UserMenu>
                    </div>
                    <div className='col-md-9'>
                        <h1>All Orders</h1>  
                        
                        {orders?.map((o,i) => {
                            return(
                    
                              <div className='border shadow'>
                                <table className="table">
                                    <thead>
                                        <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">status</th>
                                        <th scope="col">Buyer</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Payment</th>
                                        <th scope="col">Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td>{i + 1}</td>
                                        <td>{o?.status?.name}</td>
                                        <td>{o?.buyer?.name}</td>
                                        <td>{moment(o?.createAt).fromNow()}</td>
                                        <td>{o?.payment.success ? "Success": "Failed"}</td>
                                        <td>{o?.products?.length}</td>
                                        </tr>
                                        
                                    </tbody>
                                    </table>
                                    <div className='container'>
                                    {
                                        o?.products?.map((pr,i) => (
                                         <div className='row m-2 card flex-row'>
                                        <div className='col-md-4'>
                                        <img src={`/api/v1/product/product-photo/${pr._id}`} className="card-img-top" alt={pr.name}  />
                                        </div>
                                    <div className='col-md-8'>
                                        <p>{pr.name}</p>
                                        <p>{pr.description.substring(0,30)}</p>
                                        <p>Price:${pr.price}</p>                                        
                                    </div>
                                </div>
                            ))
                        }
                                    </div>
                                 </div>                                    
                             )
                            })
                        }
                                           
                    </div>
                </div>
            </div>
        </Layout>
  )
}
export default Orders
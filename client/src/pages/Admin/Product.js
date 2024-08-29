import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from './../../components/Layout/Layout.js'
import axios from 'axios'
import toast from 'react-hot-toast'
import {Link} from 'react-router-dom'

export const Product = () => {
  const [product, setProduct] = useState([])
// getall product
const getAllProdu = async () =>{
  try{
        const {data} = await axios.get("https://ecommerce-web-86gg.onrender.com/api/v1/product/get-product");
        setProduct(data.products);
  }catch(error){
    console.log(error)
    toast.error('something went wrong')
  }
}
// lifecycle method
useEffect(()=>{
  getAllProdu();
},[]);

  return (
    <Layout>
        <div className='container-fluid m-3 p-3'>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu></AdminMenu>
            </div>
            <div className='col-md-9' >
                <h1 className='text-center'>All Product List</h1>
                <div className='d-flex flex-wrap '>
                {product?.map((pr) =>(
                    <Link  key={pr._id} to={`/dashboard/admin/product/${pr.slug}`} className='product-link'>
                    <div className="card m-2" style={{width: '18rem'}} >
                  <img src={`/api/v1/product/product-photo/${pr._id}`} className="card-img-top" alt={pr.name} />
                  <div className="card-body">
                  <h5 className="card-title">{pr.name}</h5>
                  <h5 className="card-title">$ {pr.price}</h5>
                  <p className="card-text">{pr.description}</p>
                   
  </div>
</div>
                    </Link>                
                ))}
            </div>
        </div>
        </div>
        </div>
    </Layout>
  )
}

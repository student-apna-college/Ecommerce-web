import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function ProductDetails() {
    const params = useParams()
    const [product , setProduct] = useState({})
    
    useEffect(()=>{
        if(params?.slug) getProuduct();
    },[params?.slug]) 

    // get product
    const getProuduct = async() => {
        try{
            const {data} = await axios.get(`https://ecommerce-web-86gg.onrender.com/api/v1/product/get-product/${params.slug}`)
            console.log(data);
            setProduct(data?.product)
        }catch(error){

        }
    }

  return (
    <Layout>
        
        <div className='row container mt-4'>
            <div className='col-md-6'>
            <img src={`https://ecommerce-web-86gg.onrender.com/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.name} />
            </div>
            <div className='col-md-6 '>
                <h1 className='text-center'>Product Details</h1>
                <h6>Name : {product.name}</h6>
                <h6>Description : {product.description}</h6>
                <h6>Price : $ {product.price}</h6>
                <h6>Catogoey :{product?.category?.name}</h6>
                <button className='btn btn-secondary ms-1'>ADD TO CART</button>     
                </div>
        </div>
        
    </Layout>
  )
}

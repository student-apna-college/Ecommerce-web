import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


 function CategoryList() {
    const navigate = useNavigate()
    const params = useParams()
    const [products ,setProducts]= useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() =>{
        if(params?.slug) getProductByCat()
    },[params?.slug])
    const getProductByCat = async () => {
        try{
                const {data} = await axios.get(`https://ecommerce-web-86gg.onrender.com/api/v1/product/product-category/${params.slug}`)
                setProducts(data?.products)
                setCategory(data?.category)
        }catch(error){
            console.log(error)
        }
    }
  return (
    <Layout>
        <div className='container mt-3'>
            <h1 style={{color:"green", fontFamily:"serif"}}>Welcome on your Selected choice</h1>
        <h1 className='text-center'>Category-{category?.name}</h1>
        <h6 className='text-center'>{products?.length}Founded Resut</h6>
        <div className="row">
        <div className='d-flex flex-wrap'>
          {products?.map((pr) =>(
                    
                    <div className="card m-2 " style={{width: '18rem'}} >
                  <img src={`https://ecommerce-web-86gg.onrender.com/api/v1/product/product-photo/${pr._id}`} className="card-img-top" alt={pr.name} />
                  <div className="card-body">
                  <h5 className="card-title">{pr.name}</h5>
                  <h5 className="card-title">${pr.price}</h5>
                  <p className="card-text">{pr.description.substring(0,30)}</p>
                  <button class="btn btn-primary ms-1" onClick={()=> navigate(`/product/${pr.slug}`)}>Go somewhere</button>
                  <button class="btn btn-secondary ms-1">Add to Cart</button>
               </div>
            </div>
        
                ))}
        </div>
        </div>
        </div>
    </Layout>
  )
}
export default CategoryList
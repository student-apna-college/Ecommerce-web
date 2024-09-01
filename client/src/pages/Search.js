
import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search'

 function Search() {
    const [value, setValue] = useSearch()
  return (
        <Layout title={'Search results'}>
            <div className='Container'>
                <div className='text-center'>
                    <h1>Search Results</h1>
                    <h6>
                        {value?.result.length < 1 ? "No Product Found" : `Found Result ${value?.result.length}`}
                    </h6>
                    <div className='d-flex flex-wrap'>
          {value?.result.map((pr) =>(
                    
                    <div className="card m-2 " style={{width: '18rem'}} >
                  <img src={`https://ecommerce-web-86gg.onrender.com/api/v1/product/product-photo/${pr._id}`} className="card-img-top" alt={pr.name} />
                  <div className="card-body">
                  <h5 className="card-title">{pr.name}</h5>
                  <h5 className="card-title">${pr.price}</h5>
                  <p className="card-text">{pr.description.substring(0,30)}</p>
                  <button class="btn btn-primary ms-1">Go somewhere</button>
                  <button class="btn btn-secondary ms-1">Add to Cart</button>
               </div>
            </div>
        
                ))}
        </div>
        <div></div>
                </div>
            </div>

        </Layout>
  )
}

export default Search
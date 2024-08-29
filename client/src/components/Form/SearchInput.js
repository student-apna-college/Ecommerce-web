import React from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/search';

 function SearchInput() {
    const [value, setValue] = useSearch()
    const navigate = useNavigate()

    const handleOnSubmit = async (e)=>{
        e.preventDefault()
        try{
            const {data} = await axios.get(`https://ecommerce-web-86gg.onrender.com/api/v1/product/search/${value.keyword}`)
            setValue({...value, result:data});
            navigate('/search');
        }catch(error){
            console.log(error)

        }
    }
  return (
    <div>
        <form className="d-flex" role="search" onSubmit={handleOnSubmit}>
  <input className="form-control me-2" 
  type="search" 
  placeholder="Search" 
  aria-label="Search" 
  value={value.keyword} 
  onChange={(e)=>setValue({...value,keyword: e.target.value})} />
  <button className="btn btn-outline-success" type="submit">Search</button>
</form>

    </div>
  )
}
export default SearchInput
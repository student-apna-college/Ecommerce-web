
import { useEffect, useState } from 'react'
import axios from 'axios'


export default function useCategory() {
    const [categoies, setCategories] = useState([])
        // get cat
        const getCategories = async () =>{
          try{
                const {data} = await axios.get('https://ecommerce-web-86gg.onrender.com/api/v1/category/get-category')
                setCategories(data?.category)
          }catch(error){
            console.log(error)
          }
        }

        useEffect(()=>{
          getCategories();
        },[]);
    
  return categoies;
}

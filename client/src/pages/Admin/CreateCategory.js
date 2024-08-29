import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm'
import {Modal} from 'antd'

 function CreateCategory() {
    //niche wale state humne sare catrogey ko fetch karne ke liye bnaya hai backend say 
    const [categories, setCategories] = useState([])
    // niche wale state humne jo bhi nam hum input box mai type karnege uske liye banaye hai taki data ko fornted say backend mai send kar sake
    const [name, setName]= useState("")
    // niche wale state humne model ant design ke liye banaya hai
    const [visible, setVisible] = useState(false)

    const [selected, setSelected] = useState(null)

    // update category ke liye state banai hai
    const [updatedName,setUpdateName] = useState("")

    //handle form code
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const {data} = await axios.post("https://ecommerce-web-86gg.onrender.com/api/v1/category/create-category", {name})
            if(data?.success){
                toast.success(`${name} is created`)
                getAllCategory();
            }else{
                toast.error(data?.message);
            }
        }catch(error){
        console.log(error)
        toast.error('something went wrong in input form')
    }
    }

    //get all category
    const getAllCategory = async () => {
        try{
                const {data} = await axios.get('https://ecommerce-web-86gg.onrender.com/api/v1/category/get-category')
                if(data?.success){
                    setCategories(data?.category);
                }
        }catch(error){
            console.log(error)
            toast.error('Something went wrong in getting catgory')
        }
    };

    useEffect(() => {
        getAllCategory();
    },[]);

//update category edit par click karne par serch bar mai nam ayga jo selected kiya ho

const handleupdate = async(e) => {
    e.preventDefault()
    try{
        const {data} = await axios.put(`https://ecommerce-web-86gg.onrender.com/api/v1/category/update-category/${selected._id}`, {name:updatedName})
        if(data.message){
            toast.success(data.message)
            setSelected(null);
            setUpdateName("");
            setVisible(false);
            getAllCategory();
        }else{
            toast.error(data.message)
        }
    }
    catch(error){
    toast.error('Something went wrong in update category')
}
}

// delete category 
const handleDelete = async(id) => {
    try{
        const {data} = await axios.delete(`https://ecommerce-web-86gg.onrender.com/api/v1/category/delete-category/${id}`,)
        if(data.message){
            toast.success(data.message)
            getAllCategory();
        }else{
            toast.error(data.message)
        }
    }
    catch(error){
    toast.error('Something went wrong in update category')
}
}


  return (
    <div>
        <Layout title={"Dashboard - create category"}>
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3 '>
                <AdminMenu></AdminMenu> 
                </div>              
                <div  style={{width:"1000px", border:"1px solid black"}}className='col-md-9'>
                    <h1>Manage Category</h1>       
                    <div>
                <div className='p-3 w-50'>
                    <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}></CategoryForm>
                </div>
        <table className="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Action</th>
      
          </tr>
  </thead>
  <tbody> 
        {categories.map(c =>(
            <>
            <tr>
            <td key={c._id}>{c.name}</td>
            <td>
                <button className='btn btn-primary ms-2' onClick={()=> {setVisible(true); setUpdateName(c.name);setSelected(c)}}>Edit</button>
                <button className='btn btn-danger ms-2' onClick={()=> {handleDelete(c._id)}}>Delete</button>
            </td>
            </tr>
            </>
        ))}
        
    </tbody>
</table>

                    </div>
                    <Modal onCancel={()=> setVisible(false)} footer={null} visible={visible}>
                        <CategoryForm  value={updatedName} setValue={setUpdateName} handleSubmit={handleupdate}></CategoryForm>
                    </Modal>
                </div>
            </div>
        </div>
    </Layout>
    </div>
  )
}
export default CreateCategory
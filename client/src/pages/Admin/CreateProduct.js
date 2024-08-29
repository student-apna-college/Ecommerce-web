import React, { useState , useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import {Select} from 'antd'
import { useNavigate } from 'react-router-dom'
const {Option} = Select



 function CreateProduct() {

    const navigate = useNavigate()

    const [categories, setCategories] = useState([])
    const [photo, setPhoto] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [quantity, setQuantity] = useState("")
    const [shipping, setShipping] = useState("")


    // get all category

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



// CREATE PRODUCT FUNCTION

const handleCreate = async (e) =>{
    e.preventDefault()
    try{
        const productData = new FormData()
        productData.append("name",name)
        productData.append("description",description)
        productData.append("price",price)
        productData.append("quantity",quantity)
        productData.append("photo",photo)
        productData.append("category",category)

            const {data} = axios.post("https://ecommerce-web-86gg.onrender.com/api/v1/product/create-product",productData)
            if(data?.success){
                toast.error(data?.message)
            }else{
                toast.success("product created succesfully")
                navigate('/dashboard/admin/products')
            }
    }catch(error){
       console.log(error)
       toast.error('something went wrong')
    }
}


  return (
    <div>
        <Layout title={"Dashboard - CreateProduct"}>
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                <AdminMenu></AdminMenu> 
                </div>              
                <div className='col-md-9'>
                    <h1>CreateProduct</h1>
                    <div className='m-1 w-75'>
                        <Select bordered={false}
                         placeholder="select a category" 
                         size='large' 
                         showSearch className='form-select mb-3' 
                         onChange={(value) => {setCategory(value)}}>

                         
                            {categories?.map(c => (
                                <Option key={c._id} value={c._id}>{c.name}</Option>
                            ))} 
                        </Select>
                            <div className='mb-3'>
                                <label  className='btn btn-outline-secondary'>
                                    {photo ? photo.name: "upload photo"}
                                <input type="file" name="photo" accept='image/*' onChange={(e)=> 
                                    setPhoto(e.target.files[0])
                                } hidden/>
                                </label>
                            </div>
                            <div className='mb-3'>
                                {photo &&(
                                    <div className='text-center'>
                                        <imgage src={URL.createObjectURL(photo)} alt="Product photo" height={"200px"} className='img img-responsive'></imgage>

                                    </div>
                                )}
                            </div>
                            <div className='mb-3'>
                                <input type="text" value={name} placeholder='write a name'className='form-control' onChange={(e) => setName(e.target.value)}></input>
                            </div>


                            <div className='mb-3 '>
                                <input style={{height:"150px" ,paddingBottom:"80px"}}type="text" value={description} placeholder='write a description'className='form-control' onChange={(e) => setDescription(e.target.value)}></input>
                            </div>

                            <div className='mb-3'>
                                <input type="number" value={price} placeholder='write a Price'className='form-control' onChange={(e) => setPrice(e.target.value)}></input>
                            </div>

                            <div className='mb-3'>
                                <input type="number" value={quantity} placeholder='write a quantity'className='form-control' onChange={(e) => setQuantity(e.target.value)}></input>
                            </div>

                            <div className='mb-3'>
                                <Select bordered={false} placeholder="Select Shipping" size='large' showSearch className='form-select mb-3' onChange={(value) => setShipping(value)}>
                               <Option value="0">NO</Option>
                               <Option value="1">yes</Option>
                                </Select>
                            </div>

                            <div  className='mb-3'>
                                    <button className="btn btn-primary" onClick={handleCreate}>CREATE PRODUCT</button>

                            </div>






                    </div>
                </div>
            </div>
        </div>
    </Layout>
    </div>
  )
}
export default CreateProduct
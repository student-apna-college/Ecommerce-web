import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {

    const[name, setName] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[phone, setPhone] = useState("")
    const[address, setAddress] = useState("")
    const[question, setQuestion] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async(e) =>{
      e.preventDefault();
      //NICHE WALA CODE CLIENT SAY SERVER PAR BHEJNE KE LIYE HAI USER RAGISTER KARNE KE LIYE LINE NO 19 SAY 26 TAK
      try{
          const res= await axios.post('/api/v1/auth/ragister',{name,email,password,phone,address,question});
          if(res.data.success){
            toast.success(res.data.message)
            navigate('/login');
          }else{
            toast.error(res.data.message)
          }
      }catch (error) {
        console.log(error)
        toast.error("something went wrong")
      }
      
      
    }
  return (
    <Layout title={"ecommerce app"}>
        <div className='register'>
          <div className="reg2">       
          <form onSubmit={handleSubmit}>
        <h1>REGISTER</h1>
  <div className="mb-0">
    <label htmlFor="exampleInputEmail1" className="form-label"></label>
    <input type="text" className="form-control" id="exampleInputEmail1" placeholder='Enter your Name' value={name}  onChange={(e) => setName(e.target.value)} required/>
    </div>

    <div className="mb-0">
    <label htmlFor="exampleInputEmail1" className="form-label"></label>
    <input type="email" className="form-control" id="exampleInputEmail1" placeholder='Enter your Email'  value={email} onChange={(e) => setEmail(e.target.value)} required/>
    </div>


    <div className="mb-0">
    <label htmlFor="exampleInputEmail1" className="form-label"></label>
    <input type="password" className="form-control" id="exampleInputEmail1" placeholder='Enter your Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
    </div>

    <div className="mb-0">
    <label htmlFor="exampleInputEmail1" className="form-label"></label>
    <input type="number" className="form-control" id="exampleInputEmail1" placeholder='Enter your Phone'  value={phone}  onChange={(e) => setPhone(e.target.value)} required />
    </div>

    <div className="mb-0">
    <label htmlFor="exampleInputEmail1" className="form-label"></label>
    <input type="text" className="form-control" id="exampleInputEmail1" placeholder='Enter your Address'  value={address} onChange={(e) => setAddress(e.target.value)} required/>
    </div>

    <div className="mb-0">
    <label htmlFor="exampleInputEmail1" className="form-label"></label>
    <input type="text" className="form-control" id="exampleInputText" placeholder='Your Best Friend Name'  value={question} onChange={(e) => setQuestion(e.target.value)} required/>
    </div>
<br></br>

  <button type="submit" className="btn btn-primary" >Submit</button>
</form>


        </div>
  </div>
 

    </Layout>
  )
}
export default Register
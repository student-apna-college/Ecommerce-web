import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth'

 function Login() {
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("") 
    const[auth, setAuth] = useAuth()  
    const navigate = useNavigate()

    const handleSubmit = async(e) =>{
      e.preventDefault();
      //NICHE WALA CODE CLIENT SAY SERVER PAR BHEJNE KE LIYE HAI USER RAGISTER KARNE KE LIYE LINE NO 19 SAY 26 TAK
      try{
          const res= await axios.post('/api/v1/auth/login',{email,password});
          if(res.data.success){
            toast.success(res.data.message)
            setAuth({
              ...auth,
              user:res.data.user,
              token:res.data.token,
            });
            localStorage.setItem('auth', JSON.stringify(res.data));
            navigate('/');
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
        <h1>LOGIN</h1>
  
  
    <div className="mb-1">
    <label htmlFor="exampleInputEmail1" className="form-label"></label>
    <input type="email" className="form-control" 
     placeholder='Enter your Email'  value={email} onChange={(e) => setEmail(e.target.value)} required/>
    </div>


    <div className="mb-1">
    <label htmlFor="exampleInputEmail1" className="form-label"></label>
    <input type="password" className="form-control" 
     placeholder='Enter your Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
    </div>    
<br></br>
    <button type="submit" className="btn btn-primary" >Login</button>
    
    <div className="mb-3">
    <br></br>
  <button type="submit" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}} >Foget Password</button>
  </div>


</form>


        </div>
  </div>
 

    </Layout>
  )
}
export default Login
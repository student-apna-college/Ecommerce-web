
import Layout from '../../components/Layout/Layout'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


 function ForgotPassword() {

    const[email, setEmail] = useState("")
    const[newPassword, setNewPassword] = useState("") 
    const[question, setNewQuestion] = useState("") 
    const navigate = useNavigate()

    const handleSubmit = async(e) =>{
      e.preventDefault();
      //NICHE WALA CODE CLIENT SAY SERVER PAR BHEJNE KE LIYE HAI USER RAGISTER KARNE KE LIYE LINE NO 19 SAY 26 TAK
      try{
          const res= await axios.post("/api/v1/auth/forgot-password",{email,newPassword,question});
          if(res.data.success){
            toast.success(res.data.message);           
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
    <Layout title={'Forgot Password - Ecommerce APP'}>
        <div className='register'>
          <div className="reg2">       
          <form onSubmit={handleSubmit}>
        <h1>Reset Password</h1>
  
  
    <div className="mb-1">
    <label htmlFor="exampleInputEmail1" className="form-label"></label>
    <input type="email" className="form-control" 
     placeholder='Enter your Email'  value={email} onChange={(e) => setEmail(e.target.value)} required/>
    </div>

    <div className="mb-1">
    <label htmlFor="exampleInputText" className="form-label"></label>
    <input type="text" className="form-control" 
     placeholder='Enter your Question'  value={question} onChange={(e) => setNewQuestion(e.target.value)} required/>
    </div>



    <div className="mb-1">
    <label htmlFor="exampleInputEmail1" className="form-label"></label>
    <input type="password" className="form-control" 
     placeholder='Enter your New Password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required/>
    </div> 

<br></br> 
    <button type="submit" className="btn btn-primary" >Reset</button>

</form>
        </div>
  </div>
 
    </Layout>
  )
}
export default ForgotPassword
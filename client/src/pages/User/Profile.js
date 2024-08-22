import React ,{useState, useEffect}from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import axios from 'axios'


 function Profile() {
    // context
    const [ auth, setAuth] = useAuth()
    // USE STATE
    const[name, setName] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[phone, setPhone] = useState("")
    const[address, setAddress] = useState("")

    // get user data

    useEffect(()=>{
      const {name,phone,address,} = auth?.user 
      setName(name)
      setPhone(phone)
      
      setAddress(address)
    },[auth?.user])

    const handleSubmit = async(e) =>{
        e.preventDefault();
        //NICHE WALA CODE CLIENT SAY SERVER PAR BHEJNE KE LIYE HAI USER RAGISTER KARNE KE LIYE LINE NO 19 SAY 26 TAK
        try{
            const {data}= await axios.put('/api/v1/auth/profile',{name,email,password,phone,address});
            if(data?.error){
              toast.error(data?.error)
            }else{
              setAuth({...auth,user:data?.updatedUser})
              let ls = localStorage.getItem("auth")
              ls = JSON.parse(ls)
              ls.user = data.updatedUser
              localStorage.setItem('auth', JSON.stringify(ls))
              toast.success('profile upadate success')
            }
            
        }catch (error) {
          console.log(error)
          toast.error("something went wrong")
        }
        
        
      }
  return (
    <Layout title={"user-profile"}>
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu></UserMenu>
                </div>
                <div className='col-md-9'>
                <div>
                <div className='register'>
          <div className="reg2">       
          <form onSubmit={handleSubmit}>
        <h1>User Profile</h1>
  <div className="mb-0">
    <label htmlFor="exampleInputEmail1" className="form-label"></label>
    <input type="text" className="form-control" id="exampleInputEmail1" placeholder='Enter your Name' value={name}  onChange={(e) => setName(e.target.value)} required/>
    </div>

    <div className="mb-0">
    <label htmlFor="exampleInputEmail1" className="form-label"></label>
    <input type="email" className="form-control" id="exampleInputEmail1" 
    placeholder='Enter your Email' 
     value={email}
      onChange={(e) => setEmail(e.target.value)} 
      required
      disabled/>
    </div>


    <div className="mb-0">
    <label htmlFor="exampleInputEmail1" className="form-label"></label>
    <input type="password" className="form-control" id="exampleInputEmail1" placeholder='Enter your Password' value={password} onChange={(e) => setPassword(e.target.value)} />
    </div>

    <div className="mb-0">
    <label htmlFor="exampleInputEmail1" className="form-label"></label>
    <input type="number" className="form-control" id="exampleInputEmail1" placeholder='Enter your Phone'  value={phone}  onChange={(e) => setPhone(e.target.value)}  />
    </div>

    <div className="mb-0">
    <label htmlFor="exampleInputEmail1" className="form-label"></label>
    <input type="text" className="form-control" id="exampleInputEmail1" placeholder='Enter your Address'  value={address} onChange={(e) => setAddress(e.target.value)}/>
    </div>

    
<br></br>

  <button type="submit" className="btn btn-primary" >Update</button>
</form>


        </div>
  </div>
 
                </div>
                </div>


            </div>
        </div>
    </Layout>
  )
}
export default Profile
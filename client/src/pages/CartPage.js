import React, { useState ,useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import {useCart} from '../context/cart';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import DropIn from "braintree-web-drop-in-react"
import axios from "axios"
import toast from 'react-hot-toast';

 
 function CartPage() {
    const [auth,setAuth] = useAuth();
    const [ cart, setCart]= useCart();
    const[instance, setInstance] = useState("");
    const[loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const [clientToken, setClientToken]= useState("")


    //price count 

    let totalPrice = () => {
        try{
                let total = 0;
                cart?.map((item)=> {
                    total = total + parseInt(item.price);
                    return total
                });
                return total.toLocaleString("en-US",{
                    style:"currency",
                    currency: "USD",
                })
        }catch(error){
            console.log(error)
        }
    }


    //delete item
    const removeCartItem =(pid)  => {
        try{
                let myCart = [...cart]
                let index = myCart.findIndex(item => item._id === pid)
                myCart.splice(index,1)
                setCart(myCart)
                localStorage.setItem("cart",JSON.stringify(myCart));
        }catch(error){
            console.log(error);
        }
    }

  //get payment getway token
  const getToken = async()=> {
    try{
            const {data} = await axios.get('/api/v1/product/braintree/token')
            setClientToken(data?.clientToken)
    }catch(error){
        console.log(error)
    }
  }
  
  useEffect(()=>{
    getToken()
  },[auth?.token])

  // handle payment
  const handlePayment = async ()=>{
    try{
        const {nonce} = await instance.requestPaymentMethod()
        const {data} =  await axios.post('/api/v1/product/braintree/payment',{
            nonce,cart
        })
        setLoading(false)
        localStorage.removeItem('cart')
        setCart([])
        navigate('/dashboard/user/profile')
        toast.success('Payment success')

    }catch(error){
        console.log(error)
        setLoading(false)
    }

  }

  return (
    <Layout>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <h1 className='text-center bg-light  p-2'>
                        {`Hello ${auth?.token && auth?.user?.name}`}
                    </h1>
                    <h4 className='text-center'>
                        {cart?.length ? `You Have ${cart.length} Items in your cart ${auth?.token ? "" : "please login to checkout"}` : "your cart is empty"}
                    </h4>
                </div>
        
            </div>
                <div className='row'>
                    <div className='col-md-7'>
                        {
                            cart?.map((pr) => (
                                <div className='row m-2 card flex-row'>
                                    <div className='col-md-4'>
                                    <img src={`/api/v1/product/product-photo/${pr._id}`} className="card-img-top" alt={pr.name}  />
                                    </div>
                                    <div className='col-md-8'>
                                        <p>{pr.name}</p>
                                        <p>{pr.description.substring(0,30)}</p>
                                        <p>Price:${pr.price}</p>
                                        <button className='btn btn-danger mb-1' onClick={()=> removeCartItem(pr._id)}>Remove</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='col-md-3 text-center'>
                        <h4>Cart Summary</h4>
                        <p>Total | Checkout | Payment</p>
                        <hr></hr>
                        <h4>Total :{totalPrice()}</h4>
                        {auth?.user?.address ? (
                            <div className="mb-3">
                                <h4>Current Address</h4>
                                <h5>{auth?.user?.address}</h5>
                                <button className='btn btn-outline-warning' onClick={()=> navigate('/dashboard/user/profile')
                                }>
                                    
                                    Update Address
                                </button>
                            </div>
                        ) : (
                            <div className='mb-3'>
                                {
                                    auth?.token?(
                                        <button className= "btn btn-outline-warning" onClick={()=> navigate('/dashboard/user/profile')}>Update Address</button>
                                    ) : (
                                        <button className= "btn btn-outline-warning" onClick={()=> navigate('/login',{
                                            state:"/cart",
                                        })}>
                                            Please Login to checkout</button>
                                    )
                                }
                            </div>
                        )}
                        <div className='mt-2'>
                            {
                                !clientToken || !cart?.length ? ("") :(
                                    <>
                                        <DropIn 
                            options={{
                                authorization:clientToken,paypal:{
                                flow:'vault',
                            },
                        }}
                            onInstance={instance => setInstance(instance)}>

                            </DropIn>
                            <button className='btn btn-primary' 
                            onClick={handlePayment}
                             disabled={loading || !instance || !auth?.user?.address}>{loading ? "Processing..." : "Make Payment"}</button>
                                    </>
                                )
                            }
                            
                        </div>
                    </div>
                </div>
        </div>
    </Layout>
  )
}
export default CartPage
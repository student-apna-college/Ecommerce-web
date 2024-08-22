
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

 function Spinner ({path = "login"}) {
  const [count, setCount] = useState(3)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(()=>{
      setCount((prevValue)=> --prevValue)
    },1000)

    count === 0 && navigate(`/${path}`,)
    return() => clearInterval(interval)
  },[count,navigate, path])
  return (
    
    <div>
  <div className="d-flex  flex-column justify-content-center align-item center">

    <h2  style={{marginTop:"20%", marginLeft:"30%"}}>wait for the loading time {count} second</h2>
    <div  style={{marginTop:"1%", marginLeft:"50%"}}className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
</div>

  )
}
export default  Spinner

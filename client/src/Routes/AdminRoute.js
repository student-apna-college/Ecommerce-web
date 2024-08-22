import React from 'react'
import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import {Outlet} from "react-router-dom";
import axios from "axios"
import Spinner from './Spinner';

// iske under sara code dashboard ke liye likha hai
 function AdminRoute() {
    const [ok, setOk] = useState(false)
    const [auth, setAuth] = useAuth()

    useEffect (()=> {
        const authCheck = async() => {
            const res = await axios.get('/api/v1/auth/admin-auth',)
             console.log(res?.data)
             if(res.data.ok){
                setOk(true)
             }else{
                setOk(false)
             }
        }
        if(auth?.token) authCheck();
        },[auth?.token]);

    return ok ? <Outlet/>: <Spinner path=""></Spinner>

}
export default AdminRoute
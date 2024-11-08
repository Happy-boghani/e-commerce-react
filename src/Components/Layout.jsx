import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from './Header'

const Layout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate("/")
        }
    }, [])

  return (
        <div className='w-full min-h-screen'>
                <Header/>
                <Outlet/>
        </div>
  )
}

export default Layout
import React, { Component, useEffect } from 'react'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Subplayer from './pages/Player/subPlayer'
import {Routes,Route, useNavigate} from 'react-router-dom'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import{auth} from'./firebase'
import { ToastContainer, toast } from 'react-toastify';

const App = ()=>{
  const navigate = useNavigate();

  useEffect(()=>{
  onAuthStateChanged(auth,async(user)=>{
      if(user){
        console.log('Logged In');
      }else{
        console.log('Logged Out');
        navigate('/login');
      }
    })
  },[navigate])

  return(
    <>
  <ToastContainer theme='dark' />
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route path='/player/:id' element={<Player />} />
    <Route path='/players' element={<Subplayer />} />
  </Routes>
    </>
  )
}

export default App
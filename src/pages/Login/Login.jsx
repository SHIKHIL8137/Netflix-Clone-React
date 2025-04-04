import React, { useState,useEffect ,useContext} from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import {login,signup} from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { AuthContext } from '../../components/authContext/authContext';
const Login =()=>{
  const { signState, setSignState, name, setName, email, setEmail, password, setPassword, loading, setLoading } = useContext(AuthContext);

  const navigate = useNavigate();
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/'); 
      }
    });

    return () => unsubscribe(); 
  }, [navigate]);

  const user_auth = async (event) => {
    event.preventDefault();
  
    if (signState === 'Sign In') {
      if (!email.trim() || !password.trim()) {
        toast.error('Please enter a valid email and password');
        return;
      }
      setLoading(true);
      try {
      await login(email, password);
        setEmail('');
        setPassword('');
        navigate('/');
      } catch (error) {
        toast.error('Login failed. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      if (!email.trim() || !password.trim() || !name.trim()) {
        toast.error('Please enter valid name, email, and password');
        return;
      }
      setLoading(true);
      try {
        await signup(name, email, password);
        setName('');
        setEmail('');
        setPassword('');
        navigate('/');
      } catch (error) {
        toast.error('Signup failed. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };
  

  return (
    loading?<div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>:
    <div className="login">
      <img src={logo} className='login-logo' alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form action="">
          {signState==='Sign Up' ?<input value={name} onChange={(e)=>{setName(e.target.value )}} type="text" placeholder='Your name' />:<></>}
          <input value={email} onChange={(e)=>{setEmail(e.target.value )}} type="email" placeholder='Email' /><input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder='Password' />
          <button onClick={user_auth} type='submit'>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState==='Sign In'?<p>New to Netflix? <span onClick={()=>{setSignState('Sign Up')}}>Sign Up Now</span></p>:<p>Already have account? <span onClick={()=>{setSignState('Sign In')}}>Sign In Now</span></p>}
        </div>
      </div>
    </div>
  )
}

export default Login

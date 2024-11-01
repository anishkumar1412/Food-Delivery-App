import React, {useContext, useState } from 'react'
import './Loginpopup.css'
import { assets } from '../../../../Food Del Frontend Assets/assets/assets'
import { StoreContext } from '../../context/StoreContext.jsx'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Loginpopup({setShowLogin}) {

  const {url, setToken} = useContext(StoreContext)
    const [currState,setCurrState] = useState("Sign Up")
    const [data,setData] = useState({
      name:"",
      email:"",
      password:"",
    })

    const onChangeHandler = (event) =>{
      const name = event.target.name
      const value = event.target.value;
      setData(data=>(
        {...data,[name]:value

        }))
    }

    const onLogin = async(event) =>{
       event.preventDefault(); 
       let newUrl = url;
       if(currState==='Login')
       {
        newUrl +="/api/user/login" 
       }
       else {
        newUrl +="/api/user/register"
       }

       const response = await axios.post(newUrl,data);

      if(response.data.success)
      {
         setToken(response.data.token);
         localStorage.setItem("token",response.data.token);
         toast.success(response.data.message);
         setShowLogin(false);

      }
      else {
        alert(response.data.message)
      }

    }
//     useEffect(()=>{
// console.log(data);

//     },[data])
  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img src={assets.cross_icon} onClick={()=>setShowLogin(false) } />
            </div>
       
         <div className="login-popup-inputs">
            {currState==='Login'?<></>:<input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Your name' required/>}
     
            <input type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder='Your email' required/>

            <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Pasword' required/>
         </div>
         <button type='submit' >{currState==='Sign Up'?"Create Account":"Login"}</button>
         <div className="login-popup-condition">
            <input type="checkbox" required/>
            <p>By continuing , I agree to the terms of use & privacy policy</p>
         </div>
         {currState==='Login'
         ?<p>Create a new account? <span onClick={()=>setCurrState('Sign Up')}>Click here</span> </p>
         :<p>Already have an account?<span onClick={()=>setCurrState('Login')}>Login here</span> </p>}
         
         </form>
    </div>
  )
}

export default Loginpopup

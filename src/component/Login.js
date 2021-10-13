import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { auth } from '../Config/config'
import { useHistory } from 'react-router'

export const Login = () => {

    const[email, setemail]= useState('');
    const[password, setpassword]= useState('');
    const history = useHistory();

    const [errorMsg, setErrorMsg]=useState('');
    const [successMsg, setSuccessMsg]=useState('');

    const handelLogin=(e)=>{
        e.preventDefault();
        console.log("from handelLogin" + email, password);
        auth.signInWithEmailAndPassword(email,password).then(()=>{
            setSuccessMsg("You are successfully Login..");
            setemail('');
            setpassword('');
            setErrorMsg('');
            setTimeout(setSuccessMsg('')
            ,history.push('/'),3000)
        }).catch((e)=>{
            setErrorMsg(e.message);
        })
    }

    return (
        <div className="container">
            <br></br>
            <br></br>
            <h1 className="text-center fw-bold">Login</h1>      
            <hr></hr> 
            {successMsg&&
                <>
                    <div className='success-msg'>{successMsg}</div>
                    <br></br>
                </>
            }
            <form className="form-group" onSubmit={handelLogin}>
                <label>EmailId</label>
                <input className="form-control col-lg-5 " type="email" placeholder="enter email" required
                onChange={(e)=>setemail(e.target.value)} value={email}/>    
                <br/>
                <label>Password</label>
                <input className="form-control col-lg-5 " type="password" placeholder="enter password" required
                onChange={(e)=>setpassword(e.target.value)} value={password}/>    
                <br/>
                <div className="btn-box">
                    <span>Don't have an Account <b>Signup</b> <Link className="text-decoration-none" to="signup">here</Link> </span>
                    <button type="submit" className='btn btn-info '>Log In</button>
                </div>
            </form>   
            {errorMsg&&
                <>
                    <br></br>
                    <div className='error-msg'>{errorMsg}</div>                
                </>
            }
        </div>
    )
}

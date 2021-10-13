import React from 'react'
import { Link } from 'react-router-dom'
import {useState} from 'react'
import { auth,fs } from '../Config/config'
import { useHistory } from 'react-router'

export const Signup = () => {

    const[name, setname]= useState('');
    const[email, setemail]= useState('');
    const[password, setpassword]= useState('');
    const history = useHistory();

    const [errorMsg, setErrorMsg]=useState('');
    const [successMsg, setSuccessMsg]=useState('');
    

    const handleSignup=(e)=>{
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email,password).then(
            (newuser)=>{
                console.log(newuser);
                fs.collection('user').doc(newuser.user.uid).set({
                    Name:name,
                    Email:email,
                    Pasword:password
                }).then( ()=>{
                    setSuccessMsg("You are successfully SingUp..");
                    setname('');
                    setemail('');
                    setpassword('');
                    setErrorMsg('');
                    setTimeout(setSuccessMsg('')
                    ,history.push('/login'),3000)
                }).catch(error=>setErrorMsg(error.message));
            }
        )
        .catch(
            (error)=>setErrorMsg(error.message)
        )
    }


    return (
        <div className='container'>
            <br></br>
            <br></br>
            <h1 className="text-center fw-bold" >Sign Up</h1>
            <hr></hr>
            {successMsg&&
                <>
                    <div className='success-msg'>{successMsg}</div>
                    <br></br>
                </>
            }
            <form className='form-group' autoComplete="off" onSubmit={handleSignup}>
                <label>Full Name</label>
                <input type="text" className='form-control' required placeholder="enter name"
                onChange={(e)=>setname(e.target.value)} value={name}></input>
                <br></br>
                <label>Email</label>
                <input type="email" className='form-control' required  placeholder="enter email"
                 onChange={(e)=>setemail(e.target.value)} value={email}></input>
                <br></br>
                <label>Password</label>
                <input type="password" className='form-control' required  placeholder="enter Password"
                 onChange={(e)=>setpassword(e.target.value)} value={password}></input>
                <br></br>
                <div className='btn-box'>
                    <span>Already have an account Login
                    <Link to="login" className='link'> Here</Link></span>
                    <button type="submit" className='btn btn-info '>SIGN UP</button>
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

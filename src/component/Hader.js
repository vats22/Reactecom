import React from 'react'
import { Link } from "react-router-dom"
import { auth } from '../Config/config'
import { useHistory } from 'react-router'


export default function Hader({user}) {

  const history= useHistory();

  const onSingout= ()=>{

    auth.signOut().then(()=>{
      history.push('/login');
    })
    console.log("You suucessfully Singout");

  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand fw-bold text-uppercase">Vat's-Store</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                {!user&& <div>
                  <li className="nav-item">
                    <a className="nav-link">
                      <Link to='login'> Log In </Link> 
                    </a>                          
                  </li>
                  <li className="nav-item">
                    <a className="nav-link">
                      <Link to='signup'>Sign Up</Link> 
                    </a>
                  </li>       
                </div>}    
                {user&&<>
                    <div><Link className='navlink' to="/">{user}</Link></div>
                    <div className='cart-menu-btn'>
                        <Link className='navlink' to="/cart">
                        <span  class="nav-icon">
                          <i class="fas fa-cart-plus"></i>
                        </span>
                        </Link>
                        {/* <span className='cart-indicator'>{totalQty}</span> */}
                    </div>
                    <div className='btn btn-dange btn-md'
                    onClick={onSingout}>LOGOUT</div>
                </>}                     

              </ul>
            </div>
            
          </div>
      </nav>
      

      
    </>
  )
}

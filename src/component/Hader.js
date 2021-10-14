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
      
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="/"> Vat's-Store</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            {!user&&<div>
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/login">Log In</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/signup">Sing Up</a>
                  </li>
                </ul>
              </div>
            }
            {user&&<div class="d-flex">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/">{user}</a>
                </li>
              </ul>
              <div routerLink="cart" class="cart-btn me-2">
                  <Link to="/cart">
                    <span  class="nav-icon">
                        <i class="fas fa-cart-plus"></i>
                    </span>
                  </Link>
                <div class="cart-items">00</div>
                </div>

              <form >
                <button className='btn btn-info btn-md me-2' onClick={onSingout}>Log Out</button>

                <Link className="text-decoration-none mr-3" to="add-product">
                  <button className='btn btn-info btn-md'>ADD Product</button>
                </Link>
              </form>
            </div>}
          </div>
        </div>
      </nav>



    </>
  )
}

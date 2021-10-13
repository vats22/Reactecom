import React, { useEffect, useState } from 'react'
import { auth, fs } from '../Config/config';
import Hader from './Hader'
import { SinglecartProduct } from './SinglecartProduct';

export const Cart = () => {

    function CurrentUser(){
        const[user, setuser]= useState(null);
        useEffect(()=>{
           auth.onAuthStateChanged((getuser)=>{
               if(getuser){
                fs.collection('user').doc(getuser.uid).get().then((response)=>{
                    setuser(response.data().Name);
                })
               }else{
                   setuser(null);
               }
           })
        },[])
        return user;

    }
 
    const loginUser= CurrentUser();

    const [cartProducts, setCartProducts]=useState([]);

    // getting cart products from firestore collection and updating the state
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart' + " " + user.uid).onSnapshot(snapshot=>{
                    const newCartProduct = snapshot.docs.map((doc)=>({
                        ID: doc.id,
                        ...doc.data(),
                    }));
                    setCartProducts(newCartProduct);                    
                })
            }
            else{
                console.log('user is not signed in to retrieve cart');
            }
        })
    },[])

    console.log(cartProducts);

    return (
        <>
            <Hader user={loginUser} />           
            <br></br>
            {cartProducts.length > 0 && (
                <div className='container'>
                    <h1 className='text-center text-bold font-weight-bold fs-1'>Cart</h1>
                    <hr/>
                    <div className='products-box'>
                        <SinglecartProduct cartProducts={cartProducts}/>
                    </div>
                </div>
            )}
            {cartProducts.length < 1 && (
                <div className='container-fluid'>No products to show</div>
            ) }           
        </>
    )
}

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

    //Increase qty
    let manegproduct;
    const Increaseqty=(cartproduct)=>{
        console.log(cartproduct)
        manegproduct = cartproduct;
        manegproduct.qty = manegproduct.qty + 1;
        manegproduct.quantity = manegproduct.quantity - manegproduct.qty;
        manegproduct.ProductTotalPrice = manegproduct.qty * manegproduct.price;
        console.log(manegproduct);
        // update in fs
        auth.onAuthStateChanged((getuser)=>{
            if(getuser){
                fs.collection('Cart ' + getuser.uid).doc(cartproduct.ID).update(manegproduct)
                .then(()=>console.log("your qty has been Increased"))

            }else{
                console.log("please login")
            }
        })

    }

    //Decrease qty
    const Decreaseqty = (cartproduct)=>{
        console.log(cartproduct);
        manegproduct = cartproduct;
        if(manegproduct.qty > 1){
            manegproduct.qty = manegproduct.qty - 1;
            manegproduct.quantity = manegproduct.quantity - manegproduct.qty;
            manegproduct.ProductTotalPrice = manegproduct.qty * manegproduct.price;
            console.log("price: " + manegproduct.price)
            console.log(manegproduct);
            // updtae in fs
            auth.onAuthStateChanged((getuser)=>{
                if(getuser){
                    fs.collection('Cart ' + getuser.uid).doc(cartproduct.ID).update(manegproduct)
                    .then(()=>console.log("your qty hase been decreased"))
                }else{
                    console.log("you have to log in")
                }
            })
        }
    }

    return (
        <>
            <Hader user={loginUser} />           
            <br></br>
            {cartProducts.length > 0 && (
                <div className='container'>
                    <h1 className='text-center text-bold font-weight-bold fs-1'>Cart</h1>
                    <hr/>
                    <div className='products-box'>
                        <SinglecartProduct cartProducts={cartProducts} Increaseqty={Increaseqty} Decreaseqty={Decreaseqty}/>
                    </div>
                </div>
            )}
            {cartProducts.length < 1 && (
                <div className='container-fluid'>No products to show</div>
            ) }           
        </>
    )
}

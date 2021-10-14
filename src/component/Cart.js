import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
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

    // calculate total qty
    const allqty = cartProducts.map((products)=>{
        return products.qty;
    })

    const calculateTotalqty = (a,b)=> a + b;
    const totalQty = allqty.reduce(calculateTotalqty,0);
    console.log(totalQty);

    //calculate Total Price
    const allPrice = cartProducts.map((products)=>products.ProductTotalPrice)
    const calculateTotalprice = (a,b)=> a + b;
    const totalPrice = allPrice.reduce(calculateTotalprice,0);
    console.log(totalPrice);

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
                    <h1 className='text-center text-bold font-weight-bold fs-1'>Your Cart</h1>
                    <hr/>
                    <div className='products-box'>
                        <SinglecartProduct cartProducts={cartProducts} Increaseqty={Increaseqty} Decreaseqty={Decreaseqty}/>
                    </div>
                    <div className='summary-box bg-info'>
                        <h5 className="text-center fw-bold">Cart Summary</h5>
                        <br></br>
                        <div>
                        Total No of Products: <span>{totalQty}</span>
                        </div>
                        <div>
                        Total Price to Pay: <span>$ {totalPrice}</span>
                        </div>
                        <br></br>
                        <Link className="text-decoration-none mr-3" to="/">
                            <button className='btn btn-success btn-md' >Purches</button>
                        </Link>
                    </div>                                    
                </div>
               
            )}
            {cartProducts.length < 1 && (
                <div className='container-fluid'>No products to show</div>
            ) }           
        </>
    )
}

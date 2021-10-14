import React from 'react'
import { auth, fs } from '../Config/config'

export const SinglecartProduct = ({cartProducts,Increaseqty,Decreaseqty}) => {
    return cartProducts.map((cartProduct)=>(
        <DisplayCartProduct key={cartProduct.ID} cartProduct={cartProduct}
        Increaseqty={Increaseqty} Decreaseqty={Decreaseqty} />
    ))


}

const DisplayCartProduct = ({cartProduct,Increaseqty,Decreaseqty}) => {
 
    const handrlDeletproduct = ()=>{
        auth.onAuthStateChanged((getuser)=>{
            if(getuser){
                fs.collection('Cart ' + getuser.uid).doc(cartProduct.ID).delete()
                .then(()=>console.log("you delete this product"))
            }else{
                console.log("please log in")
            }
        })
    }
    
    
    const handelIncreaseqty= ()=>{
        Increaseqty(cartProduct)
    }

    const handelDecreaseqty= ()=>{
        Decreaseqty(cartProduct)
    }

    return (
        <div className='product'>
            <div className='product-img'>
                <img src={cartProduct.url} alt="product-img"/>
            </div>
            <div className='product-text title'>{cartProduct.title}</div>
            <div className='product-text description'>{cartProduct.description}</div>
            <div className='product-text price'>Rs. {cartProduct.price}</div>
            <span>Quantity</span>
            <div className='product-text quantity-box'>
                <div className='action-btns minus' >
                    <i class="fas fa-minus" onClick={handelDecreaseqty}></i>
                </div>                
                <div>{cartProduct.qty}</div>               
                <div className='action-btns ' >
                    <i class="fas fa-plus" onClick={handelIncreaseqty}></i>
                </div>
            </div>
            <div className='product-text cart-price'>Rs. {cartProduct.ProductTotalPrice}</div>
            <div className='btn  btn-warning btn-lg cart-btn' onClick={handrlDeletproduct}>DELETE</div>            
        </div>
    )
}

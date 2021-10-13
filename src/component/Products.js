import React from 'react'
// import { IndividualProduct } from './IndividualProduct';

export const Products = ({allProducts}) => {

    // console.log(products);
    
    return allProducts.map((oneProduct)=>(
        <SingleProduct key = {oneProduct.ID} oneProduct={oneProduct}/>
    ))
}

const SingleProduct = ({oneProduct})=>{
    console.log("from singleProduct:" + oneProduct);
    return(
        
        <div className='product'>
            <div className='product-img'>
                <img src={oneProduct.url} alt="product-img"/>
            </div>
            <div className='product-text title'>{oneProduct.title}</div>
            <div className='product-text description'>{oneProduct.description}</div>
            <div className='product-text price'>$ {oneProduct.price}</div>
            <div className='product-text price'> Quantity: {oneProduct. quantity}</div>
            <div className='btn btn-info btn-md cart-btn'>ADD TO CART</div>
        </div> 
    )
}


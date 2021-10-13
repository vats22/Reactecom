import React from 'react'

export const SinglecartProduct = ({cartProducts}) => {
    return cartProducts.map((cartProduct)=>(
        <DisplayCartProduct key={cartProduct.ID} cartProduct={cartProduct}/>
    ))


}

const DisplayCartProduct = ({cartProduct}) => {
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
                    {/* <Icon icon={minus} size={20}/> */}
                </div>                
                <div>{cartProduct.qty}</div>               
                <div className='action-btns plus' >
                    {/* <Icon icon={plus} size={20}/> */}
                </div>
            </div>
            <div className='product-text cart-price'>Rs. {cartProduct.TotalProductPrice}</div>
            <div className='btn btn-danger btn-md cart-btn'>DELETE</div>            
        </div>
    )
}

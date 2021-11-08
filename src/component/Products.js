import React from 'react'


export const Products = ({ allProducts, addTocart }) => {

    // console.log(products);

    return allProducts.map((oneProduct) => (
        <DisplayProduct key={oneProduct.ID} oneProduct={oneProduct}
            addTocart={addTocart} />
    ))
}

const DisplayProduct = ({ oneProduct, addTocart }) => {
    console.log("from singleProduct:" + oneProduct);

    const handelAddtocart = () => {

        addTocart(oneProduct)
        alert("Peoduct hasbeen add in to the cart");
    }


    return (

        <div className='product'>
            <div className='product-img'>
                <img src={oneProduct.url} alt="product-img" />
            </div>
            <div className='product-text title'>{oneProduct.title}</div>
            <div className='product-text description'>{oneProduct.description}</div>
            <div className='product-text price'>$ {oneProduct.price}</div>
            <div className='product-text price'> Quantity: {oneProduct.quantity}</div>
            <div className='btn btn-info btn-md cart-btn' onClick={handelAddtocart}>ADD TO CART</div>
        </div>
    )
}
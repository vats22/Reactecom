import React,{ useEffect,useState } from 'react'
import { auth,fs } from '../Config/config'
import Hader from './Hader'
import { Products } from './Products'
export const Main = () => {

    function CurrentUser(){
        const[user, setuser] = useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged((user)=>{
                if(user){
                    fs.collection('user').doc(user.uid).get()
                    .then((respons)=>{setuser(respons.data().Name)})
                }
                else{
                    setuser(null);
                }
            })
        },[])
        return user;

    }
    
    const loginUser = CurrentUser();
    console.log(loginUser);

    const [products, setproducts]=useState('');

    const getProducts = async ()=>{
        const products = await fs.collection('Products').get();
        console.log(" fatch products:" + products);
        let myProducts = [];
        console.log("myProducts:" +  myProducts);
        for(var product of products.docs){
            var data = product.data();
            data.Id = product.id;
            myProducts.push({...data});
            if(myProducts.length === products.docs.length){
                setproducts(myProducts);
            }
        }
        console.log("myProducts:" +  myProducts);
    }

    useEffect(()=>{
        getProducts();
    },[])

    return (
       <>
            <Hader user={loginUser} />
            <br></br>
            {products.length > 0 && (
                <div className='container'>
                    <h1 className='text-center fw-bold'>Products</h1>
                    <hr/>
                    <div className='products-box'>
                        <Products products={products}/>
                    </div>
                </div>
            )}
            {products.length < 1 && (
                <div className='container text-bold '>Please wait....</div>
            )}
       </>
    )
}

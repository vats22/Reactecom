import React,{ useEffect,useState } from 'react'
import { auth,fs } from '../Config/config'
import Hader from './Hader'
import { Products } from './Products'
export const Main = (props) => {

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
        console.log("fatch products:" + products)
        let myProducts = [];
        console.log("My Products:" + myProducts);
        for(var product of products.docs){
            var data = product.data();
            data.ID = product.id;
            myProducts.push({...data});
            if(myProducts.length === products.docs.length){
                setproducts(myProducts);
            }
        }
        console.log("My Products:" + myProducts);
    }

    useEffect(()=>{
        getProducts();
    },[])

    // gettin current user uid
    function GetUserUid() {
        const [Useruid, setUseruid] = useState(null);
        useEffect(() => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    setUseruid(user.uid);
                }
            })
        }, [])
        return Useruid;
    }

    const uid = GetUserUid();
    
    let selectProduct;
    const addTocart = (selectProduct) => {
        if (uid !== null) {
            console.log(selectProduct);
            selectProduct = selectProduct;
            selectProduct["qty"]=1;
            selectProduct["ProductTotalPrice"]= selectProduct.qty * selectProduct.price;
            fs.collection("Cart"+ " " + uid).doc(selectProduct.ID).set(selectProduct).then(()=>{
                console.log("product add in to the CART");
            })
           
        }
        else {
            props.history.push('/login');
        }

    }

    return (
       <>
            <Hader user={loginUser} />
            <br></br>
            {products.length > 0 && (
                <div className='container'>
                    <h1 className='text-center text-bold font-weight-bold fs-1'>Products</h1>
                    <hr/>
                    <div className='products-box'>
                        <Products allProducts={products} addTocart={addTocart}/>
                    </div>
                </div>
            )}
            {products.length < 1 && (
                <div className='container text-bold fs-1 '>Please wait....</div>
            )}
       </>
    )
}

import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import { storage,fs } from '../Config/config';

export const Addproduct = () => {

    
    const [image, setImage]=useState(null);
    const [description, setDescription]=useState('');
    const [price, setPrice]=useState('');
    const [quantity, setQuantity] = useState("");
    const [title, setTitle]=useState('');

    const [imageError, setImageError]=useState('');
    const [uploadError, setUploadError]=useState('');
    const [successMsg, setSuccessMsg]=useState('');
    

    const types =['image/jpg','image/jpeg','image/png','image/PNG'];
    const handleProductImg=(e)=>{
        let selectedFile = e.target.files[0];
        if(selectedFile){
            if(selectedFile&&types.includes(selectedFile.type)){
                setImage(selectedFile);
                setImageError('');
            }
            else{
                setImage(null);
                setImageError('please select a valid image file type (png or jpg)')
            }
        }
        else{
            console.log('please select your file');
        }
    }

    const handleAddProducts=(e)=>{
        e.preventDefault();
        console.log(title, description, price);
        console.log(image);
        const uploadTask=storage.ref(`product-images/${image.name}`).put(image);
        uploadTask.on('state_changed',snapshot=>{
            const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
            console.log("check progress:" + progress);
        },error=>setUploadError(error.message),()=>{
            storage.ref('product-images').child(image.name).getDownloadURL().then(url=>{
                fs.collection('Products').add({
                    title,
                    description,
                    quantity: Number(quantity),
                    price: Number(price),
                    url
                }).then(()=>{
                    setSuccessMsg('Product added successfully');
                    setTitle('');
                    setDescription('');
                    setPrice('');
                    setQuantity("");
                    document.getElementById('file').value='';
                    setImageError('');
                    setUploadError('');
                    setTimeout(()=>{
                        setSuccessMsg('');
                    },3000)
                }).catch(error=>setUploadError(error.message));
            })
        })
    }
  
    return (
        <div className='container'>
            <br></br>
            <br></br>
            <h1 className="text-center fw-bold">Add Products</h1>
            <hr></hr>        
            {successMsg&&<>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
            </>} 
            <form autoComplete="off" className='form-group' onSubmit={handleAddProducts}>
                <label>Product Title</label>
                <input type="text" className='form-control' required placeholder="enter productname"
                onChange={(e)=>setTitle(e.target.value)} value={title}></input>
                <br></br>
                <label>Product Description</label>
                <input type="text" className='form-control' required placeholder="enter productdetails"
                onChange={(e)=>setDescription(e.target.value)} value={description}></input>
                <br></br>
                <label>Product Price</label>
                <input type="number" className='form-control' required placeholder="enter productprice"
                onChange={(e)=>setPrice(e.target.value)} value={price}></input>
                <br></br>
                <label>Product Quantity</label>
                <input
                type="number"
                className="form-control"
                required
                placeholder="Enter Product Quantity"
                onChange={(v) => setQuantity(v.target.value)}
                value={quantity}
                ></input>
                <br></br>
                <label>Upload Product Image</label>
                <input type="file" id="file" className='form-control' required 
                onChange={handleProductImg}></input>
                
                {imageError&&<>
                    <br></br>
                    <div className='error-msg'>{imageError}</div>
                   
                </>}
                <br></br>           
                <div className="btn-box">
                <span>Go back to <b>Shopping Page</b> <Link className="text-decoration-none" to="/">here</Link> </span>
                <button type="submit" className='btn btn-success btn-md'>
                    SUBMIT PRODUCT
                    </button>
                </div>
            </form>
            {uploadError&&<>
                <br></br>
                <div className='error-msg'>{uploadError}</div>
                    
            </>}

        </div>
    )
}
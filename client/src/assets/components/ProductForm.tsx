import {Dispatch, useContext, useState} from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'
import AuthContext from '../context/AuthContext'

interface productprops{
  product: Array<any>
  setProduct:Dispatch<any>
}

function ProductForm(props:productprops) {
    const context = useContext(AuthContext)
    const [name, setName] = useState<string>("");
    const [quantity, setQuantity] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const productsuccess = () => toast.success('product added', {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

    const addProduct = async() =>{
        try{  
        
          const res = await axios.post('https://testing-react-kbm3.onrender.com/admin/add-product',{ 
            name:name ,
            quantity:quantity, 
            price:price 
          })
          props.setProduct([...props.product, res.data])
          setName("")
          setQuantity("")
          setPrice("")
          productsuccess()
          context?.setShowForm(false)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

  return (
    <>
    <div className="container bg-light p-4 w-100 shadow rounded-bottom">
      <h1 className="mb-4">Add Product</h1>
      <div className="form-group">
        <input 
          id="productName"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Enter product name"
        />
      </div>
      <div className="form-group mt-3">
        <input 
          id="productQuantity"
          value={quantity}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantity(e.target.value)}
          type="number"
          className="form-control"
          placeholder="Enter quantity"
        />
      </div>
      <div className="form-group mt-3">
        <input 
          id="productPrice"
          value={price}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
          type="number"
          className="form-control"
          placeholder="Enter price"
        />
      </div>
      <div className="form-group mt-3">
        <input 
          id="productImage"
          type="file"
          className="form-control"
        />
      </div>
      <button className="btn btn-info mt-4 w-100" onClick={addProduct}>Add Product</button>
    </div>
  </>
  
  )
}

export default ProductForm

import { Dispatch } from "react"
import axios from 'axios'
import {toast} from 'react-toastify'

interface proptype{
    product:Array<object>,
    setProduct:Dispatch<any>
    show: boolean,
    setShow: Dispatch<any>,
}

function Confirm(props: proptype) {
  const deletesuccess = () => toast.info('product deleted', {
    position: "top-center",
    autoClose: 500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });

  async function deleteHandler(id:string) {
    try {
      const res = await axios.delete(
        "https://testing-react-kbm3.onrender.com/admin/del-product",
        {
          headers: { "Content-Type": "application/json" },
          data: { id: id },
        }
      );
  
      if (res.status === 200) {
        const updatedProducts = props.product.filter(
          (val: any) => val._id !== id
        );
        props.setProduct(updatedProducts);
        deletesuccess()
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
   }


  return (
    <div className="col-md-12 mt-1">
        <div className="text-center text-danger">
            <p className="fw-bold h-25" style={{fontSize:'12px'}}>are you sure you want to delete?</p>
        </div>
        <div className="d-flex h-100 justify-content-center align-items-center">
            <button className="d-inline" onClick={()=>props.setShow(false)} style={{backgroundColor:"transparent", border:"0px"}}>❌</button>
            <button onClick={(e:any)=>deleteHandler(e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id)} className="d-inline" style={{backgroundColor:"transparent", border:"0px"}}>✅</button>
        </div>
    </div>
  )
}

export default Confirm

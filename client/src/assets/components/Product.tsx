import { Dispatch, useState } from "react";
import axios from "axios";
import Confirm from "./Confirm";
import Carosel from "./Carosel";

interface ProductProps {
  image: string;
  name: string;
  price: number;
  quantity: number;
  key: number;
  identity: string;
  statevar: Array<object>;
  statefunc: Dispatch<any>;
}

function Product(props: ProductProps) {
  const [editable, setEditable] = useState<boolean>(false);
  const [uname, updateName] = useState<string>(props.name);
  const [uprice, updatePrice] = useState<number>(props.price);
  const [uquantity, updateQuantity] = useState<number>(props.quantity);
  const [show, setShow] = useState(false)


  function toggleEdit(id:string) {
    console.log(id);
    setEditable(!editable)
  }

  async function editHandeler(id:string) {
    axios.patch('https://testing-react-kbm3.onrender.com/admin/edit-product',{
      id: id,
        name: uname,
        price: uprice,
        quantity: uquantity,
    })
    .then((res)=>{
      if(res.status === 200){
        setEditable(!editable)
      }
    })
   
  }

  async function deleteToggle() {
    setShow(!show)
  }

  return (
    <div
      className="border-bottom bg-light rounded" id={props.identity} style={{ height: "auto" }}>
      <div className="row h-100">
        <div className="col-3 d-flex justify-content-center">
          <Carosel
          img1="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/330px-Image_created_with_a_mobile_phone.png"
          identity={props.identity} />
        </div>
        <div className="col-2 mt-2 d-flex h-100 justify-content-center align-items-center">
          {!editable ? (
            <p className="text-center fw-bold">{uname}</p>
          ) : (
            <input type="text" className="form-control w-75 text-center" value={uname}  
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>updateName(e.target.value)} />
          )}
        </div>

        <div className="col-2 mt-2 d-flex h-100 justify-content-center align-items-center">
          {!editable ?(
            <p className="text-center fw-bold">{uprice || 0}</p>
          ):(
            <input type="text" className="form-control w-75 text-center" value={uprice || 0}
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>updatePrice(parseInt(e.target.value))}/>
          )}
        </div>
        <div className="col-2 mt-2 d-flex h-100 justify-content-center align-items-center">
          {!editable ?(
            <p className="text-center fw-bold">{uquantity || 0}</p>
          ) : (
            <input type="text" className="form-control w-75 text-center" value={uquantity || 0}
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>updateQuantity(parseInt(e.target.value))}/>
          )}
        </div>
        <div className="col-3 d-flex h-100 align-items-center justify-content-center">
          {!show ? (
                <>
                  <button  onClick={() => deleteToggle()} style={{backgroundColor:"transparent", border:"0px"}}>🗑</button>
                  {!editable ? (
                    <button  onClick={(e:any) => toggleEdit(e.target.parentNode.parentNode.parentNode.id)} style={{backgroundColor:"transparent", border:"0px"}}>✎</button>
                  ) : (
                    <button onClick={(e:any) => editHandeler(e.target.parentNode.parentNode.parentNode.id)} style={{backgroundColor:"transparent", border:"0px"}}>✔</button>
                  )}
                </>
              ) : (
                <>
                 <Confirm  show={show} setShow={setShow} product={props.statevar} setProduct={props.statefunc}/> 
                </>
              )}
        </div>
      </div>
    </div>
  );
}

export default Product;

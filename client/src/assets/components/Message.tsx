import axios from "axios";
import { Dispatch } from "react";

interface messageProps {
    data:any;
    datasetter: Dispatch<any>
    show: boolean;
    setShow: Dispatch<any>
    msgArray: Array<any>;
    setMsgArray: Dispatch<any>
}

function Message(props:messageProps) {
    const onClose = ()=>{
        props.datasetter({})
        props.setShow(false)
    }

    const deleteMessage = async (id: string) =>{
       const response = await axios.delete(`https://testing-react-kbm3.onrender.com/admin/delete-message?id=${id}`)
       if(response.status === 200){
          const filteredArray = props.msgArray.filter((item:any)=>{
              if(item._id !== id){
                return true
              }
          })
          props.setShow(false)
          props.setMsgArray(filteredArray);
       }
    }

    const reply = async (email: string) =>{
      window.location.href = `mailto:${email}`
    }

  return (
    <div
    className="container d-flex flex-column position-absolute start-50 top-50 translate-middle p-4 bg-light border rounded shadow"
    id={props.data._id} style={{ width: "400px", zIndex: 999 }}
  >
    <button
      type="button"
      className="btn-close position-absolute"
      aria-label="Close"
      style={{ top: "10px", right: "10px" }}
      onClick={onClose}
    ></button>
    <div className="mb-3 border-bottom pb-2">
      <h5 className="mb-1">{props.data.name}</h5>
      <p className="mb-0 text-muted">{props.data.email}</p>
    </div>
    <div className="mb-3 border-bottom pb-2 ">
      <p className="overflow-y-scroll" style={{ height: "40vh" }}>
        {props.data.message}
      </p>
    </div>
    <div className="d-flex justify-content-end">
      <button className="btn btn-danger me-2" onClick={(e:any)=>deleteMessage(e.target.parentNode.parentNode.id)}>Delete</button>
      <button className="btn btn-primary" onClick={(e:any)=>reply(e.target.parentNode.parentNode.children[1].children[1].innerText)}>Reply</button>
    </div>
  </div>
  
  )
}

export default Message

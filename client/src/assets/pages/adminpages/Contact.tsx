import { useContext, useState } from "react"
import axios from "axios";
import {toast, ToastContainer} from 'react-toastify'
import AuthContext from "../../context/AuthContext";
import ProductForm from "../../components/ProductForm";


function Contact() {
  const context = useContext(AuthContext)
  
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const contactsuccess = (str: string) => toast.success(str, {
    position: "top-center",
    autoClose: 500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });

  const clearState = ()=>{
    setName("")
    setEmail("")
    setMessage("")
  }

  const sendMessage = async()=>{
    axios.post("https://testing-react-235m.onrender.com/admin/sendmessage",{
      name : name,
      email : email,
      message : message,
    })
    .then((data)=>{
      if(data.status === 200){
        clearState()
        contactsuccess('message sent success');
      } else {
        contactsuccess('error sending message')
      }
    }) .catch(()=>{
      clearState()
      contactsuccess('error sending message')
    })
  }

  return (
    <div className="container">
       {context?.showform ?(
      <div className="z-3 position-absolute w-75" style={{right:"12.5%", top:"8%"}}>
        <ProductForm setProduct={context?.setProduct} product={context?.product} />
      </div>
    ):(
      <></>
    )}

      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />

      <h1>Contact Us</h1>
      <p className="lead">Feel free to reach out to us!</p>
      <div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input type="text" className="form-control" value={name} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>(setName(e.target.value))} />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" className="form-control" value={email} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>(setEmail(e.target.value))} />
        </div>

        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message:</label>
          <textarea className="form-control" value={message} onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>(setMessage(e.target.value))}></textarea>
        </div>

        <button type="button" onClick={sendMessage} className="btn btn-primary">Send</button>
      </div>
    </div>
  )
}

export default Contact

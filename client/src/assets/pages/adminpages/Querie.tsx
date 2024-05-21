import axios from "axios"
import { useContext, useEffect, useState } from "react"
import QueryComp from "../../components/QueryComp"
import AuthContext from "../../context/AuthContext"
import ProductForm from "../../components/ProductForm"
import Message from "../../components/Message"


function Querie() {
  const [queries, setQueries] = useState([])
  const context = useContext(AuthContext)
  const [showmessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState<any>({})


  useEffect(()=>{
    const fetchQueries = ()=>{
        axios.get("https://testing-react-235m.onrender.com/admin/get-queries")
        .then((response:any) => setQueries(response.data))
    }
    fetchQueries();
  },[])

  
  return (
    <>
    {showmessage  ?(
        <Message data={message} datasetter={setMessage} show={showmessage} setShow={setShowMessage} msgArray={queries} setMsgArray={setQueries}/>
    ):(<></>)}

    {context?.showform ?(
      <div className="z-3 position-absolute w-75" style={{right:"12.5%", top:"8%"}}>
        <ProductForm setProduct={context?.setProduct} product={context?.product} />
      </div>
    ):(
      <></>
    )}
     <div className="container mt-2">
        <div className="row bg-dark text-light rounded mb-1">
            <div className="col-2 text-center fw-bold">Name</div>
            <div className="col-2 text-center fw-bold">Email</div>
            <div className="col-5 text-center fw-bold">Messages</div>
            <div className="col-3 text-center fw-bold">Action</div>
        </div>
        <div className="container overflow-y-scroll overflow-x-hidden" style={{height:"80vh"}}>
            {queries.map((data:any, index:number)=>{
                return(
                <QueryComp key={index} message={message} setMessage={setMessage} prop={data} show={showmessage} setShow={setShowMessage}/>
                )
            })}  
        </div>
     </div> 

    </>
  )
}

export default Querie

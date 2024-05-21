import { Dispatch } from "react";


interface QueryProps {
    prop: any;
    message: any;
    setMessage: Dispatch<any>
    show: boolean;
    setShow: Dispatch<any>
}


const QueryComp = (props:QueryProps ) => {  
    const showMessage = () =>{
        props.setMessage(props.prop)
        props.setShow(true)
    }


    const sendMail = (email:string) =>{
        window.location.href = `mailto:${email}`
    }

    return (
        <div className="row border-bottom align-items-center py-3" id={props.prop._id}>
            <div className="col-2 ">
                <p className="text-center m-0 fw-bold overflow-hidden">{props.prop.name}</p>
            </div>
            <div className="col-2">
                <p className="text-center m-0 overflow-hidden">{props.prop.email}</p>
            </div>
            <div className="col-5 overflow-hidden">
                <p className="text-center m-0 overflow-hidden" style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{props.prop.message}</p>
            </div>
            <div className="col-3 d-flex h-100 justify-content-center">
                <button className="btn btn-primary btn-sm" onClick={showMessage}>view</button>
                <button className="btn btn-success ms-3 btn-sm" onClick={(e:any)=>sendMail(e.target.parentNode.parentNode.children[1].innerText)}>Reply</button>
            </div>
        </div>
    );
}

export default QueryComp;

import React,{ useState } from 'react'
import { Link } from "react-router-dom"
import {useNavigate} from 'react-router-dom'
import img from "../images/6756054_3402363.svg"


function Signup() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const nameChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setError("")
        setName(event.target.value);
      };

    const usernameChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setError("")
        setUsername(event.target.value);
    }

    const passwordChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setError("")
        setPassword(event.target.value);
    }

    const signupHandeler = async() =>{
        const res = await fetch("https://testing-react-kbm3.onrender.com/register",{
          method:"POST",
          headers:{"Content-Type":'application/json'},
          body: JSON.stringify({name: name, password: password, username: username})
        })
        const data = await res.json();
        if(res.status == 200){
          setUsername("")
          setPassword("")
          setName("")
          navigate('/loginget', {replace: true});
        } else {
          console.log(data);
          setError(data.error)
        }      
    }
  return (
    <div className='container-fluid h-100 d-flex justify-content-center align-items-center bg-success-subtle' style={{backgroundImage:`url(${img})`, backgroundSize: 'cover'}}>
    <div className='d-flex flex-column text-center p-4 rounded-3' style={{backgroundColor:"#2C6E5F"}}>
        <h1 className='text-light'>signup</h1>
      <div style={{height:"35px"}}>{error && <p className='text-dark bg-light' style={{border:'1px solid red', borderLeft:"7px solid red"}}><span className="text-danger pe-2">🛇</span>{error}</p>}</div>
        <input className='form-control mb-2' type='text' value={name} onChange={nameChange} placeholder='Name' />
        <input className='form-control mb-2' type='text' value={username} onChange={usernameChange} placeholder='Username' />
        <input className='form-control mb-2' type='password' value={password} onChange={passwordChange} placeholder='Password' />
        <button className='btn btn-outline-light mb-2' onClick={signupHandeler}>Sign Up</button>
        <p className='mb-0 text-light'>Already a user? <Link to="/loginget">Login</Link></p>
    </div>
</div>

  )
}

export default Signup

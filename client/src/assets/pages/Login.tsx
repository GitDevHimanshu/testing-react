import { Link, useNavigate } from "react-router-dom";
import { Dispatch, useContext, useReducer } from 'react';
import AuthContext from "../context/AuthContext";
import img from "../images/6756054_3402363.svg";

// Define the initial state
const initialState = {
  username: '',
  password: '',
  error: ''
};

// Define the reducer function
function reducer(state:any, action:any) {
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...state, username: action.payload, error: '' };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload, error: '' };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'RESET_FIELDS':
      return { ...state, username: '', password: '', error: '' };
    default:
      return state;
  }
}

interface AuthContextType {
  loggedin: boolean | undefined,
  setLoggedin: Dispatch<any>
}

function Login() {
  const context: AuthContextType | undefined = useContext(AuthContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const usernameStateUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_USERNAME', payload: event.target.value });
  }

  const passwordStateUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_PASSWORD', payload: event.target.value });
  }

  async function loginHandler() {
    const res = await fetch("https://testing-react-jrl2.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify({ password: state.password, username: state.username })
    });
    const data = await res.json();
    if (res.status !== 200) {
      dispatch({ type: 'SET_ERROR', payload: data.msg });
    } else {
      dispatch({ type: 'RESET_FIELDS' });
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      context?.setLoggedin(true);
      navigate("/adminhome", { replace: true });
    }
  }

  return (
    <div className="container-fluid d-flex flex-column h-100 justify-content-center align-items-center bg-success-subtle" style={{ backgroundImage: `url(${img})`, backgroundRepeat: 'no-repeat', backgroundSize: "cover" }}>
      <div className="text-center p-4 rounded-3" style={{ backgroundColor: "#2C6E5F" }}>
        <h1 className="text-light mb-2">Login</h1>
        <div style={{ height: "35px" }}>
          {state.error && <p className='text-dark bg-light' style={{ border: '1px solid red', borderLeft: "7px solid red" }}><span className="text-danger pe-2">🛇</span>{state.error}</p>}
        </div>
        <div className='d-flex flex-column text-center'>
          <input className="form-control mb-2" value={state.username} onChange={usernameStateUpdate} type='text' placeholder='Username' />
          <input className='form-control mb-2' value={state.password} onChange={passwordStateUpdate} type='password' placeholder='Password' />
          <button className='btn btn-outline-light mb-2 fw-medium rounded' onClick={loginHandler}>Login</button>
          <p className="text-light mb-0">Don't have an account? <Link className="text-success-subtle" to="/">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;

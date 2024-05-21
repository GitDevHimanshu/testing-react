import {Link, Outlet} from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { useContext} from 'react'
import axios from 'axios'


function Header() {
  
  const context = useContext(AuthContext)

  const toggleShowForm = () =>{
    context?.setShowForm(!context?.showform)
  }
  
  const logoutHandler = ()=>{
    axios.post('https://testing-react-kbm3.onrender.com/logout')
    .then((res)=>{
      if(res.data) {
        localStorage.setItem("isLoggedIn", JSON.stringify(false));
        context?.setLoggedin(false);
      } else {
        context?.setLoggedin(true);
      }
    })
  }
  
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow" style={{ zIndex: "100" }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/adminhome">helpme</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to='/adminhome'>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/adminhome/contact'>Contact</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/adminhome/about'>About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/adminhome/queries'>Queries</Link>
            </li>
          </ul>
          {context?.loggedin ? (
            <div className="d-flex">
              <button onClick={toggleShowForm} className="btn btn-light me-2">
                Add Product
              </button>
              <button onClick={logoutHandler} className="btn btn-danger rounded-circle">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                  <path d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                  <path d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                </svg>
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </nav>
    <Outlet />
  </div>
  )
}

export default Header

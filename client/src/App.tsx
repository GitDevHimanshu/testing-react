import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from './assets/pages/Signup'
import Login from './assets/pages/Login';
import Admin from './assets/pages/adminpages/Admin';
import Header from './assets/components/Header';
import Contact from './assets/pages/adminpages/Contact';
import About from './assets/pages/adminpages/About';
import Querie from './assets/pages/adminpages/Querie';
import AuthContext from './assets/context/AuthContext';
import { useState } from 'react';

function App() {
  const [showform, setShowForm] = useState<boolean>(false)
  const [product, setProduct] = useState<any>([])

  const [loggedin, setLoggedin] = useState<boolean | undefined>(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    return isLoggedIn ? Boolean(JSON.parse(isLoggedIn)) : undefined;
  });
  
  return (
    <>
      <BrowserRouter >
        <AuthContext.Provider value={{loggedin, setLoggedin, showform, setShowForm , product, setProduct}}>
          <Routes>
            <Route path='/' element={<Signup/>} />
            <Route path='/loginget' element={<Login />} />
            <Route  path='/adminhome' element={loggedin?(<Header />):(<Login/>)} >
              <Route path='/adminhome' element={<Admin />} />
              <Route path='/adminhome/contact' element={<Contact />} />
              <Route path='/adminhome/about' element={<About />} />
              <Route path='/adminhome/queries' element={<Querie />} />
            </Route>
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    </>
  )
}
export default App

import { Dispatch, createContext} from 'react'

interface authcontext {
    loggedin: boolean | undefined,
    setLoggedin: Dispatch<boolean>
    showform: boolean ,
    setShowForm: Dispatch<boolean>
    product: Array<any>
    setProduct: Dispatch<any>
  }
  
const AuthContext = createContext<authcontext | undefined>(undefined)

export default AuthContext;
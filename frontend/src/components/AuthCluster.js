import React, {createContext, useReducer,useState,useEffect} from 'react'
import * as fcl from "@onflow/fcl"
import AppRouter from '../router/AppRouter';
import TokenData from './TokenData';
import { A } from "hookrouter";
import UserDashboard from './Dashboard/UserDashboard';
import UserNavBar from '../Navbar/UserNavBar'
import '../App.css';
import { initialState, reducer } from "../reducer";
import { navigate } from "raviger";

export const AuthContext = createContext();

const AuthCluster = () => {
  const [user, setUser] = useState({loggedIn: null})
  const [state, dispatch] = useReducer(reducer, initialState);
 
  useEffect(() => fcl.currentUser().subscribe(setUser), [])
  if (user.loggedIn) {
    console.log(user)
    navigate("/dashboard")

    return (

      <div>
         <AuthContext.Provider
              value={{
                state,
                dispatch
              }}>
          <AppRouter />
        </AuthContext.Provider>

      </div>
    )
  } else {
    return (


      <div class="p-8 center">
        <button class="btn-primary" onClick={fcl.logIn}>Log In</button>
        <button class="btn-secondary" onClick={fcl.signUp}>Sign Up</button>
      </div>
    )
  }
}

export default AuthCluster
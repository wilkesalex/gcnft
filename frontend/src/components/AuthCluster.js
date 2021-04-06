import React, {useState, useEffect} from 'react'
import * as fcl from "@onflow/fcl"
import AppRouter from '../router/AppRouter';
import TokenData from './TokenData';
import { A } from "hookrouter";
import UserDashboard from './Dashboard/UserDashboard';
import UserNavBar from '../Navbar/UserNavBar'
import '../App.css';

const AuthCluster = () => {
  const [user, setUser] = useState({loggedIn: null})
  useEffect(() => fcl.currentUser().subscribe(setUser), [])
  if (user.loggedIn) {
    return (
      <div>
        
        <AppRouter />
       
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
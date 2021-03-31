import React from 'react';
import AuthCluster from './AuthCluster';
import TokenData from './TokenData';
import React, { createContext, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import { initialState, reducer } from "./store/reducer";

import './App.css';

function App() {
  return (
    <div className="App">
      <AuthCluster />
      <TokenData />
      <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
    <Router>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/" component={Home}/>
      </Switch>
    </Router>
    </AuthContext.Provider>
    </div>
  );
}

export default App;

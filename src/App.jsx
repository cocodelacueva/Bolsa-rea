import React from 'react';
import { DataContext } from './context/DataProvider'
import Login from './components/login'
import Simbolos from './components/simbolos'
import Navbar from './components/navbar'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {

  const {usuario} = React.useContext(DataContext)

  return usuario.activo !== null ? (
    <Router>
      <div className="inner-Wrapper">
        <Navbar />
        <Switch>
          <Route component={Login} path="/login" exact/>
          <Route component={Simbolos} path="/simbolos" exact/>
          <Route component={Simbolos} path="/" exact/>
        </Switch>
      </div>
    </Router>
  ) : (
    <div>
      Loading...
    </div>
  )
}

export default App;

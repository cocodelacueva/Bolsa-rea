import React from 'react';
import { DataContext } from './context/DataProvider'
import Login from './components/login'
import Simbolos from './components/simbolos'
import Navbar from './components/navbar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App(props) {

  const {usuario} = React.useContext(DataContext);

  const RutaProtegida = ({component, path, ...rest}) => {
    
    if(usuario.estado){
      return <Route component={component} path={path} {...rest} />
    }else{
      return <Redirect to="/login" {...rest} />
    }
  }

  return usuario.estado !== null ? (
    <Router>
      <div className="inner-wrapper">
        <Navbar />
        <Switch>
          <Route component={Login} path="/login" exact/>
          <RutaProtegida component={Simbolos} path="/" exact/>
        </Switch>
      </div>
    </Router>
  ) : (
    <div>
      Cargando...
    </div>
  )
}

export default App;

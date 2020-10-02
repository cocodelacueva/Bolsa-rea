import React from 'react';
import { DataContext } from '../context/DataProvider'


function Login(props) {

    const { iniciarSesion, usuario } = React.useContext(DataContext);
    
    React.useEffect((props) => {
        
        if(usuario.estado){
            props.history.push('/')
        }
    }, [usuario.estado])

 return (
     <div>
         <h2>
             Haga click en el botón para iniciar sesión.
         </h2>

         <p>
             Para iniciar la applicación es necesario tener una cuenta de google.
         </p>

         <button
            onClick={iniciarSesion}
         >
             Acceder
         </button>
     </div>
 )

}

export default Login;
import React from 'react';
import { DataContext } from '../context/DataProvider'
import { Link } from "react-router-dom";
  

function Navbar() {

    const { iniciarSesion, cerrarSesion, usuario, panel, obtenerData } = React.useContext(DataContext);

    const cargarNuevaData = (data) => {
        
        obtenerData(data);
    }
    

 return (
     <nav>
         <Link to="/">Bolsa Rea</Link>
         <ul>
            { usuario.estado ? (
                <>
                <select
                    onChange={ (e) => cargarNuevaData(e.target.value) }
                >
                    <option value="panel_general">
                        Panel General
                    </option>
                    <option value="panel_cedears">
                        Panel CEDEARs
                    </option>
                </select>
                <button
                    onClick={cerrarSesion}
                >
                    Cerrar sesión
                </button>
                </>
            )
            : (
                <button
                    onClick={iniciarSesion}
                >
                    Acceder
                </button>
            )}
         
            
         </ul>
     </nav>
 )

}

export default Navbar;
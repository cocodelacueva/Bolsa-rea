import React from 'react';
import { DataContext } from '../context/DataProvider'


function Simbolos() {

    const { usuario, simbolos, panelNombre, simbolosFecha } = React.useContext(DataContext);

 return usuario.estado ? (
    <div className="app-wrapper">
        <h2>
            Panel: {panelNombre}
        </h2>
        <p>
            Fecha: {simbolosFecha}
        </p>
        
        <ul>
            {simbolos.map(simbolo => (
                <li key={simbolo.simbolo}>
                {simbolo.simbolo} - AR$ {simbolo.ultimoPrecio} - {simbolo.tendencia}
                </li>
            ))}
        </ul>
    </div>
    ) : null

}

export default Simbolos;
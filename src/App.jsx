import React from 'react';
import { db } from './firebase'


function App() {

  const [simbolos, setSimbolos] = React.useState([]);
  const [panel, setPanel] = React.useState('');
  const [simbolosFecha, setSimbolosFecha] = React.useState('');

  React.useEffect(() => {
    
    const obtenerData = async () => {
      try {
        
        const data = await db.collection('panel_general').orderBy("date", "desc").limit(1).get();        
        
        const arrayData = data.docs.map(doc => ( doc.data() ))
        setSimbolos(arrayData[0].titulos);

        setSimbolosFecha(arrayData[0].date)
        setPanel(arrayData[0].name_panel)

      } catch (error) {
        console.log(error);
      }
    }

    obtenerData();

  }, [] )

  return (
    <div className="app-wrapper">
      <h2>
        Panel: {panel}
      </h2>
      <p>
        Fecha: {simbolosFecha}
      </p>

      <ul>
        {simbolos.map(simbolo => (
          <li key={simbolo.simbolo}>
            AR$ {simbolo.ultimoPrecio} - {simbolo.tendencia}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

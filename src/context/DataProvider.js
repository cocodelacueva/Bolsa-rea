import React from 'react'
import {db, auth, provider} from '../firebase'

export const DataContext = React.createContext();

const DataProvider = (props) => {

    const dataUsuario = {uid: null, email: null, estado: null, displayName: null}
    const panelDefault = 'panel_general';

    //estados:
    const [usuario, setUsuario] = React.useState(dataUsuario)
    const [simbolos, setSimbolos] = React.useState([]);
    const [panel, setPanel] = React.useState(panelDefault);
    const [panelNombre, setPanelNombre] = React.useState(null);//es para escribir el nombre del panel
    const [simbolosFecha, setSimbolosFecha] = React.useState(null);


    React.useEffect(() => {
        detectarUsuario()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const detectarUsuario = () => {
        auth.onAuthStateChanged(user => {
            if(user){
                setUsuario({uid: user.uid, email: user.email, estado: true, displayName: user.displayName});
                obtenerData(panel);
            }else{
                setUsuario({uid: null, email: null, estado: false, displayName: null});
            }
        })
    }


    const iniciarSesion = async() => {
        try {
            await auth.signInWithPopup(provider);
        } catch (error) {
            console.log(error);
        }
    }

    const cerrarSesion = () => {
        auth.signOut();
    }

    const obtenerData = async ( panel='panel_general' ) => {
        
        setPanel(panel);

        try {  
          const data = await db.collection(panel).orderBy("date", "desc").limit(1).get();        
          
          const arrayData = data.docs.map(doc => ( doc.data() ));

          setSimbolos(arrayData[0].titulos);
  
          setSimbolosFecha(arrayData[0].date)
          setPanelNombre(arrayData[0].name_panel)
  
        } catch (error) {
          console.log(error);
        }
      }


    return (
        <DataContext.Provider value={{
            usuario, iniciarSesion, cerrarSesion, obtenerData, simbolos, panelNombre, simbolosFecha, panel
        }}>
           {props.children} 
        </DataContext.Provider>
    )
}

export default DataProvider

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
    const [dolares, setDolares] = React.useState(null);


    React.useEffect(() => {
        detectarUsuario()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const detectarUsuario = () => {
        auth.onAuthStateChanged(user => {
            if(user){
                setUsuario({uid: user.uid, email: user.email, estado: true, displayName: user.displayName});
                //obtiene los datos de los simbolos
                obtenerData(panel);
                //obtiene los datos de los dolares
                obtenerData('cotizacion_dolares', 'dolares');
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

    //obtener la data de local host, sino esta en local host hace un fetch a firebase
    const obtenerData = async ( panelToFetch='panel_general', obdata='simbolos' ) => {
        
        if (obdata === 'simbolos') {
            setPanel(panelToFetch);
        }
        
        //busca en localhost
        let oldData = localStorage.getItem(panelToFetch);

        if ( oldData ) {
            //chequeamos si es muy vieja y hacemos un nuevo fetch

            oldData = JSON.parse(oldData)
            const now = new Date()
            // compare the expiry time of the item with the current time
            if (now.getTime() > oldData.expiry) {
                // If the item is expired, delete the item from storage
                localStorage.removeItem(panelToFetch);
                // and fetchdata
                fetchData(panelToFetch, obdata);
            } else {
                //si esta fresca retornamos:
                if (obdata === 'simbolos') {
                    //seteamos estados
                    setSimbolos(oldData.value.titulos);
                    setSimbolosFecha(oldData.value.date);
                    setPanelNombre(oldData.value.name_panel);
                } else {
                    setDolares(oldData.value);
                }
                
            }

        } else {
            //no esta en localhost, obtenemos la data
            fetchData(panelToFetch, obdata);
        }
    
    }

    const fetchData = async ( panel, tofetch ) => {
       
        try {  
            const doc = await db.collection('cotizaciones').doc(panel).get();   
            const data = doc.data();
  
            if (tofetch === 'simbolos') {
                //seteamos estados
                setSimbolos(data.titulos);
                setSimbolosFecha(data.date);
                setPanelNombre(data.name_panel);
            } else {
                
                setDolares(data);
            }
            

            //guardamos en localhost
            const now = new Date();
            const item = {
                value: data,
                expiry: now.getTime() + 1000*60*60,
            }
            localStorage.setItem(panel, JSON.stringify(item));
    
          } catch (error) {
            console.log(error);
          }
    };


    return (
        <DataContext.Provider value={{
            usuario, iniciarSesion, cerrarSesion, obtenerData, simbolos, panelNombre, simbolosFecha, panel, dolares
        }}>
           {props.children} 
        </DataContext.Provider>
    )
}

export default DataProvider

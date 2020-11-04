import React from 'react'
import {db, auth, provider} from '../firebase'

export const DataContext = React.createContext();

const DataProvider = (props) => {

    const dataUsuario = {uid: null, email: null, estado: null, displayName: null, preferences: null}
    
    //estados:
    const [usuario, setUsuario] = React.useState(dataUsuario)
    const [cotizaciones, setCotizaciones] = React.useState(null);
    const [dolares, setDolares] = React.useState(null);
    const [monedasDigitales, setmonedasDigitales] = React.useState(null);
    const [panelSelec, setpanelSelec] = React.useState('panel_general');

    React.useEffect(() => {
        detectarUsuario()
    }, []);



    /*
     * USUARIO
    */
    const detectarUsuario = async() => {
        auth.onAuthStateChanged(user => {
            if(user){
                
                checkPerfilUser(user);

            }else{
                setUsuario({uid: null, email: null, estado: false, displayName: null, preferences: null});
            }
        })
    }

    const checkPerfilUser = async(user) => {
        
        //ve si el usuario existe en la bd para traer sus preferencias
        const usuarioDB = await db.collection('usuarios').doc(user.email).get()
        
        if (usuarioDB.exists) {
            
            setUsuario(usuarioDB.data());
            
        } else {
            //si no existe lo agrega
            const nuevoUsuario = {uid: user.uid, email: user.email, estado: true, displayName: user.displayName}
            db.collection('usuarios').doc(user.email).set(nuevoUsuario);

            setUsuario(nuevoUsuario);
        }
        
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
        setUsuario(dataUsuario);
    }

    //modifica el perfil del usuario, por ejemplo display name, pero tambien cuando se quiere agregar un favorito
    const modificarPerfilUsuario = async (data) => {
        const user = usuario;

        await db.collection('usuarios').doc(user.email).update(data)
        setUsuario(data);
    }

    //modifica el perfil del usuario, por ejemplo display name, pero tambien cuando se quiere agregar un favorito
    const updatePreferenciaUsuario = async (nuevasPreferencias) => {
        const user = usuario;

        const usuarioModificado = {
            ...usuario,
            preferencias: nuevasPreferencias
        }

        await db.collection('usuarios').doc(user.email).update(usuarioModificado)
        setUsuario(usuarioModificado);
    }


    /*
     * DATOS
    */
    //obtener la data de las colecciones de a un documento a la vez
    //por defecto hay que pasar la coleccion a buscar y la fecha
    // con estas variables se guarda en localhost
    // sino esta en local host hace un fetch a firebase desde el ultimo
    const obtenerArrayData = async ( coleccion, fecha, estado ) => {
        
        //busca en localhost
        let oldData = localStorage.getItem(coleccion+'_'+fecha);

        if ( oldData ) {
            //chequeamos si la fecha es hoy, chequeamos que la info no es mayor a 30 minutos y si lo es hacemos un nuevo fetch

            oldData = JSON.parse(oldData)
            const now = new Date();
            // compare the expiry time of the item with the current time
            if (now.toJSON().slice(0, 10) !== fecha && now.getTime() > oldData.expiry) {
                console.log('es muy viejo para ser de la misma fecha');
                // If the item is expired, delete the item from storage
                localStorage.removeItem(coleccion+'_'+fecha);
                // and fetchdata
                const dataDB = await fetchData(true, coleccion, fecha);
                console.log(dataDB)

                //guardamos en localhost
                const now = new Date();
                const item = {
                    value: dataDB[0],
                    expiry: now.getTime() + 1000*60*30,
                }
                localStorage.setItem(coleccion+'_'+(new Date().toJSON().slice(0, 10)), JSON.stringify(item));

                //seteamos los estados
                if (estado === 'cotizaciones') {
                    debugger;
                    setCotizaciones(dataDB[0]);
                } else if ( estado === 'dolares' ) {
                    setDolares(dataDB[0]);
                } else if ( estado === 'monedas_digitales' ) {
                    setmonedasDigitales(dataDB[0])
                }
            } else {
                //si esta fresca retornamos estado:
                if (estado === 'cotizaciones') {
                    setCotizaciones(oldData.value);
                } else if ( estado === 'dolares' ) {
                    setDolares(oldData.value);
                } else if ( estado === 'monedas_digitales' ) {
                    setmonedasDigitales(oldData.value)
                }
            }

        } else {
            //no esta en localhost, obtenemos la data
            const dataDB = await fetchData(true, coleccion);

            //guardamos en localhost
            const now = new Date();
            const item = {
                value:  dataDB[0],
                expiry: now.getTime() + 1000*60*30,
            }
            localStorage.setItem(coleccion+'_'+(new Date().toJSON().slice(0, 10)), JSON.stringify(item));

            //seteamos los estados
            if (estado === 'cotizaciones') {
                setCotizaciones(dataDB[0]);
            } else if ( estado === 'dolares' ) {
                setDolares(dataDB[0]);
            } else if ( estado === 'monedas_digitales' ) {
                setmonedasDigitales(dataDB[0])
            }
        }
    
    }

    const definePanelAcciones = (panel) => {
        setpanelSelec(panel);
    }

    const fetchData = async ( multiple=false, coleccion, where=false, limit=1, ) => {
       
        try {  
            if (multiple) {
                const data = await db.collection(coleccion).orderBy("date", "desc").limit(limit).get();        
                const arrayData = data.docs.map(doc => ( doc.data() ));
                return arrayData;
            } else {
                //si la busqueda no es multiple, busca algo específico, debe definir where

            }
            
    
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <DataContext.Provider value={{
            usuario, iniciarSesion, cerrarSesion, modificarPerfilUsuario, updatePreferenciaUsuario, panelSelec, definePanelAcciones, obtenerArrayData, cotizaciones, monedasDigitales, dolares
        }}>
           {props.children} 
        </DataContext.Provider>
    )
}

export default DataProvider

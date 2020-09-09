import React from 'react'
import {db, auth, provider} from '../firebase'

export const DataContext = React.createContext()

const DataProvider = (props) => {

    // const dataUsuario = {uid: null, email: null, estado: null}
    // const [usuario, setUsuario] = React.useState(dataUsuario)
    // const [mensajes, setMensajes] = React.useState([])

    // React.useEffect(() => {
    //     detectarUsuario()
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    // const detectarUsuario = () => {
    //     auth.onAuthStateChanged(user => {
    //         if(user){
    //             setUsuario({uid: user.uid, email: user.email, estado: true})
    //             cargarMensajes()
    //         }else{
    //             setUsuario({uid: null, email: null, estado: false})
    //         }
    //     })
    // }

    // const ingresoUsuario = async() => {
    //     try {
    //         await auth.signInWithPopup(provider)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // const cerrarSesion = () => {
    //     auth.signOut()
    // }

    // const cargarMensajes = () => {
    //     db.collection('chat').orderBy('fecha')
    //         .onSnapshot(query => {
    //             const arrayMensajes = query.docs.map(item => item.data())
    //             setMensajes(arrayMensajes)
    //         })
    // }

    // const agregarMensajes = async(uidChat, textoInput) => {
    //     try {
    //         await db.collection('chat').add({
    //             fecha: Date.now(),
    //             texto: textoInput,
    //             uid: uidChat
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return (
        <DataContext.Provider value={{
            
        }}>
           {props.children} 
        </DataContext.Provider>
    )
}

export default DataProvider

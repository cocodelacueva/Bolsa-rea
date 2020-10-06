import React from 'react';
import { DataContext } from '../context/DataProvider'
import { Link } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles, AppBar, Toolbar, Typography, Button } from '@material-ui/core';

  
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));

function Navbar() {
    const classes = useStyles();

    const { iniciarSesion, cerrarSesion, usuario } = React.useContext(DataContext);
    

 return (
     <nav className={classes.root}>
         <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <Link to="/">Bolsa Rea</Link>
                </Typography>
                { usuario.estado ? (
                    <Button endIcon={<ExitToAppIcon />} onClick={cerrarSesion} color="inherit">Cerrar Sesión</Button>
                ) : (
                    <Button onClick={iniciarSesion} color="inherit">Iniciar Sesión</Button>
                )}
            </Toolbar>
        </AppBar>
     </nav>
    )

}

export default Navbar;


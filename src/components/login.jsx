import React from 'react';
import { DataContext } from '../context/DataProvider'
import { makeStyles, Container, Typography, Button } from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({

    root: {
        marginTop: theme.spacing(4),
    },

    btns: {
        textAlign: 'center',
        '& > *': {
            margin: theme.spacing(3),
        },
    },
  }));

  
function Login(props) {
    const classes = useStyles();
    const { iniciarSesion, usuario } = React.useContext(DataContext);
    
    React.useEffect(() => {
        
        if(usuario.estado){
            props.history.push('/')
        }
    }, [usuario.estado, props])

 return (
    <div className={classes.root}>
        <Container maxWidth="sm">
            <Typography variant="h1" align="center" gutterBottom>Iniciar sesión</Typography>
            <Typography variant="body1" align="center" gutterBottom>Para iniciar la applicación es necesario tener una cuenta de google.</Typography>
            <div className={classes.btns}>
                <Button variant="contained" color="primary" size="large"  onClick={iniciarSesion}>Iniciar Sesión</Button>
            </div>
        </Container>
    </div>
 )

}

export default Login;
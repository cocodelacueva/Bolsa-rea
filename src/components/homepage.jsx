import React from 'react';
import { DataContext } from '../context/DataProvider'
import { makeStyles, Container, Grid, TextField, Typography, Button } from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
    wrapperSimbolos : {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
    },
    formWrapper: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4),
    }
  }));

  
function Homepage() {
    const classes = useStyles();
    
    const { usuario, modificarPerfilUsuario } = React.useContext(DataContext);

    console.log(usuario);
    //estados
    const [editarPerfil, setEditarPerfil ] = React.useState(false);
    const [newDisplayName, setNewDisplayName] = React.useState(usuario.displayName);

    const handleMiConfiguracion = () => {
        setEditarPerfil(!editarPerfil);
    }

    const handleSubmitPerfilForm = () => {
       
        const usuarioEditado = {
            ...usuario,
            displayName: newDisplayName
        }

        modificarPerfilUsuario(usuarioEditado);
        
    }

 return (
    <div className={classes.wrapperSimbolos}>
        <Container maxWidth="lg">
            <Grid container>
                <Grid item sm={8}>
                    <Typography variant='h4' gutterBottom>
                        Saludos {usuario.displayName}
                    </Typography>
                </Grid>

                <Grid item sm={4}>
                    <Button size="small" onClick={handleMiConfiguracion} variant="outlined">
                        Mi configuración
                    </Button>
                </Grid>

                {
                    editarPerfil ? (
                        <Grid item xs={12}>
                            <form className={classes.formWrapper} noValidate autoComplete="off">

                                <TextField id="standard-basic" label="Modificar nombre" value={newDisplayName} onChange={ e => setNewDisplayName(e.target.value)} />

                                <Button onClick={() => handleSubmitPerfilForm()} variant="contained" color="secondary">
                                    Guardar
                                </Button>
                            </form>
                        </Grid>
                    ) : null
                }

                <Grid item xs={12}>
                    <Typography variant='body1' gutterBottom>
                        Esta es su sección personalizada. Para modificarla, haga click en Mi configuración
                    </Typography>
                </Grid>
            </Grid>
            
           
        </Container>
    </div>
 )

}

export default Homepage;
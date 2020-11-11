import React from 'react';
import { DataContext } from '../context/DataProvider'
import { makeStyles, Container, Grid, TextField, Typography, Button, Paper } from '@material-ui/core/';
import SimboloGrafico from './simbolo-grafico';

const useStyles = makeStyles((theme) => ({
    wrapperSimbolos : {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
    },
    formWrapper: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4),
    },
    strongWeigth: {
        fontWeight: 700,
    },
    wrapperpPreferencias : {
        width: '100%',
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
    },
    preferenciasItem : {
        marginBottom: theme.spacing(7),
        marginLeft: 'auto',
        marginRight: 'auto'
    }
  }));

  
function Homepage() {
    const classes = useStyles();
    
    const { usuario, modificarPerfilUsuario } = React.useContext(DataContext);

    //estados
    const [editarPerfil, setEditarPerfil ] = React.useState(false);
    const [newDisplayName, setNewDisplayName] = React.useState(usuario.displayName);
    const [preferenciasPanel_general, setpreferenciasPanel_general ] = React.useState([]);
    const [preferenciasPanel_cedears, setpreferenciasPanel_cedears ] = React.useState([]);
    const [preferenciasMonedasDigitales, setpreferenciasMonedasDigitales ] = React.useState([]);
    const [preferenciasDolares, setpreferenciasDolares ] = React.useState([]);

    React.useEffect(() => {
        
        showPreferencias()
        
    }, [usuario])

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

    const showPreferencias = () => {
        if (usuario.preferencias) {

            if ( usuario.preferencias.dolares ) {
                setpreferenciasDolares(usuario.preferencias.dolares);
            }
            if ( usuario.preferencias.panel_general ) {
                setpreferenciasPanel_general(usuario.preferencias.panel_general);
            }
            if ( usuario.preferencias.monedasDigitales ) {
                setpreferenciasMonedasDigitales(usuario.preferencias.monedasDigitales);
            }
            if ( usuario.preferencias.panel_cedears ) {
                setpreferenciasPanel_cedears(usuario.preferencias.panel_cedears);
            }
            
        }
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

            </Grid>
                
            { !usuario.preferencias || usuario.preferencias === null ? (
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant='body1'>
                            Esta es su sección personalizada. Para modificarla, haga click en <strong className={classes.strongWeigth}>Mi configuración</strong>.
                        </Typography>
                        <Typography variant='body1'>
                            Además, es posible agregar acciones, dolares e incluso monedas digitales en esta sección para visualizarlas de inmediato.
                        </Typography>
                        <Typography variant='body1'>
                            Visitando cada sección, desde el navbar, puede ver un boton en cada elemento para agregarlo como favorito y asi aparece en este sector.
                        </Typography>
                        <Typography variant='body1' gutterBottom>
                            De esta manera puede hacer seguimiento, de las cotizaciones de su interes.
                        </Typography>
                    </Grid> 
                </Grid>

            ) : (
                <div className={classes.wrapperpPreferencias}>
                    <Grid container>
                        { preferenciasDolares.length > 0  ? ( 
                            <Grid item xs={12} sm={5} className={classes.preferenciasItem}>
                                <Typography variant='h4' gutterBottom>
                                    Cotización Dólares
                                </Typography>

                                <Paper>
                                    <SimboloGrafico simbolos={preferenciasDolares} panel="cotizacion_dolares" />
                                </Paper>
                            </Grid>
                        ) : null }

                        { preferenciasMonedasDigitales.length > 0 ? (
                            <Grid item xs={12} sm={5} className={classes.preferenciasItem}>
                                <Typography variant='h4' gutterBottom>
                                    Cotización Monedas Digitales
                                </Typography>
                                <Paper>
                                    <SimboloGrafico simbolos={preferenciasMonedasDigitales} panel="cotizacion_monedas_digitales" />
                                </Paper>
                            </Grid>
                        ) : null }

                        { preferenciasPanel_general.length > 0 ? (
                            <Grid item xs={12} sm={5} className={classes.preferenciasItem}>
                                <Typography variant='h4' gutterBottom>
                                    Acciones Panel General
                                </Typography>
                                <Paper>
                                    <SimboloGrafico simbolos={preferenciasPanel_general} panel="panel_general" />
                                </Paper>
                            </Grid>
                        ) : null }

                        { preferenciasPanel_cedears.length > 0 ? ( 
                            <Grid item xs={12} sm={5} className={classes.preferenciasItem}>
                                <Typography variant='h4' gutterBottom>
                                    Acciones Cedears
                                </Typography>
                                <Paper>
                                    <SimboloGrafico simbolos={preferenciasPanel_cedears} panel="panel_cedears" />
                                </Paper>
                            </Grid>
                        ) : null }
                    </Grid>
                </div>
                )
            }
        </Container>
    </div>
 )

}

export default Homepage;
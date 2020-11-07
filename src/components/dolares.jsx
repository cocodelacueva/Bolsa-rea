import React from 'react';
import { DataContext } from '../context/DataProvider';
import { makeStyles, Container, Typography, List, ListItem, ListItemText, Grid, IconButton } from '@material-ui/core/';
import TurnedIn from '@material-ui/icons/TurnedIn';
import TurnedInNot from '@material-ui/icons/TurnedInNot';

const useStyles = makeStyles((theme) => ({
    wrapperSimbolos : {
    padding: theme.spacing(6),
    },
    strong : {
        fontWeight: 700,
    },
    mr10: {
        marginRight: '1rem'
    }
}));

function Dolares() {
    //estilos
    const classes = useStyles();

    //contexto
    const { usuario, updatePreferenciaUsuario, dolares, obtenerArrayData } = React.useContext(DataContext);

    React.useEffect(() => {
        
        if (dolares==null) {
            obtenerArrayData('cotizacion_dolares', new Date().toJSON().slice(0, 10));
        }
        
    }, [dolares, obtenerArrayData])

    const handleBookMark = (index) => {
        const preferencias = usuario.preferencias ? usuario.preferencias : {};
        const simbolo = dolares.valores[index].slug;

        //busca si existe la preferencia, sino la crea
        if (preferencias['dolares']) {

            //busca si ya esta dentro, si esta la quita
            if ( preferencias['dolares'].includes(simbolo) ) {
                preferencias['dolares'] = preferencias['dolares'].filter(el => el !== simbolo)
            } else {
                preferencias['dolares'] = [...preferencias['dolares'], simbolo] 
            }
            
        } else {
            preferencias['dolares'] = [simbolo]
        } 
        updatePreferenciaUsuario(preferencias);
    }    

    return (
        <div className={classes.wrapperSimbolos}>
            <Container maxWidth="md">
                    <Typography variant="h2" gutterBottom>
                        Cotización del dolar
                    </Typography>

                    {dolares ? ( 'Fecha: ' + dolares.date ) : null}

                    {
                        <List>
                            {dolares ? dolares.valores.map((cotizacion, index) => (
                                <ListItem button key={index}>
                                     <Grid container>
                                        <Grid item xs={12}>
                                        <IconButton className={classes.mr10} aria-label="Bockmark" size="small" onClick={() => {handleBookMark(index)}}>
                                            {usuario.preferencias && usuario.preferencias['dolares'] && usuario.preferencias['dolares'].includes(cotizacion.slug) ? <TurnedIn fontSize="inherit" /> :  
                                            <TurnedInNot fontSize="inherit" />}
                                        </IconButton>
                                            <ListItemText>
                                                <Typography variant="h5" gutterBottom>
                                                    {cotizacion.nombre}:
                                                </Typography>
                                            </ListItemText>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <ListItemText>
                                                <strong className={classes.strong}>Venta:</strong> AR$ {cotizacion.venta}
                                            </ListItemText>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <ListItemText>
                                            <strong className={classes.strong}>Compra:</strong> AR$ {cotizacion.compra}
                                            </ListItemText>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            )) : null}
                        </List>
                       
                    }
            </Container>
        </div>
    )
}

export default Dolares;
import React from 'react';
import { DataContext } from '../context/DataProvider';
import { makeStyles, Container, Typography, List, ListItem, ListItemText, Grid } from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
    wrapperSimbolos : {
    padding: theme.spacing(6),
    },
    strong : {
        fontWeight: 700,
    }
}));

function Dolares() {
    //estilos
    const classes = useStyles();

    //contexto
    const { dolares, obtenerArrayData } = React.useContext(DataContext);

    React.useEffect(() => {
        
        if (dolares==null) {
            obtenerArrayData('cotizacion_dolares', new Date().toJSON().slice(0, 10), 'dolares');
        }
        
    }, [dolares, obtenerArrayData])

    

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
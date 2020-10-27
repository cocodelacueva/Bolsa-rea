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

const MonedasDigitales = () => {
    
    //estilos
    const classes = useStyles();

    //contexto
    const { monedasDigitales } = React.useContext(DataContext);

    //estados
    const [fecha, setFecha] = React.useState(false);
    const [cotizacionesMonedas, setCotizacionesMonedas] = React.useState([]);

    React.useEffect(() => {
        if (monedasDigitales != null) {
            setCotizacionesMonedas(monedasDigitales.valores);
            setFecha(monedasDigitales.date);
        }
        
    }, [monedasDigitales])

    return (
        <div className={classes.wrapperSimbolos}>
            <Container maxWidth="md">
                    <Typography variant="h2" gutterBottom>
                        Monedas digitales
                    </Typography>

                    {fecha ? ( 'Fecha: ' + fecha ) : null}

                    {
                        <List>
                            {cotizacionesMonedas.map((cotizacion) => (
                                <ListItem button key={cotizacion.slug}>
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
                            ))}
                        </List>
                       
                    }
            </Container>
        </div>
    )
}
 
export default MonedasDigitales;
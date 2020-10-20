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
    const { dolares } = React.useContext(DataContext);

    //estados
    const [fecha, setFecha] = React.useState(false);
    const [cotizacionesDolares, setCotizacionesDolares] = React.useState([]);

    React.useEffect(() => {
        if (dolares != null) {
            setCotizacionesDolares(dolares.valores);
            setFecha(dolares.date);
        }
        
    }, [dolares])

    return (
        <div className={classes.wrapperSimbolos}>
            <Container maxWidth="md">
                    <Typography variant="h2" gutterBottom>
                        Cotización del dolar
                    </Typography>

                    {fecha ? ( 'Fecha: ' + fecha ) : null}

                    {
                        <List>
                            {cotizacionesDolares.map((cotizacion) => (
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

export default Dolares;
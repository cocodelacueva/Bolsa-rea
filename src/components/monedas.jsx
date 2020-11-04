import React from 'react';
import { DataContext } from '../context/DataProvider';
import { makeStyles, Container, Typography, List, ListItem, ListItemText, Grid } from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
    wrapperSimbolos : {
    padding: theme.spacing(6),
    },
    strong : {
        fontWeight: 700,
    },
    flexD: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    w33 : {
        width: '32%',
    }

}));

const MonedasDigitales = () => {
    
    //estilos
    const classes = useStyles();

    //contexto
    const { monedasDigitales, obtenerArrayData } = React.useContext(DataContext);

    React.useEffect(() => {
        
        if (monedasDigitales==null) {
            obtenerArrayData('cotizacion_monedas_digitales', new Date().toJSON().slice(0, 10), 'monedas_digitales');
        }
        
    }, [monedasDigitales, obtenerArrayData])


    return (
        <div className={classes.wrapperSimbolos}>
            <Container maxWidth="md">
                <Typography variant="h2" gutterBottom>
                    Monedas digitales
                </Typography>

                {monedasDigitales ? ( 'Fecha: ' + monedasDigitales.date ) : null}

                
                
                    <List className={classes.flexD}>
                        {monedasDigitales ? monedasDigitales.valores.map((cotizacion, index) => (
                            
                            <ListItem className={classes.w33} button key={index}>
                                <ListItemText>
                                    <Typography variant="h5" gutterBottom>
                                        {cotizacion.simbol}:
                                    </Typography>
                                    <strong className={classes.strong}>Valor:</strong> AR$ {cotizacion.valorPesos}
                                </ListItemText>
                            </ListItem>
                        )) : null}
                    </List>
                    
            </Container>
        </div>
    )
}
 
export default MonedasDigitales;
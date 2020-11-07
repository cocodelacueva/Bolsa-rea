import React from 'react';
import { DataContext } from '../context/DataProvider';
import { makeStyles, Container, Typography, List, ListItem, ListItemText, IconButton } from '@material-ui/core/';
import TurnedIn from '@material-ui/icons/TurnedIn';
import TurnedInNot from '@material-ui/icons/TurnedInNot';

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
    },
    mr10: {
        marginRight: '1rem'
    }

}));

const MonedasDigitales = () => {
    
    //estilos
    const classes = useStyles();

    //contexto
    const { usuario, updatePreferenciaUsuario, monedasDigitales, obtenerArrayData } = React.useContext(DataContext);

    React.useEffect(() => {
        
        if (monedasDigitales==null) {
            obtenerArrayData('cotizacion_monedas_digitales', new Date().toJSON().slice(0, 10));
        }
        
    }, [monedasDigitales, obtenerArrayData])


    const handleBookMark = (index) => {
        const preferencias = usuario.preferencias ? usuario.preferencias : {};
        const simbolo = monedasDigitales.valores[index].simbol;

        //busca si existe la preferencia, sino la crea
        if (preferencias['monedasDigitales']) {

            //busca si ya esta dentro, si esta la quita
            if ( preferencias['monedasDigitales'].includes(simbolo) ) {
                preferencias['monedasDigitales'] = preferencias['monedasDigitales'].filter(el => el !== simbolo)
            } else {
                preferencias['monedasDigitales'] = [...preferencias['monedasDigitales'], simbolo] 
            }
            
        } else {
            preferencias['monedasDigitales'] = [simbolo]
        } 
        updatePreferenciaUsuario(preferencias);
    }


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
                                <IconButton className={classes.mr10} aria-label="Bockmark" size="small" onClick={() => {handleBookMark(index)}}>
                                    {usuario.preferencias && usuario.preferencias['monedasDigitales'] && usuario.preferencias['monedasDigitales'].includes(cotizacion.simbol) ? <TurnedIn fontSize="inherit" /> :  
                                    <TurnedInNot fontSize="inherit" />}
                                </IconButton>
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
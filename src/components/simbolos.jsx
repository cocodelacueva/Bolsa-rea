import React from 'react';
import Simbolo from './simbolo-detalle';
import { DataContext } from '../context/DataProvider';
import { makeStyles, ListItemText, ListItem, List, Typography, InputLabel, MenuItem, FormControl, Select, Container, Grid, IconButton } from '@material-ui/core/';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import TurnedIn from '@material-ui/icons/TurnedIn';
import TurnedInNot from '@material-ui/icons/TurnedInNot';

const useStyles = makeStyles((theme) => ({
    wrapperSimbolos : {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
    },
    formControl: {
        display: "block",
        marginBottom: theme.spacing(5),
        minWidth: 160,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    colorGreen : {
        color: 'green',
        fontSize: '1rem',
    },
    colorRed : {
        color: 'red',
        fontSize: '1em',
    },
    svgSize : {
        fontSize: '1rem', 
        marginLeft: '1rem'
    },
    mr10: {
        marginRight: '1rem'
    }
    
  }));
  

function Simbolos() {
    //estilos
    const classes = useStyles();
    //contexto
    const { usuario, updatePreferenciaUsuario, cotizaciones, obtenerArrayData, panelSelec, definePanelAcciones } = React.useContext(DataContext);
    //Estados
    const [simboloElegido, setsimboloElegido] = React.useState(null);
   
    React.useEffect(() => {
        
        if (cotizaciones==null) {
            obtenerArrayData(panelSelec, new Date().toJSON().slice(0, 10), 'cotizaciones');
        }
        
    }, [cotizaciones, obtenerArrayData, panelSelec])


    //funciones
    const handleChange = (event) => {
        const nuevoPanel = event.target.value;
        definePanelAcciones(nuevoPanel);
        obtenerArrayData(nuevoPanel, new Date().toJSON().slice(0, 10), 'cotizaciones');
        setsimboloElegido(null);
    };

    const clickInSymbol = (index) => {
        
        setsimboloElegido(cotizaciones.titulos[index]);

        window.scrollTo(0, 0);
        
    }

    const handleBookMark = (index) => {
        const preferencias = usuario.preferencias ? usuario.preferencias : {};
        const simbolo = cotizaciones.titulos[index].simbolo;

        //busca si existe la preferencia, sino la crea
        if (preferencias[panelSelec]) {

            //busca si ya esta dentro, si esta la quita
            if ( preferencias[panelSelec].includes(simbolo) ) {
                preferencias[panelSelec] = preferencias[panelSelec].filter(el => el !== simbolo)
            } else {
                preferencias[panelSelec] = [...preferencias[panelSelec], simbolo] 
            }
            
        } else {
            preferencias[panelSelec] = [simbolo]
        } 
        updatePreferenciaUsuario(preferencias);
    }

    return (
            <div className={classes.wrapperSimbolos}>
                <Container maxWidth="lg">
                    
                    <Grid container direction="row-reverse">
                        
                        <Grid item xs={12} sm={7}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Paneles</InputLabel>
                                <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={panelSelec}
                                onChange={handleChange}
                                label='Panel'
                                >
                                    <MenuItem value="panel_general">Panel General</MenuItem>
                                    <MenuItem value="panel_cedears">CEDEARs</MenuItem>
                                </Select>
                            </FormControl>

                            {
                                simboloElegido != null ? <Simbolo panel={panelSelec} simbolo={simboloElegido} /> : null
                            }
                        </Grid>

                        <Grid item xs={12} sm={5}>
                            <Typography variant="h2" gutterBottom>
                                {cotizaciones ? cotizaciones.name_panel : null}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {cotizaciones ? ('Fecha: ' + cotizaciones.date) : null}
                            </Typography>
                            
                            <List aria-label="simbolos">
                                {cotizaciones ? cotizaciones.titulos.map((simbolo, index) => (
                                    <ListItem button key={index}>
                                        <IconButton className={classes.mr10} aria-label="Bockmark" size="small" onClick={() => {handleBookMark(index)}}>
                                            {usuario.preferencias && usuario.preferencias[panelSelec] && usuario.preferencias[panelSelec].includes(simbolo.simbolo) ? <TurnedIn fontSize="inherit" /> :  
                                            <TurnedInNot fontSize="inherit" />}
                                        </IconButton>
                                        <ListItemText onClick={() => {clickInSymbol(index)}} className={simbolo.tendencia==='baja' ? classes.colorRed : simbolo.tendencia === 'sube' ? classes.colorGreen : null}>
                                            
                                            {simbolo.simbolo} - AR$ {simbolo.ultimoPrecio}  
                                            { simbolo.tendencia === 'baja' ? <ArrowDownwardIcon className={classes.svgSize} /> : simbolo.tendencia === 'sube' ? <ArrowUpwardIcon className={classes.svgSize} /> : null}
                                        </ListItemText>
                                    </ListItem>
                                )) : null}
                            </List>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        )
}

export default Simbolos;
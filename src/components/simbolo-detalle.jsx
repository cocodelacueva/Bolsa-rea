import React from 'react';
import { makeStyles, Grid, Divider, Typography, Paper } from '@material-ui/core/';
import CheckIcon from '@material-ui/icons/Check';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const useStyles = makeStyles((theme) => ({
    paperWrapper : {
        padding: theme.spacing(2)
    },
    uppercase : {
        textTransform: 'uppercase',
        fontWeight: 700,
    },
    colorGreen : {
        color: 'green',
        fontSize: '1rem',
    },
    colorRed : {
        color: 'red',
        fontSize: '1em',
    },
    marginInTheBottom : {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    svgSize : {
        fontSize: '4rem', 
    }
  }));


function Simbolo(props) {
    const classes = useStyles();

    if ( props.simbolo === null ) {
        return null;
    } 

    const simbolo = props.simbolo;
    
    return (
        <div>
            <Paper className={classes.paperWrapper} elevation={3}>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant="h3" gutterBottom>
                            { simbolo.simbolo }
                        </Typography>

                        <Typography variant="body1">
                            <strong className={classes.uppercase}>Último precio:</strong> { simbolo.ultimoPrecio }
                        </Typography>
                        <Typography variant="body1">
                            <strong className={classes.uppercase}>Último Cierre:</strong> { simbolo.ultimoCierre }
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong className={classes.uppercase}>Apertura:</strong> { simbolo.apertura }
                        </Typography>
                        <Typography variant="h5">
                            <strong className={classes.uppercase}>Rango del día:</strong>
                        </Typography>
                        <Typography variant="body1">
                            Máximo: { simbolo.maximo }
                        </Typography>       
                        <Typography variant="body1">
                            Mínimo: { simbolo.minimo }
                        </Typography>    
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="h5" align="center" gutterBottom>
                            Tendencia:
                        </Typography>
                        <Typography align="center" gutterBottom variant="body1" className={simbolo.tendencia==='baja' ? classes.colorRed : simbolo.tendencia === 'sube' ? classes.colorGreen : null}>
                            { simbolo.tendencia === 'baja' ? <ArrowDownwardIcon className={classes.svgSize} /> : simbolo.tendencia === 'sube' ? <ArrowUpwardIcon className={classes.svgSize} /> : <CheckIcon className={classes.svgSize} />}
                        </Typography>
                        {simbolo.variacionDiaria ? (
                            <>
                            <Divider className={classes.marginInTheBottom} />
                            <Typography variant="body1">
                                <strong className={classes.uppercase}>Variación diaria:</strong> {simbolo.variacionDiaria}
                            </Typography> 
                            </>
                        ) : null }
                        
                    </Grid>
                </Grid>

                <Divider className={classes.marginInTheBottom} />
            
                <Typography variant="body2">
                    Fecha: { simbolo.fechaData.split('T')[0] }
                </Typography>
                <Typography variant="body2">
                    Mercado: { simbolo.mercado }
                </Typography>
                <Typography variant="body2">
                    Moneda: { simbolo.moneda }
                </Typography>
            </Paper>


            {/* <Typography variant="body1">
                Cantidad de Operaciones { simbolo.cantidadOperaciones }
            </Typography>
            <Typography variant="body1">
                Apertura: { simbolo.apertura }
            </Typography>
            <Typography variant="body1">
                Fecha de Vencimiento: { simbolo.fechaVencimiento }
            </Typography>
            <Typography variant="body1">
                Precio Ejercicio: { simbolo.precioEjercicio }
            </Typography>
            <Typography variant="body1">
                Precio Compra: { simbolo.puntas.precioCompra  }
            </Typography>
            <Typography variant="body1">
                Puntas, Cantidad de Compra: { simbolo.puntas.cantidadCompra }
            </Typography>
            <Typography variant="body1">
                Puntas, Cantidad de Ventas: { simbolo.puntas.cantidadVenta }
            </Typography>
            <Typography variant="body1">
                Precio Venta: { simbolo.puntas.precioVenta }
            </Typography>
            <Typography variant="body1">
                Tipo Opción: { simbolo.tipoOpcion }
            </Typography>
            <Typography variant="body1">
                <strong className={classes.uppercase}>Variación Porcentual:</strong> { simbolo.variacionPorcentual }
            </Typography>
            <Typography variant="body1">
                Volumen: { simbolo.volumen }
            </Typography> */}
        </div>
    )
}

export default Simbolo;
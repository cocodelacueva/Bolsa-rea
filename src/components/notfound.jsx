import React from 'react';
import { makeStyles, Container, Button, Typography } from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
    wrapperSimbolos : {
    padding: theme.spacing(6),
    },
}));

function NotFound() {
    //estilos
    const classes = useStyles();

    return (
        <div className={classes.wrapperSimbolos}>
             <Container maxWidth="lg">
                    <Typography variant="h3" gutterBottom>
                        Contenido no encontrado
                    </Typography>

                    <Button href="/" variant="contained" color="primary" size="small">Volver al inicio</Button>
            </Container>
        </div>
    )
}

export default NotFound;
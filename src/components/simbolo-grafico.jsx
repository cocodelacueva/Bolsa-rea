import React from 'react';
import { DataContext } from '../context/DataProvider';
import { Line } from 'react-chartjs-2';
import { Button } from '@material-ui/core/';

const SimboloGrafico = (props) => {
    
    //contexto
    const { fetchData } = React.useContext(DataContext);
    
    //estados
    const [dataGrafico, setdataGrafico] = React.useState({});
    const [porcentajeValoresGrafico, setporcentajeValoresGrafico] = React.useState(true);
    
    React.useEffect(() => {
        
        initGrafico(porcentajeValoresGrafico);

    }, [])

    const coloresGrafico = [
        '#4bc0c0',
        '#f50057',
        '#303f9f',
        '#449c51',
        '#333333',
        '#e07107',
        '#cde007',
        '#9b3dbd',
        '#b2bd3d',
        '#3f51b5',
    ]

    const changeValoresGrafico = () => {
        initGrafico(!porcentajeValoresGrafico);

        setporcentajeValoresGrafico(!porcentajeValoresGrafico);

    }

    const initGrafico = async (mostrarPorcentajes=false) => {
        
        const datosGrafico = await makeDataGrafico(props.simbolos, props.panel);

        let data = {}
        data.labels = datosGrafico.labels.reverse();
        data.datasets = [];
        
        const valores = datosGrafico.valores.reverse();

        //crea los datasets correspondientes
        for (let i = 0; i < valores[0].length; i++) {
            let nombre = '';

            if ( props.panel === 'panel_general' || props.panel === 'panel_cedears' ) {
                nombre = valores[0][i].simbolo;
            } else if ( props.panel === 'cotizacion_dolares' ) {
                nombre = valores[0][i].nombre;
            } else {
                nombre = valores[0][i].simbol;
            }

            let valor = {
                label:nombre,
                fill: false,
                lineTension: 0.1,
                backgroundColor: (coloresGrafico[i]) ? coloresGrafico[i] : '#000',
                borderColor: (coloresGrafico[i]) ? coloresGrafico[i] : '#000',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: (coloresGrafico[i]) ? coloresGrafico[i] : '#000',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: (coloresGrafico[i]) ? coloresGrafico[i] : '#000',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: []
            }

            data.datasets.push(valor);
            
        }

        //finalmente agrega los valores
        for (let v = 0; v < valores.length; v++) {
            for (let index = 0; index < valores[v].length; index++) {
                
                if ( props.panel === 'panel_general' || props.panel === 'panel_cedears' ) {
                    if(mostrarPorcentajes) {
                        data.datasets[index].data.push(getValorPorcentaje(valores[v][index].ultimoCierre, valores[0][index].ultimoCierre));
                    } else {
                        data.datasets[index].data.push(valores[v][index].ultimoCierre);
                    }
                } else if ( props.panel === 'cotizacion_dolares' ) {
                    if(mostrarPorcentajes) {
                        data.datasets[index].data.push(getValorPorcentaje(valores[v][index].venta, valores[0][index].venta));
                    } else {
                        data.datasets[index].data.push(valores[v][index].venta);
                    }

                } else {
                    if(mostrarPorcentajes) {
                        data.datasets[index].data.push(getValorPorcentaje(valores[v][index].valorPesos, valores[0][index].valorPesos));
                    } else {
                        data.datasets[index].data.push(valores[v][index].valorPesos);
                    }
                }

            }
        }

        setdataGrafico(data)
    }


    const getValorPorcentaje = (valor, valorReferencia) => {
       
        return (parseFloat(valor) * 100 ) / parseFloat(valorReferencia);
    }


    //busca los datos en el local host o si es necesario hace un push a la bd
    const makeDataGrafico = async (items, tipo, daysbefore=31) => {
        let datosNull = 0;//cuenta cuantas veces devuelve null el fetch, si recibe mas de 4 veces null, no vale la pena seguir con la funcion, significa que no hay mas data
        let data = {}
        data.labels = []
        data.valores = []

        if ( typeof items !== 'object') {
            items = items.split(',');
        }
        
        //define fecha actual
        const ultimaFecha = new Date().toJSON().slice(0, 10);
        

        //hace un loop de fechas hacia atras, les va resztando dias hasta que llega a 5 null seguidos y se detiene
        //si encuentra 5 nulls significa que ya no hay mas datos que mostrar
        for (let i = 0; i < daysbefore; i++) {
          
            const fechaBase = new Date(ultimaFecha);
            const milisegundos = 1000*60*60*24*i;
            const fechaloop = fechaBase.getTime() - milisegundos;

            let datos = localStorage.getItem(tipo+"_"+(new Date(fechaloop).toJSON().slice(0, 10)));

            if ( datos ) {
                datos = JSON.parse(datos);
                datos = datos.value;

                data.labels.push( new Date(fechaloop).toJSON().slice(0, 10) );
                
                //filtra los datos que necesitamos
                if ( tipo === 'panel_general' || tipo === 'panel_cedears' ) {
                    const datoAObtener = datos.titulos.filter(
                        function(e) {
                            return this.indexOf(e.simbolo) >= 0;
                          },
                          items
                    );

                    data.valores.push(datoAObtener);

                } else if ( tipo === 'cotizacion_dolares' ) {
                    
                    const datoAObtener = datos.valores.filter(
                        function(e) {
                            return this.indexOf(e.slug) >= 0;
                          },
                          items
                    );

                    data.valores.push(datoAObtener);
                } else {
                    const datoAObtener = datos.valores.filter(
                        function(e) {
                            return this.indexOf(e.simbol) >= 0;
                          },
                          items
                    );
                    data.valores.push(datoAObtener);
                }
                
            } else {
                const dataDB = await fetchData(false, tipo, ["date", "==", new Date(fechaloop).toJSON().slice(0, 10)]);
                
                //si devuelve data guardamos en localhost y devolvemos
                if (dataDB) {
                    //guardamos en localhost siempre con la fecha del registro de firebase
                    const itemtosave = {
                        value:  dataDB[0]
                    }
                    //guardamos en local store para que quede el registro
                    localStorage.setItem(tipo+"_"+(new Date(fechaloop).toJSON().slice(0, 10)), JSON.stringify(itemtosave));

                    //completamos la info para el grafico
                    data.labels.push( new Date(fechaloop).toJSON().slice(0, 10) );
                
                    //filtra los datos que necesitamos
                    if ( tipo === 'panel_general' || tipo === 'panel_cedears' ) {
                        const datoAObtener = dataDB[0].titulos.filter(
                            function(e) {
                                return this.indexOf(e.simbolo) >= 0;
                            },
                            items
                        );

                        data.valores.push(datoAObtener);

                    } else if ( tipo === 'cotizacion_dolares' ) {
                        
                        const datoAObtener = dataDB[0].valores.filter(
                            function(e) {
                                return this.indexOf(e.slug) >= 0;
                            },
                            items
                        );

                        data.valores.push(datoAObtener);
                    } else {
                        const datoAObtener = dataDB[0].valores.filter(
                            function(e) {
                                return this.indexOf(e.simbol) >= 0;
                            },
                            items
                        );
                        data.valores.push(datoAObtener);
                    }


                } else {
                    //si devuelve null sumamos un null y luego chequeamos, si son mas de 4 nulls rompemos el for
                    datosNull++;

                    if (datosNull > 5) {
                        break;
                    }
                }
            }
        }

        return data;

    }


    return (
        
         dataGrafico!=null ? (
            <div>        
                <Line data={dataGrafico} />
                <Button size="small" onClick={changeValoresGrafico} variant="outlined">
                    Mostrar {porcentajeValoresGrafico ? 'Valores' : 'Porcentajes'}
                </Button>
            </div>
        ) : null 
        
    );
};

export default SimboloGrafico;
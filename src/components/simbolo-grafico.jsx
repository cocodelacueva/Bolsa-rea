import React from 'react';
import { DataContext } from '../context/DataProvider';
import { Line } from 'react-chartjs-2';

const SimboloGrafico = (props) => {
    
    //contexto
    const { fetchData } = React.useContext(DataContext);

    const [dataGrafico, setdataGrafico] = React.useState({});
    React.useEffect(() => {
        
        initGrafico();

    }, [])


    const initGrafico = async () => {
        const datosGrafico = await makeDataGrafico(props.simbolo, props.panel);
        
        const data = {
            labels: datosGrafico.labels.reverse(),
            datasets: [
                {
                    label: props.simbolo.simbolo,
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: datosGrafico.valores.reverse()
                }
            ]
          };

          setdataGrafico(data)
    }


    //busca los datos en el local host o si es necesario hace un push a la bd
    const makeDataGrafico = async (item, tipo, daysbefore=31) => {
        let datosNull = 0;//cuenta cuantas veces devuelve null el fetch, si recibe mas de 4 veces null, no vale la pena seguir con la funcion, significa que no hay mas data
        let data = {}
        data.labels = []
        data.valores = []

        //define fecha actual
        const ultimaFecha = new Date(item.fechaData);
        for (let i = 0; i < daysbefore; i++) {
          
            const fechaBase = ultimaFecha
            const milisegundos = 1000*60*60*24*i;
            const fechaloop = fechaBase.getTime() - milisegundos;

            let datos = localStorage.getItem(tipo+"_"+(new Date(fechaloop).toJSON().slice(0, 10)));

            if ( datos ) {
                datos = JSON.parse(datos);
                datos = datos.value;
                
                const datoAObtener = datos.titulos.filter(titulo => titulo.simbolo === item.simbolo);
                
                data.labels.push(new Date(datoAObtener[0].fechaData).toJSON().slice(0, 10));
                data.valores.push(datoAObtener[0].ultimoCierre);
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
                    const datoAObtener = dataDB[0].titulos.filter(titulo => titulo.simbolo === item.simbolo);
                    
                    data.labels.push(new Date(datoAObtener[0].fechaData).toJSON().slice(0, 10))
                    data.valores.push(datoAObtener[0].ultimoCierre)

                } else {
                    //si devuelve null sumamos un null y luego chequeamos, si son mas de 4 nulls rompemos el for
                    datosNull++;

                    if (datosNull > 4) {
                        break;
                    }
                }
            }
        }

        return data;

    }

    return (
        <div>
            { dataGrafico!=null ? <Line data={dataGrafico} /> : null } 
        </div>
    );
};

export default SimboloGrafico;
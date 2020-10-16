import React from 'react';
import { Line } from 'react-chartjs-2';

const SimboloGrafico = (props) => {
    console.log(props.simbolo)

    const [dataGrafico, setdataGrafico] = React.useState({});
    React.useEffect(() => {
        //data set mentiroso
        const data = {
            labels: ['10-10-2020', '11-10-2020', '12-10-2020', '13-10-2020', '14-10-2020', '15-10-2020', '16-10-2020'],
            datasets: [
                {
                    label: props.simbolo,
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
                    data: ['54', '54.15', '54.150', '54.201', '54.200', '56', '54.300']
                }
            ]
          };
        setdataGrafico(data)
    }, [])



    return (
        <div>
            { dataGrafico!=null ? <Line data={dataGrafico} /> : null } 
        </div>
    );
};

export default SimboloGrafico;
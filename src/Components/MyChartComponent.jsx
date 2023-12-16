import React, { useEffect, useRef, useContext } from 'react';
import ApexCharts from 'apexcharts';
import AuthContext from '../Context/AuthContext';

const MyChartComponent = (props) => {
  const state = useContext(AuthContext);
  const stats = state.StatsApi;
  const chartRef = useRef(null);

  useEffect(() => {
    console.log('stats:', stats);
    console.log('option:', props.option);

    const defaultOptions = {
      chart: {
        height: 280,
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      series: [
        {
          color: '#AED67D',
          name: 'count 1',
          data: stats ? stats.map((item) => ({ x: item.month, y: item.count })) : [],
        },
      ],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100],
        },
      },
      xaxis: {
        categories: [
          ' Jan',
          ' Fév',
          ' Mars',
          'Avril',
          'Mai',
          'Juin',
          'Juillet',
          'Aout',
          'Sept',
          'Oct',
          'Nov',
          'Déc',
        ],
      },
    };

    const options = props.option ? { ...defaultOptions, ...props.option } : defaultOptions;

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [props.option, stats]);

  return <div id="chart" ref={chartRef}></div>;
};

export default MyChartComponent;


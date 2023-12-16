import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const MyChartComponent2 = () => {

    


    const chartRef = useRef(null);

    useEffect(() => {
      const options = {
        chart: {
          type: 'bar',
          height: 280
          
        },
        series: [
          {
            color:'#AED67D',
            name: 'sales',
            data: [30, 40, 45, 50, 49, 60, 70, 91, 125],
          },
        ],
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
        },
      };
  
      const chart = new ApexCharts(chartRef.current, options);
      chart.render();
  
      return () => {
        chart.destroy();
      };
    }, []);

  return <div id="chart" ref={chartRef}></div>;
     
};

export default MyChartComponent2;

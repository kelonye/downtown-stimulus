import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Chart from 'chart.js';

const useStyles = makeStyles({
  root: {
    padding: '50px 20px',
  },
});

function Component({ x, totalDonations, totalMatchedDonations }) {
  const classes = useStyles();
  const chartRef = React.useRef();

  React.useEffect(() => {
    const chart = new Chart(chartRef.current.getContext('2d'), {
      type: 'bar',
      data: {
        labels: 'Business',
        datasets: [
          {
            label: 'Actual',
            data: totalDonations,
            backgroundColor: '#fff',
            borderColor: '#fff',
            fill: false,
          },
          {
            label: 'Matched',
            data: totalMatchedDonations,
            backgroundColor: '#fc0',
            borderColor: '#fff',
            fill: false,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          // display: false,
          labels: {
            fontColor: '#ddd',
          },
          onClick(e) {
            e.stopPropagation();
          },
        },
        scales: {
          xAxes: [{ gridLines: {}, ticks: { fontColor: '#fff' } }],
          yAxes: [{ gridLines: {}, ticks: { fontColor: '#fff' } }],
        },
      },
    });
    chart.canvas.parentNode.style.height = '450px';
    // }, [chartRef]); // eslint-disable-line react-hooks/exhaustive-deps
    //
    // React.useEffect(() => {
    chart.data.labels = x;
    chart.data.datasets[0].data = totalDonations;
    chart.data.datasets[1].data = totalMatchedDonations;
    chart.update();
  }, [totalDonations, totalMatchedDonations]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Paper className={classes.root}>
      <canvas ref={chartRef}></canvas>
    </Paper>
  );
}

export default connect((state, { businesses }) => {
  return {
    x: businesses.map(b => b.name),
    totalDonations: businesses.map(b => b.totalDonations / 10 ** 24),
    totalMatchedDonations: businesses.map(
      b => b.totalMatchedDonations / 10 ** 24
    ),
  };
}, mapDispatchToProps)(Component);

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

function Component({ x, y }) {
  const classes = useStyles();
  const chartRef = React.useRef();

  React.useEffect(() => {
    const chart = new Chart(chartRef.current.getContext('2d'), {
      type: 'bar',
      data: {
        labels: 'Business',
        datasets: [
          {
            label: 'CLR Match',
            data: y,
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
    chart.data.datasets[0].data = y;
    chart.update();
  }, [x, y]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Paper className={classes.root}>
      <canvas ref={chartRef}></canvas>
    </Paper>
  );
}

export default connect(
  ({ data: { businesses, donations } }) => ({
    x: businesses.map(b => b.name),
    y: donations,
  }),
  mapDispatchToProps
)(Component);

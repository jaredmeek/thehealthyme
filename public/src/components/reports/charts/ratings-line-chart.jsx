import React, { Component } from 'react';
import Chart from 'chart.js';
import moment from 'moment';
const debug = process.env.DEBUG || false;
Chart.defaults.global.defaultFontSize = 12;

const fieldMap = {
  physicalScore: {legend: 'Physical'},
  emotionalScore: {legend: 'Emotional'},
  sleepQuality: {legend: 'Sleep'},
  exerciseIntensity: {legend: 'Exercise'},
};

export default class RatingsLineChart extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.chart = new Chart(this.props.id, {
      type: 'line',
      data: {
        datasets: this.props.data,
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: true,
          position: 'bottom',
        },
        scales: {
          yAxes: [{
            gridLines: {
              display: false,
            },
            scaleLabel: {
              display: true,
              labelString: 'Rating',
            },
            ticks: {
              beginAtZero: true,
              max: 5,
            },
          }],
          xAxes: [{
            gridLines: {
              display: false,
            },
            type: 'time',
            time: {
              min: moment().startOf('week'),
              max: moment().endOf('week'),
              unit: 'day',
              unitStepSize: 1,
              tooltipFormat: 'ddd',
              displayFormats: {
                day: 'dd',
              },
            },
            position: 'bottom'
          }]
        }
      }
    });
  }

  componentWillReceiveProps (props) {
    if (debug) { console.log('Ratings-Line-Chart will rec: ', props.data); }
    this.chart.data.datasets = props.data;
    this.chart.update();
  }

  render() {
    if (debug) { console.log('Line chart is rendering.'); }
    return <canvas id={this.props.id}></canvas>;
  }
}

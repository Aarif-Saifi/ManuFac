import React from 'react';

class WineStats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wineData: props.wineData,
    };
  }

  calculateMean = (data, attribute) => {
    const values = data.map(entry => parseFloat(entry[attribute]));
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / data.length;
  };

  calculateStandardDeviation = (data, attribute) => {
    const mean = this.calculateMean(data, attribute);
    const squaredDifferences = data.map(entry => Math.pow(parseFloat(entry[attribute]) - mean, 2));
    const sumSquaredDiff = squaredDifferences.reduce((acc, val) => acc + val, 0);
    const variance = sumSquaredDiff / data.length;
    return Math.sqrt(variance);
  };

  render() {  
    const { wineData } = this.state;
    const totalPhenolsMean = this.calculateMean(wineData, 'Total phenols');
    const totalPhenolsStdDev = this.calculateStandardDeviation(wineData, 'Total phenols');

    return (
      <div>
        <h2>Statistical Measures for Wine Dataset</h2>
        <p>Mean Total Phenols: {totalPhenolsMean.toFixed(2)}</p>
        <p>Standard Deviation Total Phenols: {totalPhenolsStdDev.toFixed(2)}</p>
      </div>
    );
  }
}

export default WineStats;
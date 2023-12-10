import React from 'react';

class WineDataGamma extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wineData: props.wineData,
    };
  }
  
  calculateGamma = (row) => {
    const { Ash, Hue, Magnesium } = row;
    return parseFloat((Ash * Hue) / Magnesium).toFixed(2);
  };

  calculateClassWiseStats = (property) => {
    const classWiseData = {};
    this.state.wineData.forEach((row) => {
      const className = `Class ${row.Alcohol}`;
      const value = parseFloat(this.calculateGamma(row));

      if (!classWiseData[className]) {
        classWiseData[className] = [value];
      } else {
        classWiseData[className].push(value);
      }
    });

    const result = {};
    for (const className in classWiseData) {
      result[className] = {
        Mean: parseFloat(this.calculateMean(classWiseData[className])).toFixed(2),
        Median: parseFloat(this.calculateMedian(classWiseData[className])).toFixed(2),
        Mode: this.calculateMode(classWiseData[className]),
      };
    }

    return result;
  };

  calculateMean = (data) => {
    const sum = data.reduce((acc, value) => acc + value, 0);
    return sum / data.length;
  };

  calculateMedian = (data) => {
    const sortedData = data.slice().sort((a, b) => a - b);
    const middle = Math.floor(sortedData.length / 2);

    if (sortedData.length % 2 === 0) {
      return (sortedData[middle - 1] + sortedData[middle]) / 2;
    } else {
      return sortedData[middle];
    }
  };

  calculateMode = (data) => {
    const frequencyMap = {};
    let maxFrequency = 0;
    let mode = [];

    data.forEach((value) => {
      frequencyMap[value] = (frequencyMap[value] || 0) + 1;
      if (frequencyMap[value] > maxFrequency) {
        maxFrequency = frequencyMap[value];
        mode = [value];
      } else if (frequencyMap[value] === maxFrequency) {
        mode.push(value);
      }
    });

    return mode.length === data.length ? 'No mode' : mode.join(', ');
  };

  render() {
    const gammaStats = this.calculateClassWiseStats('Gamma');

    return (
      <div>
        <h2>Gamma Data Table</h2>
        <table>
          <thead>
            <tr>
              <th>Measure</th>
              {Object.keys(gammaStats).map((className) => (
                <th key={className}>{className}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gamma Mean</td>
              {Object.keys(gammaStats).map((className) => (
                <td key={className}>{gammaStats[className].Mean}</td>
              ))}
            </tr>
            <tr>
              <td>Gamma Median</td>
              {Object.keys(gammaStats).map((className) => (
                <td key={className}>{gammaStats[className].Median}</td>
              ))}
            </tr>
            <tr>
              <td>Gamma Mode</td>
              {Object.keys(gammaStats).map((className) => (
                <td key={className}>{gammaStats[className].Mode}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default WineDataGamma;

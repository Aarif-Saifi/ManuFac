import React from 'react';
class WineStatistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wineData: props.wineData,
    };
  }

  calculateClassWiseStats = (property) => {
    const classWiseData = {};
    this.state.wineData.forEach((row) => {
      const className = `Class ${row.Alcohol}`;
      const value = parseFloat(row[property]);

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
    const flavanoidsStats = this.calculateClassWiseStats('Flavanoids');

    return (
      <div>
        <h2>Flavanoids Data Table</h2>
        <table>
          <thead>
            <tr>
              <th>Measure</th>
              {Object.keys(flavanoidsStats).map((className) => (
                <th key={className}>{className}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Flavanoids Mean</td>
              {Object.keys(flavanoidsStats).map((className) => (
                <td key={className}>{flavanoidsStats[className].Mean}</td>
              ))}
            </tr>
            <tr>
              <td>Flavanoids Median</td>
              {Object.keys(flavanoidsStats).map((className) => (
                <td key={className}>{flavanoidsStats[className].Median}</td>
              ))}
            </tr>
            <tr>
              <td>Flavanoids Mode</td>
              {Object.keys(flavanoidsStats).map((className) => (
                <td key={className}>{flavanoidsStats[className].Mode}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default WineStatistics;
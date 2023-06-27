const faker = require('faker');
const fs = require('fs');

// Generate a random timestamp between a start and end date
function generateRandomTimestamp(start, end) {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const randomTime = Math.random() * (endTime - startTime) + startTime;
  return new Date(randomTime).toISOString();
}

// Generate a random timeseries data point
function generateTimeseriesData() {
  const temperature = faker.random.number({ min: 20, max: 30, precision: 0.1 });
  const humidity = faker.random.number({ min: 40, max: 60, precision: 0.1 });
  const pressure = faker.random.number({ min: 1000, max: 1100, precision: 0.1 });

  return {
    timestamp: generateRandomTimestamp(new Date('2023-01-01'), new Date('2023-12-31')),
    data: {
      temperature,
      humidity,
      pressure,
    },
  };
}

// Generate a specified number of timeseries data points
function generateTestData(numDataPoints) {
  const testData = [];

  for (let i = 0; i < numDataPoints; i++) {
    const dataPoint = generateTimeseriesData();
    testData.push(dataPoint);
  }

  return testData;
}

// Generate test data with 1000 data points
const testData = generateTestData(1000);

// Write test data to a JSON file
fs.writeFileSync('testData.json', JSON.stringify(testData, null, 2));

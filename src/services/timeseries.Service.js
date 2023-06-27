const Timeseries = require("../models/timeseries.Model")

exports.createTimeseries = async (timestamp, data) => {
  const timeseries = new Timeseries({ timestamp, data });
  await timeseries.save();
};

exports.getAllTimeseries = async (startTime, endTime) => {
  let query = {};
  
  if (startTime && endTime) {
    query = { timestamp: { $gte: startTime, $lte: endTime } };
  }

  const projection = { _id: 0, timestamp: 1, data: 1 };
  
  // Utilize indexes for faster querying
  const timeseriesData = await Timeseries.find(query, projection)
    .sort({ timestamp: 1 })
    .lean();

  return timeseriesData;
};
// exports.getAllTimeseries = async (startTime, endTime) => {
//   const query = { timestamp: { $gte: startTime, $lte: endTime } };
//   const projection = { _id: 0, timestamp: 1, data: 1 };

//   // Utilize indexes for faster querying
//   const timeseriesData = await Timeseries.find(query, projection)
//     .sort({ timestamp: 1 })
//     .lean();

//   return timeseriesData;
// };
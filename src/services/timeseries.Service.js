const Timeseries = require("../models/timeseries.Model")

exports.createTimeseries = async (bulkData) => {
  return await Timeseries.insertMany(bulkData)
};

exports.getAllTimeseries = async (startTime, endTime, pageSize, page) => {
  let query = {};
  
  if (startTime && endTime) {
    query = { timestamp: { $gte: startTime, $lte: endTime } };
  }

  const projection = { _id: 0, timestamp: 1, value: 1 };
  const skip = (page - 1) * pageSize;
  
  const [timeseriesData, totalDocuments] = await Promise.all([
    Timeseries.find(query, projection)
      .sort({ timestamp: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean()
      .exec(),
    Timeseries.countDocuments(query)
  ]);

  const totalPages = Math.ceil(totalDocuments / pageSize);

  return { timeseriesData, totalDocuments, totalPages };
};


const timeseriesService = require('../services/timeseries.Service');

exports.createTimeseries = async (req, res, next) => {
  try {
    await timeseriesService.createTimeseries(req.body);
    res.status(201).json({ Message: "Timeseries Data Inserted", Success: true });
  } catch (error) {
    next(new CustomError("Error creating timeseries", 500));
  }
};

exports.getAllTimeseries = async (req, res, next) => {
  try {
    let startTime = req.query.startTime;
    let endTime = req.query.endTime;
    let pageSize = parseInt(req.query.pageSize) || 1000; 
    let page = parseInt(req.query.page) || 1; 
  
    startTime = startTime || null;
    endTime = endTime || null;
  
    const { timeseriesData, totalDocuments, totalPages } = await timeseriesService.getAllTimeseries(startTime, endTime, pageSize, page);
  
    res.json({
      data: timeseriesData,
      totalDocuments: totalDocuments,
      totalPages: totalPages
    });
  } catch (error) {
    next(error);
  }
};

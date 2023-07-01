const timeseriesService = require('../services/timeseries.Service');

exports.createTimeseries = async (req, res) => {
  try {
    // const { timestamp, data } = req.body;
    await timeseriesService.createTimeseries(req.body);
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.getAllTimeseries = async (req, res) => {
  try {
    let startTime = req.query.startTime;
    let endTime = req.query.endTime;
    let pageSize = parseInt(req.query.pageSize) || 1000; // Set a default page size of 1000 if not provided
    let page = parseInt(req.query.page) || 1; // Set a default page number of 1 if not provided
  
    // If startTime or endTime is not provided, set them to null
    startTime = startTime || null;
    endTime = endTime || null;
  
    const { timeseriesData, totalDocuments, totalPages } = await timeseriesService.getAllTimeseries(startTime, endTime, pageSize, page);
  
    res.json({
      data: timeseriesData,
      totalDocuments: totalDocuments,
      totalPages: totalPages
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// exports.getAllTimeseries = async (req, res) => {
//     try {
//       const startTime = req.query.startTime;
//       const endTime = req.query.endTime;
  
//       const timeseriesData = await timeseriesService.getAllTimeseries(startTime, endTime);
  
//       res.json(timeseriesData);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   };
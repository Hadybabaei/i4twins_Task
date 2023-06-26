const timeseriesService = require('../services/timeseries.Service');

exports.createTimeseries = async (req, res) => {
  try {
    const { timestamp, data } = req.body;
    await timeseriesService.createTimeseries(timestamp, data);
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.getAllTimeseries = async (req, res) => {
  try {
    const timeseriesData = await timeseriesService.getAllTimeseries();
    res.json(timeseriesData);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
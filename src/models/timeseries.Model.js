const mongoose = require('mongoose');

const timeseriesSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true, index: true },
  sensorId: { type: String, required: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
});

timeseriesSchema.index({ timestamp: 1,sensorId:1 });

const Timeseries = mongoose.model('Timeseries', timeseriesSchema);

module.exports = Timeseries;

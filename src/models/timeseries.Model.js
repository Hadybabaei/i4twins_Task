const mongoose = require('mongoose');

const timeseriesSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true,
    index: true,
  },
  data: mongoose.Schema.Types.Mixed,
});

const Timeseries = mongoose.model('Timeseries', timeseriesSchema);

module.exports = Timeseries;
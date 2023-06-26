const router = require("express").Router();
const timeseriesController = require('../../controllers/timeseries.Controller');

router.post('/timeseries', timeseriesController.createTimeseries);
router.get('/timeseries',timeseriesController.getAllTimeseries );

module.exports = router;
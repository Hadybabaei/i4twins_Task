const router = require("express").Router();
const timeseriesRouter = require("./v1/timeseries.Router");

router.use("/v1",timeseriesRouter);

module.exports = router;
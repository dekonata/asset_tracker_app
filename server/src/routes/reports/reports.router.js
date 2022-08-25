const express = require('express');


const {
	getAssetLocationsReportStream,
	httpGetLocationAssetsReport
} = require('./reports.controller.js');

const reportsRouter = express.Router()

reportsRouter.get('/locationreport', httpGetLocationAssetsReport);

module.exports = reportsRouter;
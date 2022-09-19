const express = require('express');

const {
	httpAddLocation,
	httpGetIdSuggestList,
	httpGetAllLocationsList,
	httpGetLocationSuggestlists,
	httpGetOneLocation,
} = require('./locations.controller.js');

const locationsRouter = express.Router();

locationsRouter.post('/add', httpAddLocation);
locationsRouter.get('/typeids/:loctype', httpGetIdSuggestList);
locationsRouter.get('/all', httpGetAllLocationsList);
locationsRouter.get('/locationslists', httpGetLocationSuggestlists);
locationsRouter.get('/location/:locationsid', httpGetOneLocation);

module.exports = locationsRouter;
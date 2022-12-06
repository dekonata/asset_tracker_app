const express = require('express');

const {
    httpAddAssetType,
    httpGetAssettypeFields,
} = require ('./assettypes.controller.js');

const assettypesRouter = express.Router();

assettypesRouter.post('/add', httpAddAssetType);
assettypesRouter.get('/fields/:assettype', httpGetAssettypeFields);

module.exports = assettypesRouter;
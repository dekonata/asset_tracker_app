const express = require('express');

const {
    httpAddAssetType,
    httpGetAllAssetTypes,
    httpGetAssettypeFields,
    httpGetTypeAssets,
    httpGetTypeSuggestLists,
} = require ('./assettypes.controller.js');

const assettypesRouter = express.Router();

assettypesRouter.post('/add', httpAddAssetType);
assettypesRouter.get('/all', httpGetAllAssetTypes);
assettypesRouter.get('/fields/:assettype', httpGetAssettypeFields);
assettypesRouter.get('/assets/:assettype', httpGetTypeAssets );
assettypesRouter.get('/suggestlists/:assettype', httpGetTypeSuggestLists);


module.exports = assettypesRouter;
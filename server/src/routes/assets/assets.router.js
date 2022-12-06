const express = require('express');

const { 
	httpGetAssetFields,
	httpGetAllAssets, 
	httpGetAllTypeAssets,
	httpGetOneAsset,
	httpAddAsset,
	httpGetAssetLists,
	httpAddMultipleAssets,
	httpEditAsset,
	httpAddAssetNote,
	httpEditAssetNote,
	httpGetAssetNotes,
	httpDelAssetNote,
		} = require('./assets.controller');

const assetsRouter = express.Router();

assetsRouter.get('/fields', httpGetAssetFields);
assetsRouter.get('/all', httpGetAllAssets);
assetsRouter.get('/alltype/:asset_type', httpGetAllTypeAssets);
assetsRouter.get('/asset/:serialnumber', httpGetOneAsset);
assetsRouter.get('/assetlists', httpGetAssetLists);
assetsRouter.post('/add', httpAddAsset);
assetsRouter.post('/addmultiple', httpAddMultipleAssets);
assetsRouter.post('/addnote', httpAddAssetNote);
assetsRouter.put('/edit', httpEditAsset);
assetsRouter.put('/editnote', httpEditAssetNote);
assetsRouter.get('/notes/:asset_id', httpGetAssetNotes);
assetsRouter.delete('/delnote/:note_id', httpDelAssetNote);

module.exports = assetsRouter;
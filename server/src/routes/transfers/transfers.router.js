const express = require('express');

const {
	httpGetAssetTransfers,
	httpAddAssetTransfer,
	httpDeleteTransfer
} = require('./transfers.controller');

const transfersRouter = express.Router();

transfersRouter.get('/asset/:serialnumber', httpGetAssetTransfers);
transfersRouter.post('/add', httpAddAssetTransfer);
transfersRouter.delete('/deltransfer/:transfer_id', httpDeleteTransfer);


module.exports = transfersRouter;
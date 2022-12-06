const {
    addAssetType,
    getAllAssetTypes,
	getAssetTypeFields,
} = require('../../models/assettypes.model.js');

async function httpAddAssetType(req, res) {
	const asset_type_data = req.body;
	try {
		const query = await addAssetType(asset_type_data);
		return res.status(201).json(query);
	} catch(err) {
		console.log(err);
		return res.status(400).json(err);
	}
}

async function httpGetAssettypeFields(req, res) {
	const {assettype} = req.params.assettype;
	try {
		const query = await 	getAssetTypeFields(assettype);
		return res.status(201).json(query);
	} catch(err) {
		console.log(err);
		return res.status(400).json(err);
	}
}

module.exports = {
    httpAddAssetType,
	httpGetAssettypeFields,	
};
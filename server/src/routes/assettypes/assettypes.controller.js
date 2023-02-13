const {
    addAssetType,
    getAllAssetTypes,
	getAssetTypeFields,
	getTypeAssets,
	getTypeSuggestLists,
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

async function httpGetAllAssetTypes(req, res) {
	try {
		const query = await getAllAssetTypes();
		return res.status(200).json(query);
	} catch(err) {
		return res.status(400).json(err.message)
	}
}

async function httpGetAssettypeFields(req, res) {
	console.log(req.params)
	const {assettype} = req.params;
	try {
		const query = await getAssetTypeFields(assettype);
		return res.status(200).json(query);
	} catch(err) {
		console.log(err)
		return res.status(400).json(err.message);
	}
}

async function httpGetTypeAssets(req, res) {
	const {assettype} = req.params;
	try {
		const query = await getTypeAssets(assettype);
		return res.status(200).json(query);
	} catch(err) {
		return res.status(400).json(err.message);
	}
}

async function httpGetTypeSuggestLists(req, res) {
	const {assettype} = req.params;
	try {
		const query = await getTypeSuggestLists(assettype);
		return res.status(200).json(query);
	} catch(err) {
		return res.status(400).json(err.message);
	}
}

module.exports = {
    httpAddAssetType,
	httpGetAllAssetTypes,
	httpGetAssettypeFields,	
	httpGetTypeAssets,
	httpGetTypeSuggestLists,
};
const fs = require('fs');
const path = require('path')
const { stringify } = require('csv-stringify')
const { pipeline } = require('stream/promises')



const {
	getAssetLocationsReportStream,
	getLocationAssetsReportStream
} = require('../../models/reports.model.js');

async function httpGetLocationAssetsReport(req, res) {
	res.set('Content-disposition', 'attachment; filename=' + 'TESTFILE.csv')
	try {	
		const options = {
		delimiter: ',',
		columns: [
			{key: 'location_id'}, 
			{key: 'transfer_id'}, 
			{key: 'location_type_id'}, 
			{key: 'location_detail'}, 
			{key: 'asset_type'},
			{key: 'serialnumber'},
			{key: 'asset_condition'},
		],
		header: true
		}
		const stringifier = stringify(options) 	

		return await pipeline(
			await getAssetLocationsReportStream(),
			stringifier,
			res
		)

	} catch(err) {
		console.log(err)
		res.status(400).json('Could not generate report')
	}
}

async function httpGetLocationAssetsReport(req, res) {
	res.set('Content-disposition', 'attachment; filename=' + 'TESTFILE.csv')
	try {	
		const options = {
		delimiter: ',',
		columns: [
			{key: 'Location Code'}, 
			{key: 'Location Name'},
			{key: 'Asset ID'}, 
			{key: 'Serialnumber'},
			{key: 'Asset Type'},
			{key: 'Make'},
			{key: 'Model'},
			{key: 'Description'},
			{key: 'Transfer Date'},
		],
		header: true
		}
		const stringifier = stringify(options) 	

		return await pipeline(
			await getLocationAssetsReportStream(),
			stringifier,
			res
		)

	} catch(err) {
		console.log(err)
		res.status(400).json('Could not generate report')
	}
}


module.exports = {
	httpGetLocationAssetsReport,
	httpGetLocationAssetsReport
}
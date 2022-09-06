const db = require('../services/knex.js');
const fs = require('fs');
const path = require('path');
const { stringify } = require('csv-stringify')
const { pipeline } = require('stream/promises')

const {queryLocationCode} = require('../services/utils.js');

const writer = fs.createWriteStream(path.join(__dirname, '.','test.csv'))

const options = {
	delimiter: ',',
	columns: [
		{key: 'asset_type'}, 
		{key: 'location_id'}, 
		{key: 'transfer_id'}, 
		{key: 'location_type_id'}, 
		{key: 'location_detail'}, 
		{key: 'asset_type'}
	],
	header: true

}
const stringifier = stringify(options)  

async function getAssetLocationsReportStream() {
	try {
		const stream = await
			db.select(
				db.raw(queryLocationCode()),		
				'asset_transfer.location_id',
				'transfer_id',
				'location_type_id',
				db.raw(`TRIM(CONCAT(firstname, ' ', lastname, located)) as "location_detail"`),
				'asset_type',
				'all_assets.serialnumber',
				db.raw(`TRIM(CONCAT(make, ': ', model)) as "asset_detail"`),
				'asset_condition',
				)
			.distinctOn('asset_transfer.asset_id')
			.from('all_locations')
			.rightJoin('asset_transfer', 'asset_transfer.location_id', 'all_locations.location_id')
			.rightJoin('all_assets', 'asset_transfer.asset_id', 'all_assets.asset_id')
			.orderBy(['asset_transfer.asset_id', {column: 'transfer_date', order: 'desc'}])
			.stream()

		return stream
	} catch(err) {
		throw err
	}

}

async function getLocationAssetsReportStream() {
	try {
		const stream = await
			db.select(
				db.raw(queryLocationCode()),		
				db.raw(`TRIM(CONCAT(all_locations.firstname, ' ', all_locations.lastname, all_locations.description)) AS "Location"`),
				db.raw(`COALESCE(all_asset_locations.asset_id::text, 'No Assets') AS "Asset ID"`),
				db.raw(`COALESCE(all_assets.asset_type, 'N/A') AS "Asset Type"`),
				db.raw(`CONCAT(all_assets.make, ' ', all_assets.model) AS "Asset Detail"`),
				db.raw(`COALESCE(all_asset_locations.transfer_date::text, 'N/A') as "Transfer Date"`)
				)
			.from('all_locations')
			.leftJoin('all_asset_locations', 'all_asset_locations.location_id', 'all_locations.location_id')
			.leftJoin('all_assets', 'all_assets.asset_id', 'all_asset_locations.asset_id')
			.stream();

		return stream;
		} catch(err) {
			throw (err);
		}
}

async function getStaffDetailReportStream() {
	try {
		const stream = await
			db.select(
				'staff_id',
				'firstname',
				'lastname',
				'email',
				'access'
			)
			.from('staff');
		
		return stream;
	} catch(err) {
		throw(err);
	}
}

async function test() {
	const result =  await getStaffDetailReportStream();
	console.log(result)
	}



// test()

module.exports = {
	getAssetLocationsReportStream,
	getLocationAssetsReportStream,
}



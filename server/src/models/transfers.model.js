const db = require('../services/knex.js');
const { DateTime } = require('luxon')

const {queryParsedLocations} = require('../services/utils.js');


const TEST_TRANSFER = {
	asset_ids: [96, 105, 103],
	location_id: 49,
	transfer_date: '2022-07-21'
}

async function getAssetTransfers(serialnumber) {
	try {const transfersList =
			 await 
			 	db.select(
					'transfer_id',
			 		'location_type',
					 db.raw(`CONCAT(location_code, TO_CHAR(location_type_id, 'FM00'), ': ', location_name) as location`),
					'transfer_date', 
					'capture_time'
				)
				.from('all_assets')
				.rightJoin('asset_transfer', 'all_assets.asset_id', 'asset_transfer.asset_id')
				.leftJoin('all_locations', 'all_locations.location_id', 'asset_transfer.location_id')
				.where('all_assets.serialnumber', serialnumber)
				.orderBy('transfer_date', 'desc')
				.orderBy('capture_time', 'desc');


		return transfersList;
	} catch(err) {
		throw err;
	}
}

async function transfersDateTest () {
	const query = await
		db.select(
			'asset_id',
			'transfer_date'
		)
		.from('asset_transfer')

	const result = query.map(tr =>{ 
		const rdate = tr.transfer_date
		console.log(rdate)

		const date = DateTime.fromJSDate(rdate).setLocale('en-gb').toLocaleString()

		return date
	});
	return result
}

async function getAccTransfers(acc_id) {
	try {const transfersList =
			 await 
			 	db.select(
					'transfer_id',
					db.raw(`CONCAT(location_code, TO_CHAR(location_type_id, 'FM00'), ': ', location_name) as location`),
					'transfer_date', 
					'capture_time'
				)
				.from('accessory')
				.rightJoin('asset_transfer', 'accessory.asset_id', 'asset_transfer.asset_id')
				.leftJoin('all_locations', 'all_locations.location_id', 'asset_transfer.location_id')
				.where('accessory.accessory_id', acc_id)
				.orderBy('transfer_date', 'desc')
				.orderBy('capture_time', 'desc');


		return transfersList;
	} catch(err) {
		throw err;
	}
}


async function getLastTransfer(asset_id) {
	try {
		const transferQuery = await
			db.select(
				'location_id',
				'transfer_date'
			)
			.from('all_asset_locations')
			.where('asset_id', asset_id);
		return transferQuery[0]; 
	} catch(err) {
		throw err
	}
} 


async function addAssetTransfer( transfer_data ) {
	try {
		await db.transaction(async trx => {
			const assetIds = transfer_data.asset_ids
			const {location_id, transfer_date} = transfer_data

			for(assetId of assetIds) {
				// Get date adn location of last transaction - returned as object
				const lastTr = await getLastTransfer(assetId);

				// If nothing is returned, asset_id provided was invalid
				if(!lastTr) {
					throw 'Invalide Asset ID';
				}

				// If last transaction was before transaction being added, throw error
				const lastTrDate = new Date(lastTr.transfer_date);
				const newTrDate = new Date(transfer_data.transfer_date);

				if(newTrDate.getTime() <= lastTrDate.getTime()) {
					throw('Error: Transfer date before last transaction');
				} 

				if(Number(lastTr.location_id) === Number(transfer_data.location_id)) {
					throw('Error: Transfer to current loction');
				}

				const insert = await trx('asset_transfer').insert({
					asset_id: assetId,
					location_id: location_id,
					transfer_date: transfer_date
					}, 'transfer_id');
				}
			return "transfer success"
		})
	} catch (error) {
		throw(error)
	}
}


async function deleteTransfer(transfer_id) {
	try {
		const transferDetails = await 
			db('asset_transfer')
				.where('transfer_id', transfer_id);
		
		if(!transferDetails[0]) {
			throw("Transfer not found");
		}

		const asset_transfers = await db('asset_transfer')
			.where('asset_id', transferDetails[0].asset_id)

		console.log(asset_transfers);

		// Delete asset if there is only 1 transfer
		if(asset_transfers.length === 1) {			
			const asset_id = transferDetails[0].asset_id;


			const deleteAsset = await db.transaction(async trx => {
				const delNotes = await trx('asset_note')
					.where('asset_id', asset_id)
					.del();

				const delAsset = await trx('transfer_id')
					.where('asset_id', asset_id)
					.del();

			})
			
			return 'Asset Deleted';
		}
		if (transferDetails.length) {
			const lastTr = await getLastTransfer(transferDetails[0].asset_id);

			// If last transaction was after transaction being deleted, throw error
			const lastTrDate = new Date(lastTr.transfer_date);
			const delTrDate = new Date(transferDetails[0].transfer_date);

			if(delTrDate.getTime() < lastTrDate.getTime()) {
				throw new Error('Error: Transfer date before last transaction');
			} 

			const delTr = await db('asset_transfer')
				.where('transfer_id', transfer_id)
				.del();

			return delTr;
		}	
		throw new Error('Transfer not found');
	} catch(err) {
		console.log(err);
		throw(err);
	}

}

async function test() {
	try {
		const dates = await getAssetTransfers('F19NKG7J');
		console.log(dates)
	} catch (err) {
		console.log(err)
	}
}

// test()

module.exports = {
	addAssetTransfer,
	getAccTransfers,
	getAssetTransfers,
	deleteTransfer
}
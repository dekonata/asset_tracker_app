const bcrypt = require('bcrypt')

const db = require('../services/knex.js');

const { getUnusedIds } = require('../services/utils.js');

const LOCATION_TYPE = 'staff'
const ID_RANGE = 30

const TEST_STAFF = {
	location_type_id: 2,
	location_name: "Admin",
	firstname: "Kriegler",
	lastname: "Van der merwe",
	email: 'admin@as.com',
	password: "1q2w3e",
	access: 'admin'
};

const TEST_EDIT_STAFF = {
	location_type_id: 5,
	payload: {
		firstname: 'Bemeny'
	}
};



async function getOneStaff(location_type_id) {
	try {
		const oneStaffQuery = 
			await db.select(
				'location_type_id',
				db.raw(`CONCAT('STAFF', TO_CHAR(location_type_id, 'FM00')) AS parsed_id`),
				'location_id',
				'firstname',
				'lastname',
				'email',
				'access'
				)
				.from('staff')
				.where('location_type_id', location_type_id);
	
		return oneStaffQuery[0];
	} catch(err) {
		throw err;
	}
}


// Get staff user password and access level when logging inr
async function getUser(email) {
	try {	
		const user = await db.select(
			'location_type_id',
			'hash',
			'access'
			)
			.from('staff')
			.where('email', email)


			return user[0]
	} catch(err) {
		throw(err);
	}
}


async function getStaffSuggestLists() {
	const staff = 
		await db.select(
			db.raw(`CONCAT('STAFF', TO_CHAR(location_type_id, 'FM00'), ': ', firstname, ' ', lastname) AS name`),
			db.raw(`CONCAT('STAFF', TO_CHAR(location_type_id, 'FM00')) AS id`),
			'location_type_id'
			)
			.from('staff');

	const usedNumbIds = staff.map(staff => staff.location_type_id);
	const staffList = staff.map(staff => staff.name);
	const usedIds = staff.map(staff => staff.id);
	const unusedIds = getUnusedIds(ID_RANGE, [...usedNumbIds, 0 ])
						.map(idnum => `STAFF${idnum.toString().padStart(2, '0')}`);

	return {staffList, usedIds, unusedIds};
}


async function addStaff(staff_data) {
	const {password, ...data} = staff_data;
	const saltRounds = 10;
	try {
		return await db.transaction(async trx => {
			// Create transfer location id 
			const transfer_location = 
				await trx('transfer_location')
					.insert({
						location_type: LOCATION_TYPE
					}, 'location_id');
			const hash =  await bcrypt.hash(password, saltRounds);
			const insert_data = Object.assign({}, data, transfer_location[0],  {hash:hash});
			const staff = 
				await trx('staff')
					.insert(insert_data, 'location_id');

			return await staff;
		});
	} catch(err) {
		throw err;
	}
}


async function editStaff(edit_data) {
	try {
		return await db('staff')
			.where('location_type_id', edit_data.location_type_id)
			.update(edit_data.payload, ['location_id']);
	} catch(err) {
		throw err;
	}
}

async function editPassword(edit_data) {
	const {password, location_type_id} = edit_data
	const saltRounds = 10;
	const hash =  await bcrypt.hash(password, saltRounds);
	return await db('staff')
		.update('hash', hash)
		.where('location_type_id', location_type_id) 
}


async function test() {
	const postAddStaff = await addStaff(TEST_STAFF);
	console.log(postAddStaff)
}

// test();

module.exports = {
	getOneStaff,
	getStaffSuggestLists,
	addStaff,
	editStaff,
	getUser,
	editPassword,
}
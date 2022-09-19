CREATE TABLE loc_code (
	code VARCHAR(10) NOT NULL UNIQUE PRIMARY KEY,
	location_type VARCHAR(25) NOT NULL UNIQUE
);

INSERT INTO loc_code VALUES 
	('CAB', 'cabinet'),
	('STAFF', 'staff'),
	('SHE', 'shelf'),
	('LOC', 'other_location');


CREATE TABLE other_location (
	other_location_id SERIAL NOT NULL PRIMARY KEY,
	location_id INT,
	loc_name VARCHAR(25) NOT NULL UNIQUE,
	description VARCHAR(255),
	FOREIGN KEY(location_id) REFERENCES transfer_location(location_id)
);
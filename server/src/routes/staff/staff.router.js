const express = require('express');

const {
	httpGetStaffLists,
	httpAddStaff,
	httpGetOneStaff,
	httpEditStaff,
	httpEditPassword,
} = require('./staff.controller.js');

const staffRouter = express.Router();

staffRouter.get('/stafflists/', httpGetStaffLists);
staffRouter.get('/one/:staffid', httpGetOneStaff);
staffRouter.post('/add', httpAddStaff);
staffRouter.put('/edit', httpEditStaff);
staffRouter.put('/editpw', httpEditPassword);

module.exports = staffRouter;
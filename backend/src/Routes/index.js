/**
 * Classifications of routes in logical manner.
 */
'use strict';

const router = require('express').Router();
const attendanceRoutes = require('./attendance');


router.use('/api', attendanceRoutes);


module.exports = router
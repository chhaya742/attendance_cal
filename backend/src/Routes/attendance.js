


/**
 * Contains all the users related routes.
 */
'use strict';

const router = require('express').Router()

router.post("/mark-attendance", (request, response) => {
    require('../Controller/attendance').addAttendance(request, response);
});

router.post("/attendance", (request, response) => {
    require('../Controller/attendance').getAttendance(request, response);
});
module.exports = router

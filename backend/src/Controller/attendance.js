
const attendanceModel = require('../Model/attendance')
const messages = require("../Comman/messages");
const statusCode = require("../Comman/statusCode");
const { Resp, response } = require("../Comman/response");


const addAttendance = (req, res) => {
    let body = req.body
    if (!body.date && !body.status && !body.emp_id) { throw new Error('Insufficient params.') }
    
    attendanceModel.addAttendance(req.body).then((data) => {
            Resp(response(true, statusCode.Created, messages.addAttendance, data), res)
    }).catch((err) => {
        console.log(err);
        Resp(response(false, statusCode.Server_err, err.sqlMessage), res)
    })
};

const getAttendance = async (req, res) => {
    // console.log(req.body.emp_id);
    attendanceModel.getAttendance(req.body.emp_id).then((result) => {
     
        Resp(response(true, statusCode.ok, messages.get, result), res)
    }).catch((err) => {
        console.log(err);
        Resp(response(false, statusCode.Server_err, err.sqlMessage), res)
    })

}

module.exports = { addAttendance, getAttendance }
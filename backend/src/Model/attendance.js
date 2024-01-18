
const messages = require("../Comman/messages");
const statusCode = require("../Comman/statusCode");
const query = require("../comman/query");

const table = "emp_attendance"
const addAttendance = async (userData) => {
    var data = await query.insert(table, userData);
    // console.log(data);
    return data;
}


const getAttendance = async (id) => {
    let empid = id
    console.log(empid);
    const data = await query.getbyId(table, { 'emp_id': empid });
    console.log(data);
    return data
}



module.exports = { addAttendance, getAttendance }

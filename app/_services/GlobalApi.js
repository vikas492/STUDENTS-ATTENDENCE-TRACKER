const { default: axios } = require("axios");

const GetAllGrades = () => axios.get('/api/grade');
const CreateNewStudent = (data) => axios.post('/api/Student', data);
const getAllStudents = () => axios.get('/api/Student');
const DeleteStudentRecord = (id) => axios.delete('/api/Student?id=' + id);
const GetAttendanceList = (grade, month) => axios.get('/api/attendance?grade='+grade+"&month="+month);
const MarkAttendance = (data) => axios.post('/api/attendance', data);
const MarkAbsent=(studentId,day,date)=>axios.delete('/api/attendance?studentId='+studentId+'&day='+day+'&date='+date);


export default {
    CreateNewStudent,
    GetAllGrades,
    getAllStudents,
    DeleteStudentRecord,
    GetAttendanceList,
    MarkAttendance,
    MarkAbsent,
    
};



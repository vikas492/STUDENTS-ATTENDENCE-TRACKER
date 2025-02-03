"use client"
import React from 'react'
import MonthSelection from '@/app/_components/MonthSelection';
import GradeSelect from '@/app/_components/GradeSelect';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import GlobalApi from '@/app/_services/GlobalApi';
import moment from 'moment';
import AttendanceGrid from './_components/AttendanceGrid';

function Attendance() {
  const [selectedMonth,setSelectedMonth] = useState();
  const [selectedGrade,setSelectedGrade] = useState();
  const [attendanceList,setAttendanceList] = useState();
  const onSearchHandler = ()=>{
// console.log(selectedMonth,selectedGrade)
const month=moment(selectedMonth).format('MM/YYYY');
// console.log(month)

GlobalApi.GetAttendanceList(selectedGrade,month).then(resp=>{
 setAttendanceList(resp.data);
})
  }
  return (
    <div className='p-5'>
      <h2 className='text-2xl font-bold'>Attendance</h2> 

        <div className=' flex gap-5 p-7 border rounded-lg'>
          <div className='flex gap-2 items-center'>
          <label>Select Month</label>
          <MonthSelection selectedMonth={(value)=>setSelectedMonth(value)} />
          </div>
          <div className='flex gap-2 items-center'>
          <label>Select Grade</label>
          <GradeSelect selectedGrade={(v)=>setSelectedGrade(v)}/>
          </div>
          <Button onClick={()=>onSearchHandler()}>Search</Button>
        </div>
        <AttendanceGrid attandanceList={attendanceList}
        selectedMonth={selectedMonth}/>
    </div>
  )
}

export default Attendance;
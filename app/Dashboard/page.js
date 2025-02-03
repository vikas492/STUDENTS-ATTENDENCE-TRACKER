"use client"
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import MonthSelection from '../_components/MonthSelection';
import GradeSelect from '../_components/GradeSelect';
import GlobalApi from '../_services/GlobalApi';
import moment from 'moment';
import StatusList from './_Components/StatusList';

import Discription from './_Components/discription';

function Dashboard() {
    
    const [selectedMonth,setSelectedMonth]=useState();
    const [selectedGrade,setSelectedGrade]=useState();
    const [attendaceList,setAttendaceList] = useState();
  
    useEffect(()=>{

        getStudentAttendance();
    },[selectedMonth])

    useEffect(()=>{
   
      getStudentAttendance();
  },[selectedGrade])

    const getStudentAttendance=()=>{
      GlobalApi.GetAttendanceList(selectedGrade,moment(selectedMonth).format('MM/yyyy'))
      .then(resp=>{
         setAttendaceList(resp.data)
      })
    }

    // const GetTotalPresentCountByDay=()=>{
    //   GlobalApi.TotalPresentCountByDay(moment(selectedMonth).format('MM/yyyy'),selectedGrade)
    //   .then(resp=>{
    //     setTotalPresentData(resp.data);
    //   })
    // }

  return (
    
    <div className='p-10 '>
      <div className='items-center flex justify-between '>
      <h2 className='font-bold text-2xl'>Dashboard</h2>
      
      <div className='items-center flex gap-4'>
        <MonthSelection selectedMonth={setSelectedMonth}/>
        <GradeSelect selectedGrade={setSelectedGrade}/>
      </div>
      </div>
      <StatusList attendaceList={attendaceList}/>
      
      <div>
      <div className='my-40'>
        <Discription/>
      </div>
      </div>
     </div>
  )
}

export default Dashboard ;
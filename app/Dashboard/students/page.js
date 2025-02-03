"use client"
import React, { useEffect } from 'react';
import AddNewStudent from './_components/AddNewStudent';
import GlobalApi from '@/app/_services/GlobalApi';
import { useState } from 'react';
import StudentListTable from './_components/StudentListTable';




function Students() {
  const[studentList,setStudentList]=useState([])
useEffect(()=>{
  getAllStudents()
},[])

  const getAllStudents=()=>{
    GlobalApi.getAllStudents().then((resp)=>{
      setStudentList(resp.data)
    })
  }
  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl flex justify-between items-center">Students
       <AddNewStudent refreshData={getAllStudents} />
       </h2>
      
      <StudentListTable studentList={studentList} 
      refreshData={getAllStudents}/>
    </div>
  );
}

export default Students;

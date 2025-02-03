"use client"
import React from 'react'
import GlobalApi from '../_services/GlobalApi';
import { useState } from 'react';
import { useEffect } from 'react';


function GradeSelect({selectedGrade}) {
     const [grades,setGrades]=useState([]);

    useEffect(()=>{
      GetAllStudentList();
    },[])
    
      const GetAllStudentList = ()=>{
        GlobalApi.GetAllGrades().then(resp=>{
          setGrades(resp.data);
        })
      }
  return (
    <div>
        <select
                    className="p-3 border rounded-lg"
                  onChange={(e)=>selectedGrade(e.target.value)}
                  >
                    {grades.map((items,index)=>(
                           <option key={index} value={items.grade}>{items.grade}</option>
                    ))}
                    
                   
                  </select>
    </div>
  )
}

export default GradeSelect
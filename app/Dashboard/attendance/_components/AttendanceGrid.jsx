"use client"
import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import moment from 'moment';
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';
import { date } from 'drizzle-orm/mysql-core';
import { getUniqueRecord } from '@/app/_services/service';


const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [10, 25, 50];


// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

function AttendanceGrid({attandanceList, selectedMonth}) {
    const [rowData,setRowData] = useState()
    const [colDefs,setColDefs] = useState([
        {field:'studentId',filter:true},
        {field:'name',filter:true}
    ])

    const daysInMonth=(year,month)=>new Date(year,month+1,0).getDate()
    const numberOfDays=daysInMonth(moment(selectedMonth).format('yyyy'),moment(selectedMonth).format('MM'))
  
    const daysArray = Array.from({length:numberOfDays},(_,i)=>i+1)
    useEffect(()=> {

        if(attandanceList){
        const userList = getUniqueRecord(attandanceList);
        setRowData(userList)
        daysArray.forEach((date)=>{
            setColDefs(prevData=>[...prevData,{field:date.toString(),width:50 ,editable:true}])
            userList.forEach(obj=>{
              obj[date]=isPresent(obj.studentId,date)
            })
        })
    }
    },[attandanceList])
    const isPresent=(studentId,day)=>{
        const result = attandanceList.find(item=>item.day==day&&item.studentId==studentId)
        return result?true:false
    }
    
    // const daysInMonth=(year,month)=>new Date(year,month+1,0).getDate()
    // const numberOfDays=daysInMonth(moment(selectedMonth).format('yyyy'),moment(selectedMonth).format('MM'))
  
    // const daysArray = Array.from({length:numberOfDays},(_,i)=>i+1)
    const onMarkAttendance =(day,studentId,presentStatus)=>{
if(presentStatus){
    const date = moment(selectedMonth).format('MM/yyyy')
    const data={
        day:day,
        studentId:studentId,
        presentStatus:presentStatus,
        date:date
    }
    GlobalApi.MarkAttendance(data).then(resp=>{
       
        toast("studentID:"+studentId+"marked as present")
    })
    
}
else{
    GlobalApi.MarkAbsent(studentId,day,date)
    .then(resp=>{
        toast("Student ID :"+studentId+"is marked as absent")
    })
}
    }

    
  return (
    <div>
         <div
        // define a height because the Data Grid will fill the size of the parent container
        style={{ height: 500 }}
    >
        <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                onCellValueChanged={(e)=>onMarkAttendance(e.colDef.field,e.data.studentId,e.newValue)}
                pagination={pagination}
                paginationPageSize={paginationPageSize}
                paginationPageSizeSelector={paginationPageSizeSelector}
        />
    </div>
    </div>
  )
}

export default AttendanceGrid
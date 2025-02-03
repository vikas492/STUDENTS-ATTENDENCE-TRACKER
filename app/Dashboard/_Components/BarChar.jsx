"use client"
import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getUniqueRecord } from '@/app/_services/service';
import { useState } from 'react';
import { useEffect } from 'react';

function BarChar({ attendaceList, totalPresentData }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        formatAttendanceListCount();
    }, [attendaceList||totalPresentData]);

    // useEffect(() => {
    //     formatAttendanceListCount();
    // }, [totalPresentData]);

    const formatAttendanceListCount = () => {
        const totalStudent = getUniqueRecord(attendaceList);
        const result = totalPresentData.map((item => ({
            day: item.day,
            presentCount: item.presentCount,
            absentCount: Number(totalStudent?.length) - Number(item.presentCount)
        })));
        // console.log(result);
        setData(result);
    };

    return (
        <div>
            <ResponsiveContainer width={'100%'} height={300}>
            <BarChart  data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="presentCount" fill="#8884d8" />
                <Bar dataKey="absentCount" fill="#82ca9d" />
            </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default BarChar;
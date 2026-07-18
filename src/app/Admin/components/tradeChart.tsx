"use client"
// import React, { use, useEffect, useState } from 'react';
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../../mainCss/mainXadmin.css'

const data = [
    { name: '21 April', views: 2000, sales: 15, revenue: 50000 },
    { name: '22 April', views: 3500, sales: 25, revenue: 85000 },
    { name: '23 April', views: 2800, sales: 18, revenue: 62000 },
];

const AdminChart = () => {


    return (
        <div className=''>
            <div className='flex justify-center items-center ms-auto'>
                <h1 className='text-2xl mb-5 text-center'>PerFormance</h1>
            </div>
            <div className='dshbpxFx'>
                <div className="w-full h-80  bg-white  rounded-lg shadow-lg  dshbpxF ">
                    <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 100, height: 100 }}>
                        <ComposedChart data={data} >
                            <CartesianGrid stroke="#f5f5f5" />
                            <XAxis dataKey="name" scale={'point'} />
                            <YAxis yAxisId="left" /> {/* Views & Sales scale */}
                            <YAxis yAxisId="right" orientation="right" /> {/* Revenue scale */}
                            <Tooltip />
                            {/* <Legend /> */}

                            {/* 1. Revenue (Area) */}
                            <Area yAxisId="right" type="monotone" dataKey="revenue" fill="#87CEEB" stroke="#8884d8" fillOpacity={0.3} />

                            {/* 2. Sales (Bar) */}
                            <Line yAxisId="left" dataKey="sales" fill="#006400" stroke='#006400' strokeWidth={1} />

                            {/* 3. Views (Line) */}
                            <Line yAxisId="left" type="monotone" dataKey="views" stroke="#ff7300" strokeWidth={1} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminChart;
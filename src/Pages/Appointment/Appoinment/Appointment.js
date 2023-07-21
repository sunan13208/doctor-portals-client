import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useState } from 'react';
import AppointBanner from '../AppointmentBanner/AppointBanner';
import AvailableAppointment from '../AvailableAppointment/AvailableAppointment';

const Appointment = () => {
    const [selectedData,setSelectDate]=useState(new Date())
   
    const date = format(selectedData,'PP')
    const {isPending, isError, data:appointmentOption, error, refetch }=useQuery({
        queryKey:['appointment',date],
        queryFn:async()=>{
            const res= await fetch(`https://doctor-portal-server-lyart.vercel.app/appointmentoption?date=${date}`)
            const data= res.json()
            return data
        }
    })
    if(isPending){
        return <span className="loading loading-dots loading-lg"></span>
    }
    if(isError){
       return <h2>Error: {error.message}</h2>
    }
   
    return (
        <div>
            <AppointBanner selectedData={selectedData} setSelectDate={setSelectDate}></AppointBanner>
            <AvailableAppointment selectedData={selectedData} appointmentOption={appointmentOption} refetch={refetch}></AvailableAppointment>
        </div>
    );
};

export default Appointment;
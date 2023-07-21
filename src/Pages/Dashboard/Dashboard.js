import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useContext,useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import Calendar from './SideNav/Calendar/Calendar';
import Table from './Table/Table';

const Dashboard = () => {
    const { user } = useContext(AuthContext)
    const [appointmentDate, setAppointmentDate] = useState(new Date())

    const myDate = format(appointmentDate, 'PP')
    const details = {
        myDate,
        email: user?.email,
        token:localStorage.getItem('accessToken')
    }
    const {isPending, isError, data:myappointment = [], error}=useQuery({
        queryKey:['myappointment',myDate],
        queryFn:async()=>{
            
            const res= await fetch('https://doctor-portal-server-lyart.vercel.app/myappointment', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(details)
            })
            const data=await res.json()
            return(data)
        }
    })
    if(isPending){
        return <span className="loading loading-dots loading-lg"></span>
    }
    if(isError){
       return <h2>Error: {error.message}</h2>
    }
    return (
        <div className='mt-10 px-4'>
            <div className="overflow-x-auto w-full">
                <div className='flex justify-between mb-3 items-center'>
                    <h1 className='text-xl font-semibold'>My Appointment</h1>
                    <button className='btn btn-primary btn-outline' onClick={() => window.my_modal_3.showModal()} >{myDate}</button>
                </div>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='bg-base-200'>
                            <th></th>
                            <th>Name</th>
                            <th>Service</th>
                            <th>Time</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myappointment?.map((app,index) => <Table key={app._id} app={app} index={index}></Table>)
                        }
                    </tbody>

                </table>
            </div>
            <Calendar appointmentDate={appointmentDate} setAppointmentDate={setAppointmentDate}></Calendar>
        </div>
    );
};

export default Dashboard;

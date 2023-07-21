import { format } from 'date-fns';
import React, {  useState } from 'react';
import BookModal from '../Modal/BookModal';
import AppointmentOption from './AppointmentOption';



const AvailableAppointment = ({selectedData,refetch,appointmentOption}) => {
    const [treatment,setTreatment]=useState(null)   

    return (
        <div>
            <h1 className='text-2xl text-primary text-center mt-28'>Available Services on {format(selectedData,'PP')}</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 mt-16 p-7'>
                {
                    appointmentOption.map(data=><AppointmentOption key={data._id} data={data} setTreatment={setTreatment}></AppointmentOption>)
                }
            </div>
           {
            treatment && <BookModal treatment={treatment} refetch={refetch} selectedData={selectedData} setTreatment={setTreatment}></BookModal>
           }
        </div>
    );
};

export default AvailableAppointment;
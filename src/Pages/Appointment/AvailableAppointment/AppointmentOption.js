import React from 'react';


const AppointmentOption = ({data,setTreatment}) => {
    const {name,slots,price}=data
   
    return (
        <div className="card shadow-lg">
            <div className="card-body">
                <h2 className="text-center text-2xl text-secondary font-semibold">{name}</h2>
                <p className='text-center'>{slots.length>0? slots[0]:"Try Another Day"}</p>
                <p className='text-center'>{slots.length} {slots.length>1? "Spaces": "Space"} Available</p>
                <p className='text-center'>Price: ${price}</p>
                <div className="card-actions justify-center">
                <label disabled={slots.length ===0 } onClick={()=>setTreatment(data)}  htmlFor="my_modal_6" className="btn btn-primary text-white">Book appointment</label>
                </div>
            </div>
            
        </div>
    );
};

export default AppointmentOption;
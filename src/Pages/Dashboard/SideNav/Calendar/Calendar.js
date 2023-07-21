import React from 'react';
import { DayPicker } from 'react-day-picker';

const Calendar = ({appointmentDate,setAppointmentDate}) => {
    return (
        <dialog id="my_modal_3" className="modal w-fit mx-auto" >
            <form method="dialog" className="modal-box">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                <DayPicker
                    mode="single"
                    selected={appointmentDate}
                    onSelect={setAppointmentDate}
                />
            </form>
        </dialog>
    );
};

export default Calendar;
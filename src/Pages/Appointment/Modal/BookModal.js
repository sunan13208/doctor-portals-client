import { format } from 'date-fns';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Context/AuthProvider';

const BookModal = ({ selectedData, treatment, setTreatment, refetch }) => {
    const {user}=useContext(AuthContext)
    const { name, slots,price } = treatment
    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.target
        const date = form.date.value
        const time = form.time.value
        const Name = form.name.value
        const phone = form.phone.value
        const email = form.email.value

        const details = {
            TreatmentName: name,
            PatientName: Name,
            SelectedDate: date,
            SelectedTime: time,
            PhoneNumber: phone,
            EmailAddress: email,
            price
        }
        fetch('https://doctor-portal-server-lyart.vercel.app/booking',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(details)
        })
        .then(res=>res.json())
        .then(data=>{
           if(data.acknowledged){
            toast.success("Booking successful")
            form.reset()
            setTreatment(null)
            refetch()
           }
           else{
            toast.error(data.sms)
           }
        })
        
    }
    return (
        <>
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-semibold text-xl mb-8">{name}</h3>
                    <form className='px-4 grid grid-cols-1 gap-4' onSubmit={handleSubmit}>
                        <input name='date' type="text" disabled value={format(selectedData, 'PP')} className="input input-bordered w-full" />
                        <select name='time' className="select select-bordered w-full" required>
                            {
                                slots.map((slot, index) => <option key={index}>{slot}</option>)
                            }
                        </select>
                        <input name='name' type="text" value={user.displayName} disabled placeholder="Full Name" className="input input-bordered w-full" required />
                        <input name='email' value={user.email} disabled type="email" placeholder="Email address" className="input input-bordered w-full" required />
                        <input name='price' value={`Price: $${price}`} disabled type="price" className="input input-bordered w-full"/>
                        <input name='phone' type="text" placeholder="Phone Number" className="input input-bordered w-full" required />
                        <input type="submit" value="Submit"  className="btn btn-accent w-full" />
                    </form>
                    <div className="modal-action">
                        <label htmlFor="my_modal_6" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookModal;
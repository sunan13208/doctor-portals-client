import React from 'react';
import connect from '../../../assets/images/appointment.png'

const ContactUs = () => {
    return (
        <section style={{background:`url(${connect})`,backgroundSize:"cover"}} className="mt-52">
            <div className='flex flex-col items-center gap-4 py-10 px-3 '>
                <h1 className='text-xl text-secondary font-bold '>Contact Us</h1>
                <h1 className="text-5xl text-white mb-7 text-center">Stay Connected with us</h1>
                <input type="text" placeholder="Email address" className="input input-bordered w-full max-w-xs" />
                <input type="text" placeholder="Subject" className="input input-bordered w-full max-w-xs" />
                <textarea className="textarea textarea-bordered w-[320px]" placeholder="your sms"></textarea>
                <button className="btn btn-primary text-white bg-gradient-to-r from-primary to-secondary">Submit</button>
            </div>
        </section>
    );
};

export default ContactUs;
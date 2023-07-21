import React from 'react';
import Appointment from '../Appointment/Appointment';
import Banner from '../Banner/Banner';
import Care from '../Care/Care';
import ContactUs from '../ContactUs/ContactUs';
import InfoCards from '../InfoCard/InfoCards';
import ServiceCards from '../ServiceCard/ServiceCards';
import Testimonials from '../Testimonial/Testimonials';

const Home = () => {
    return (
        <div className='mx-5'>
            <Banner></Banner>
            <InfoCards></InfoCards>
            <ServiceCards></ServiceCards>
            <Care></Care>
            <Appointment></Appointment>
            <Testimonials></Testimonials>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;
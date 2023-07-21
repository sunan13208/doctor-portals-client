import React from 'react';
import chair from '../../../assets/images/chair.png'
import bg from '../../../assets/images/bg.png'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';


const AppointBanner = ({selectedData,setSelectDate}) => {
    return (
        <section style={{background:`url(${bg})`,backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"}} className='p-10'>
             <div className="hero ">
                <div className="hero-content flex-col gap-28 lg:flex-row-reverse">
                    <img src={chair} alt="" className="lg:w-1/2 rounded-lg shadow-2xl" />
                    <div className='shadow-xl rounded-xl'>
                        <DayPicker
                            mode='single'
                            selected={selectedData}
                            onSelect={setSelectDate}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AppointBanner;
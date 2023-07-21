import React from 'react';
import { Link } from 'react-router-dom';

const Table = ({app,index}) => {
    const {PatientName,TreatmentName,SelectedTime,price,paid,_id}=app
    return (
            <tr className="hover">
                <th>{index+1}</th>
                <td>{PatientName}</td>
                <td>{TreatmentName}</td>
                <td>{SelectedTime}</td>
                <td>
                   {price && !paid && <Link to={`/dashboard/payment/${_id}`}><button className='btn btn-xs btn-primary'>pay</button></Link>}
                   {price && paid && <button className='btn btn-xs btn-primary' disabled>paid</button>}
                </td>
            </tr>

    );
};

export default Table;
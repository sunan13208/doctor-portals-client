import React from 'react';

const ConfirmModal = ({ title, message, setModalData, modalData, handleDelete  }) => {
    return (
        <div>
            <input type="checkbox" id="confirm_modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <label htmlFor="confirm_modal" onClick={() =>  handleDelete (modalData._id)} className="btn btn-xs btn-success">Delete</label>
                        <label htmlFor="confirm_modal" onClick={() => setModalData(null)} className="btn btn-xs">Close</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
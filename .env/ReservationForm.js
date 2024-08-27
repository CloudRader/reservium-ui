import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReservationForm = ({ formFields }) => {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="container">
            <h1 className="my-4 text-center text-white" style={{ background: 'linear-gradient(to right, #00b894, #008e7a)', padding: '20px 0' }}>Reservation Form</h1>
            <form onSubmit={handleSubmit} className="bg-light p-4 rounded">
                {formFields.map((field) => (
                    <div className="form-group" key={field.name}>
                        <label htmlFor={field.name} className={field.labelColor}>{field.labelText}</label>
                        {field.type === 'select' ? (
                            <select className="form-control" name={field.name} value={formData[field.name]} onChange={handleChange}>
                                {field.options.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        ) : (
                            <input type={field.type} className="form-control" name={field.name} value={formData[field.name]} onChange={handleChange} />
                        )}
                    </div>
                ))}
                <button type="submit" className="btn btn-secondary">Submit</button>
            </form>
        </div>
    );
};

export default ReservationForm;

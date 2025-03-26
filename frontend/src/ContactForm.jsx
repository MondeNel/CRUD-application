import React, { useState } from 'react';

const ContactForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        const data = {
            firstName,
            lastName,
            email
        };

        const url = "http://127.0.0.1:5000/contacts"; 
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        try {
            const response = await fetch(url, options);
            const responseData = await response.json();

            if (response.status !== 201 && response.status !== 200) {
                alert(responseData.message || "Failed to create contact");
            } else {
                setFirstName('');
                setLastName('');
                setEmail('');
                alert('Contact created successfully!');
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while creating the contact.");
        }
    };

    return (
        <form onSubmit={onSubmit} className="contact-form">
            {/* First Name */}
            <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
            </div>
            {/* Last Name */}
            <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
            </div>
            {/* Email */}
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <button type='submit' className="submit-btn">Create Contact</button>
        </form>
    );
};

export default ContactForm;

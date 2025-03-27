import React, { useState, useEffect } from 'react';

/**
 * ContactForm Component
 * Handles creating and updating contacts.
 *
 * @param {Object} props - Component props.
 * @param {Object} [props.existingContact={}] - Existing contact data for editing.
 * @param {Function} props.updateCallback - Callback function to refresh the contact list.
 */
const ContactForm = ({ existingContact = {}, updateCallback }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    // Ensure form fields update when switching between different contacts
    useEffect(() => {
        setFirstName(existingContact.firstName || '');
        setLastName(existingContact.lastName || '');
        setEmail(existingContact.email || '');
    }, [existingContact]);

    const updating = !!existingContact.id; // More reliable check for update mode

    /**
     * Handles form submission to create or update a contact.
     * @param {Event} e - Form submit event.
     */
    const onSubmit = async (e) => {
        e.preventDefault();
    
        const data = {
            firstName,
            lastName,
            email
        };
    
        const url = `http://127.0.0.1:5000/contacts${updating ? `/${existingContact.id}` : ""}`;
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
    
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.message || "Failed to create contact");
            } else {
                updateCallback();  // Refresh the contact list
            }
        } catch (error) {
            alert("Error: " + error.message);
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
            <button type="submit" className="submit-btn">
                {updating ? "Update Contact" : "Create Contact"}
            </button>
        </form>
    );
};

export default ContactForm;

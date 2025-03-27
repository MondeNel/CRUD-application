import React, { useState } from 'react';

/**
 * ContactForm Component
 * Handles creating and updating contacts.
 *
 * @param {Object} props - Component props.
 * @param {Object} [props.existingContact={}] - Existing contact data for editing.
 * @param {Function} props.updateCallback - Callback function to refresh the contact list.
 */
const ContactForm = ({ existingContact = {}, updateCallback }) => {
    const [firstName, setFirstName] = useState(existingContact.firstName || '');
    const [lastName, setLastName] = useState(existingContact.lastName || '');
    const [email, setEmail] = useState(existingContact.email || '');

    const updating = Object.keys(existingContact).length !== 0;

    /**
     * Handles form submission to create or update a contact.
     * @param {Event} e - Form submit event.
     */
    const onSubmit = async (e) => {
        e.preventDefault();

        const data = { firstName, lastName, email };
        const url = `http://127.0.0.1:5000/${updating ? `update_contact/${existingContact.id}` : 'create_contact'}`;
        const options = {
            method: updating ? "PUT" : "POST", // Use PUT for updates
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };

        try {
            const response = await fetch(url, options);
            const responseData = await response.json();

            if (!response.ok) {
                alert(responseData.message || "Failed to save contact.");
            } else {
                updateCallback();
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while saving the contact.");
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

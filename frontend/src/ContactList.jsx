import React from 'react';

/**
 * ContactList Component
 * Displays a list of contacts and provides options to update or delete them.
 *
 * @param {Object[]} contacts - List of contacts to display.
 * @param {Function} updateContact - Function to trigger updating a contact.
 * @param {Function} updateCallback - Function to refresh the contact list after deletion.
 */
const ContactList = ({ contacts, updateContact, updateCallback }) => {
  
  /**
   * Handles deleting a contact by sending a DELETE request to the backend.
   * @param {number} id - The ID of the contact to be deleted.
   */
  const onDelete = async (id) => {
    try {
      const options = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };

      // Sending DELETE request to the backend
      const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options);
      
      if (response.ok) {
        updateCallback(); // Refresh the contact list after successful deletion
      } else {
        console.error("Failed to delete contact");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("An error occurred while deleting the contact.");
    }
  };

  return (
    <div className="container">
      <h2>Contacts</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td>
                <button className="update" onClick={() => updateContact(contact)}>Update</button>
                <button className="delete" onClick={() => onDelete(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;

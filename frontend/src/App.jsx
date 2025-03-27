import React, { useState, useEffect } from "react";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";

/**
 * App component serves as the main application container.
 * It manages contacts, modal state, and handles contact creation and editing.
 */
function App() {
  // State to store contacts fetched from the backend
  const [contacts, setContacts] = useState([]);

  // State to manage the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to track the contact being edited
  const [currentContact, setCurrentContact] = useState({});

  // Fetch contacts when the component mounts
  useEffect(() => {
    fetchContacts();
  }, []);

  /**
   * Fetches the list of contacts from the backend.
   * Updates the state with the retrieved contacts.
   */
  const fetchContacts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/contacts");
      const data = await response.json();
      setContacts(data.contacts);
      console.log(data.contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  /**
   * Closes the modal and resets the current contact state.
   */
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentContact({});
  };

  /**
   * Opens the modal for creating a new contact.
   */
  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true);
  };

  /**
   * Opens the modal for editing an existing contact.
   * @param {Object} contact - The contact data to be edited.
   */
  const openEditModal = (contact) => {
    if (!isModalOpen) setIsModalOpen(true);
    setCurrentContact(contact);
  };

  /**
   * Handles updates to the contact list by closing the modal and fetching updated contacts.
   */
  const onUpdate = () => {
    closeModal();
    fetchContacts();
  };

  return (
    <>
      {/* Contact list component displaying all contacts */}
      <ContactList
        contacts={contacts}
        updateContact={openEditModal}
        updateCallback={onUpdate}
      />

      {/* Button to open the modal for creating a new contact */}
      <button onClick={openCreateModal}>Create New Contact</button>

      {/* Modal for creating or editing a contact */}
      {isModalOpen && (
        <div className={`modal ${isModalOpen ? "show" : ""}`}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>{currentContact.id ? "Edit Contact" : "Create Contact"}</h2>
            <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;

import React, { useState } from "react";
import "./SafetyPage.css"; 
import Navbar from '../Navbar';
// Using the same base CSS or a dedicated SafetyOverview.css inheriting the theme

function SafetyOverview() {
  const [contacts, setContacts] = useState([
    { id: 1, name: "Family Contact (Mom)", phone: "555-123-4567" },
    { id: 2, name: "Close Friend (Sarah)", phone: "555-987-6543" },
  ]);
  const [sosMessage, setSosMessage] = useState("I am in an emergency and need help immediately. My location is [Current Location]. Please respond.");
  const [isEditingSos, setIsEditingSos] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '' });

  // --- Contact Handlers ---
  const handleAddContact = (e) => {
    e.preventDefault();
    if (newContact.name && newContact.phone) {
      setContacts([...contacts, { ...newContact, id: Date.now() }]);
      setNewContact({ name: '', phone: '' });
    }
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  // --- SOS Handlers ---
  const handleSaveSos = () => {
    // In a real app, this would save to the backend/local storage
    setIsEditingSos(false);
  };

  const handleEditSosClick = () => {
    setIsEditingSos(true);
  };

  return (
    <>
    <Navbar/>
    <div className="safety-page-container pt-4 pb-5">
      <div className="container">
        
        {/* Header: Safety Overview */}
        <div className="d-flex align-items-center justify-content-center mb-5">
            <div className="safety-header-icon-container me-3">
                <i class="fa-solid fa-user-shield"></i>
            </div>
            <h4 className="safety-header-title mb-0">Safety Overview</h4>
        </div>

        {/* --- 1. Emergency Contacts Management --- */}
        <div className="safety-card-main p-4 p-md-5 mb-4 mx-auto">
          <h5 className="card-section-title mb-4"><i className="bi bi-person-lines-fill me-2"></i> Manage Emergency Contacts</h5>

          {/* ADD Contact Form */}
          <form onSubmit={handleAddContact} className="add-contact-form p-3 mb-4">
            <h6 className="mb-3 form-title">Add New Contact</h6>
            <div className="row g-3">
              <div className="col-md-5">
                <input
                  type="text"
                  className="form-control safety-input"
                  placeholder="Contact Name"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-5">
                <input
                  type="tel"
                  className="form-control safety-input"
                  placeholder="Phone Number (e.g., 555-xxx-xxxx)"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-2">
                <button type="submit" className="btn-add-contact w-100">
                  <i className="bi bi-plus-lg"></i> Add
                </button>
              </div>
            </div>
          </form>

          {/* VIEW Added Contacts */}
          <h6 className="mb-3 contact-list-title">Added Contacts ({contacts.length})</h6>
          <div className="contacts-list">
            {contacts.length > 0 ? (
              contacts.map(contact => (
                <div key={contact.id} className="contact-item d-flex justify-content-between align-items-center p-3 mb-2">
                  <div>
                    <strong className="contact-name">{contact.name}</strong>
                    <span className="d-block contact-phone">{contact.phone}</span>
                  </div>
                  {/* DELETE Contact Button: NOW VISIBLE */}
                  <button 
                    onClick={() => handleDeleteContact(contact.id)} 
                    className="btn-delete-contact"
                    title="Delete Contact"
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-muted">No emergency contacts added yet.</p>
            )}
          </div>
        </div>

        {/* --- 2. SOS Message Configuration --- */}
        <div className="safety-card-main p-4 p-md-5 mx-auto">
          <h5 className="card-section-title mb-4"><i className="bi bi-chat-square-text-fill me-2"></i> Custom SOS Message</h5>

          {/* VIEW/EDIT SOS Message */}
          <div className="sos-message-box p-3">
            <label className="sos-label mb-2">Message Content:</label>
            {isEditingSos ? (
              <>
                <textarea
                  className="form-control sos-textarea"
                  rows="4"
                  value={sosMessage}
                  onChange={(e) => setSosMessage(e.target.value)}
                  placeholder="Enter your emergency message. Use [Current Location] as a placeholder."
                />
                <button onClick={handleSaveSos} className="btn-save-sos mt-3">
                  <i className="bi bi-save-fill me-1"></i> Save Message
                </button>
              </>
            ) : (
              <>
                <p className="sos-text p-3">{sosMessage}</p>
                <button onClick={handleEditSosClick} className="btn-edit-sos">
                  <i className="bi bi-pencil-fill me-1"></i> Edit Message
                </button>
              </>
            )}
          </div>
          <p className="sos-note mt-3">
            <i className="bi bi-info-circle-fill me-1"></i> Note: The text **[Current Location]** will be dynamically replaced with your GPS coordinates when the SOS feature is activated.
          </p>
        </div>

      </div>
    </div>
    </>
  );
}

export default SafetyOverview;
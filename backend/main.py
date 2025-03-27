from flask import request, jsonify
from config import db, app
from models import Contact



#  Retrieve all contacts from the database
@app.route('/contacts', methods=['GET'])
def get_contacts():
    """
    Retrieve all contacts from the database.

    Returns:
        JSON response with a list of all contacts.
    """
    contacts = Contact.query.all()
    json_contacts = [contact.to_json() for contact in contacts]
    return jsonify({"contacts": json_contacts}), 200
  



# Define a route to create a new contact
@app.route('/contacts', methods=['POST'])
def create_contact():
    """
    Create a new contact and add it to the database.
    
    Returns:
        JSON response with the newly created contact.

    """
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")

    if not first_name or not last_name or not email:
        return jsonify(
            {"error": "Please provide first name, last name, and email"}), 400

    new_contact = Contact(first_name=first_name, last_name=last_name, email=email)
    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
    return jsonify({"message": "Contact created successfully"}), 201


# Define a route to update a contact
@app.route('/contacts/<int:id>', methods=['PATCH'])
def update_contact(id):
    """
    Update an existing contact in the database.

    Parameters:
        id (int): The ID of the contact to update.

    Returns:
        JSON response indicating success or failure.
    """
    contact = Contact.query.get(id)
    if not contact:
        return jsonify({"error": "Contact not found"}), 404

    data = request.json
    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email", contact.email)

    try:
        db.session.commit()
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    return jsonify({"message": "Contact updated successfully"}), 200


# Define a route to delete a contact
@app.route('/contacts/<int:id>', methods=['DELETE'])
def delete_contact(id):
    """
    Delete a contact from the database.
    
    """
    contact = Contact.query.get(id)
    if not contact:
        return jsonify({"error": "Contact not found"}), 404
    
    db.session.delete(contact)
    db.session.commit()
    return jsonify({"message": "Contact deleted successfully"}), 200





if __name__ == '__main__':
    # Initialize database within the app context
    with app.app_context():
        db.create_all()

    # Run the Flask web server
    app.run(debug=True)

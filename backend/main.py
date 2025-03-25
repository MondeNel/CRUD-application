from flask import request, jsonify
from config import db, app
from models import Contact

# Define a route to create a new contact
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



if __name__ == '__main__':
    # Initialize database within the app context
    with app.app_context():
        db.create_all()

    # Run the Flask web server
    app.run(debug=True)

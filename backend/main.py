from flask import request, jsonify
from config import db, app
from models import Contact


@app.route('/contacts', methods=['GET', 'POST'])
def handle_contacts():
    """
    Handle GET and POST requests for contacts.

    - GET: Retrieve all contacts from the database.
    - POST: Create a new contact.

    Returns:
        JSON response with contact data.
    """
    if request.method == 'GET':
        # Retrieve all contacts from the database
        contacts = Contact.query.all()
        
        # Convert contact objects to JSON format
        json_contacts = [contact.to_json() for contact in contacts]
        
        return jsonify({"contacts": json_contacts}), 200

    elif request.method == 'POST':
        # Get JSON data from the request
        data = request.get_json()

        # Validate required fields
        if not data or not all(k in data for k in ("first_name", "last_name", "email")):
            return jsonify({"error": "Missing required fields"}), 400

        # Create a new contact instance
        new_contact = Contact(
            first_name=data["first_name"],
            last_name=data["last_name"],
            email=data["email"]
        )

        # Save to the database
        db.session.add(new_contact)
        db.session.commit()

        return jsonify({"message": "Contact created", "contact": new_contact.to_json()}), 201


if __name__ == '__main__':
    # Initialize database within the app context
    with app.app_context():
        db.create_all()

    # Run the Flask web server
    app.run(debug=True)

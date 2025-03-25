from config import db  # Importing the database instance from the config file

class Contact(db.Model):  # Define a Contact model, inheriting from SQLAlchemy's base model
    """
    Contact Model: Represents a contact entity in the database.

    Attributes:
        id (int): Primary key for identifying a contact.
        first_name (str): First name of the contact (max length: 50).
        last_name (str): Last name of the contact (max length: 50).
        email (str): Unique email of the contact (max length: 120).
    """
    
    # Define columns for the Contact table
    id = db.Column(db.Integer, primary_key=True)  # Unique identifier for each contact
    first_name = db.Column(db.String(50), unique=False, nullable=False)  # Contact's first name
    last_name = db.Column(db.String(50), unique=False, nullable=False)  # Contact's last name
    email = db.Column(db.String(120), unique=True, nullable=False)  # Contact's unique email

    def to_json(self):
        """
        Converts the Contact instance into a JSON-serializable dictionary.

        Returns:
            dict: A dictionary representation of the contact.
        """
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'email': self.email
        }

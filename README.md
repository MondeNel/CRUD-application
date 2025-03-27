# Contact Management Application
- This is a simple CRUD (Create, Read, Update, Delete) application that demonstrates the ability to perform basic database operations with a user-friendly interface. The application allows users to create, read, update, and delete contacts from a database. The backend is built with Python and utilizes Flask, CORS, and Flask-SQLAlchemy to interact with the database. The frontend is built using React.js and JavaScript.

## Features
- Create a Contact: Users can create a new contact by entering a first name, last name, and email.

- Read Contacts: Users can view a list of all contacts stored in the database.

- Update a Contact: Users can edit the details of an existing contact.

- Delete a Contact: Users can remove a contact from the database.

## Technologies Used

## Backend:
### Python

- Flask: A lightweight Python web framework for building web applications and APIs.

- Flask-SQLAlchemy: An extension for Flask that simplifies database interaction using SQLAlchemy.

- Flask-CORS: A Flask extension for handling Cross-Origin Resource Sharing (CORS), enabling frontend applications to communicate with the backend across different origins.

## Frontend:
- React.js: A popular JavaScript library for building user interfaces.

- JavaScript: A programming language used to add interactivity and manage the frontend logic.

#### Setup and Installation
##### Prerequisites
- Python 3.x and pip should be installed.

- Node.js and npm should be installed for the frontend.

### Backend Setup

1. Clone the repository.
2. cd backend
3. Install the required Python packages by running the following command:

bash 
---------------------------------
pip install -r requirements.txt

3. Set up the Flask application and database:
---------------------------------
python main.py

This will start the Flask backend server at http://127.0.0.1:5000/.


### Frontend Setup
1. Navigate to the frontend directory and install the required dependencies:

bash 
-------------------------------------
cd frontend

npm install

2. Run the server
-----------------------------------------
npm run dev





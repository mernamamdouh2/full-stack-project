# Books Management System

Welcome to the Books Management System! This project helps you organize, search, and manage your library effectively. It's built with React.js for the front end and Node.js for the back end.

Getting Started

Follow these instructions to get the project up and running on your local machine.

Prerequisites Before you begin, ensure you have the following installed:

Node.js and npm (Node Package Manager)

Git Installation Clone the repository:

# git clone (https://github.com/mernamamdouh2/full-stack-project.git)

Running the Project Locally
# Make sure you're in the project root directory
To run the project locally, follow these steps:

Setting Up the Backend
Navigate to the backend directory:

Start the Node.js backend:

# cd Books-MS-Back

Install backend dependencies:

# npm install

Migrate the database:

# npm run migrate

Run backend:

# npm run start:dev

The server will run on 

# http://localhost:8000


Start the React frontend:

# cd Books-MS-Front

Install frontend dependencies:

# npm install

Run frontend:

# npm start

Open the application in your browser:

# http://localhost:3000

Database Migration
To set up and migrate the database for the project, follow these steps:

Database Configuration:
Ensure you have a database server running, such as MongoDB.

Configure the database connection settings in the backend server configuration file 
# (Books-MS-Back/config/database.js)

Run Migrations:

Utilize database migration tools like Sequelize or Mongoose to create necessary collections and seed initial data.
Refer to the documentation of the chosen database migration tool for detailed instructions on how to run migrations.

Testing
To run tests, execute the following command:

# npm test

This will launch the test runner in interactive watch mode.

## Created By

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/mernamamdouh2">
        <img src="https://avatars.githubusercontent.com/u/74082044?v=4" width="100px" alt="Fourth User">
      </a>
      <br>
      <a href="https://github.com/mernamamdouh2">Merna Mamdouh</a>
    </td>
  </tr>
</table>

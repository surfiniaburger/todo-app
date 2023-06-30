# todo-app
*********INSTALLATION************

To run the provided code, you need to follow these steps:

Install Node.js: Ensure that you have Node.js installed on your machine. You can download and install Node.js from the official website: https://nodejs.org

Set up the project:

a. Create a new directory for your project.

b. Open a terminal or command prompt and navigate to the project directory.

Initialize the project: Run the following command to initialize a new Node.js project and create a package.json file:

csharp
Copy code
npm init -y
Install dependencies: Run the following command to install the required dependencies (Express, body-parser, MongoDB driver, Mongoose):

css
Copy code
npm install express body-parser mongodb mongoose
Create the models directory: Inside your project directory, create a new directory called models.

Create a file named todo.js inside the models directory and add the following code:

javascript
Copy code
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  todo: {
    type: String,
    required: true,
  },
});

todoSchema.statics.findTodos = function () {
  return this.find().exec();
};

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
Create a file named index.ejs in the root of your project and add your desired HTML/EJS code for the view.

Copy the provided code and save it in a file, such as app.js, in the root of your project.

Replace the MongoDB connection URI (dbURI) in the code with your own MongoDB database connection string. You can create a free MongoDB Atlas account and obtain the connection URI from there.

Start the server: Run the following command to start the server:

Copy code
node app.js
You should see the message "Server is running on port 3000" in the console, indicating that the server is running successfully.

Access the app: Open a web browser and visit http://localhost:3000 to access the todo app.
That's it! You should now be able to use the todo app and perform CRUD operations (Create, Read, Update, Delete) on your todos.

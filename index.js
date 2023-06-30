const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Todo = require('./models/todo');

const app = express();
const port = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Parse incoming requests with JSON payloads
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dbURI =
  'mongodb+srv://surfiniaburger:%40WockyRocky007@cluster0.ybfzbj2.mongodb.net/tododb';

// Connect to the MongoDB database
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Handle GET requests to the root URL
app.get('/', (req, res) => {
  // Retrieve all todos using the custom static method of the Todo model
  Todo.findTodos()
    .then((result) => {
      // Render the 'index' view and pass the retrieved todos as data
      res.render('index', { data: result });
      console.log(result);
    })
    .catch((error) => {
      console.error('Error fetching todos:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Handle POST requests to the root URL
app.post('/', (req, res) => {
  // Create a new todo instance with the provided value
  const todo = new Todo({
    todo: req.body.todoValue,
  });

  // Save the todo to the database
  todo
    .save()
    .then((result) => {
      // Redirect back to the root URL after successful save
      res.redirect('/');
    })
    .catch((error) => {
      console.error('Error saving todo:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Handle PUT requests to update a specific todo by ID
app.put('/:id', (req, res) => {
  const todoId = req.params.id;
  const updatedTodo = req.body;

  // Find and update the todo by ID
  Todo.findByIdAndUpdate(todoId, updatedTodo, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      // Respond with the updated todo as JSON
      res.json(result);
    })
    .catch((error) => {
      console.error('Error updating todo:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Handle DELETE requests to delete a specific todo by ID
app.delete('/:id', (req, res) => {
  const todoId = req.params.id;

  // Find and delete the todo by ID
  Todo.findByIdAndDelete(todoId)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      // Respond with the deleted todo as JSON
      res.json(result);
    })
    .catch((error) => {
      console.error('Error deleting todo:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




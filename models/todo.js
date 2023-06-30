const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a new Mongoose schema for the 'todo' collection
const todoSchema = new Schema({
  todo: {
    type: String,
    required: true,
  },
});

// Add a static method to the schema to find all todos
todoSchema.statics.findTodos = function () {
  // Use the 'find' method to retrieve all todos from the collection
  return this.find().exec();
};

// Create a Mongoose model based on the schema
const Todo = mongoose.model('Todo', todoSchema);

// Export the Todo model
module.exports = Todo;




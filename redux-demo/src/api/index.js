import { v4 } from 'uuid';

// This is a fake in-memory implementation of something
// that would be implemented by calling a REST server.

const fakeDatabase = {
  todos: [{
    id: v4(),
    text: 'hey',
    completed: true,
  }, {
    id: v4(),
    text: 'ho',
    completed: true,
  }, {
    id: v4(),
    text: 'let’s go',
    completed: false,
  }],
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = filter =>
  delay(5000).then(() => {
    if (filter !== 'active' && filter !== 'completed') {
      return fakeDatabase;
    }
    return {
      todos: fakeDatabase.todos.filter(todo => {
        if (filter === 'active') {
          return !todo.completed;
        } else if (filter === 'completed') {
          return todo.completed;
        } else {
          throw new Error('undefined filter!');
        }
      })
    }
  });
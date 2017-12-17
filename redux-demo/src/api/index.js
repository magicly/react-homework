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
  delay(1000).then(() => {
    // if (Math.random() < 0.05) {
    //   throw new Error('error from server...');
    // }

    if (filter === 'all')
      return fakeDatabase.todos;

    return fakeDatabase.todos.filter(todo => {
      if (filter === 'active') {
        return !todo.completed;
      } else if (filter === 'completed') {
        return todo.completed;
      } else {
        throw new Error('undefined filter!');
      }
    })
  });

export const addTodo = text => (
  delay(500).then(() => {
    const newTodo = {
      id: v4(),
      text,
      completed: false,
    };
    fakeDatabase.todos.push(newTodo);

    return newTodo;
  })
)

export const toggleTodo = id => (
  delay(500).then(() => {
    const oldTodo = fakeDatabase.todos.filter(todo => todo.id === id)[0];
    oldTodo.completed = !oldTodo.completed;

    return oldTodo;
  })
)
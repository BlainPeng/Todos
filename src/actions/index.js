let nextTodoId = 3

export const loadTodos = () => {
  return {
    type: 'LOAD_TODOS'
  }
}

export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

export const toggleTodo = (id) => {
  console.log('toggleTodo');
  return {
    type: 'TOGGLE_TODO',
    id
  }
}
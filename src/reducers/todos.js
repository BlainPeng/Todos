import { ListView } from 'react-native'

const defaultTodos = [
  {id: 0, text: '起床', completed: true},
  {id: 1, text: '吃饭啦', completed: true},
  {id: 2, text: '送小孩去幼儿园', completed: true}
];

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state
      }

      return Object.assign({}, state, {
        completed: !state.completed
      })
    default:
      return state
  }
}

const todos = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_TODOS': {
      var list = [ ...defaultTodos];

      var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      dataSource = dataSource.cloneWithRows(defaultTodos);

      return {
        list,
        dataSource
      }
    }

    case 'ADD_TODO': {
      console.log('ADD_TODO');
      console.log(state);
      var list = [ ...state.list ];
      list.unshift(todo(undefined, action));
      dataSource = state.dataSource.cloneWithRows(list);

      return ({
        list,
        dataSource
      })
    }

    case 'TOGGLE_TODO': {
      var list = state.list.map(t =>
        todo(t, action)
      )
      dataSource = state.dataSource.cloneWithRows(list);

      return ({
        list,
        dataSource
      })
    }

    default:
      return state
  }
}

export default todos

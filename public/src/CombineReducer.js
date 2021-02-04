import { createStore, combineReducers } from "redux";

function todo(state, action) {
  switch (action.type) {
    case 'ADD_TODO' :
      return [{
        ...state, id: action.id, text: action.text, completed: false
      }];
    case 'TOGGLE_TODO':
      if (action.id !== state.id) {
        return state;
      }
      return { ...state, completed: !state.completed }

    default:
      return state;
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return todo(state, action);
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
}

function setVisibilityFilter(state = 'Show_All', action) {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter;
    default:
      return state;
  }
}

const todoReducer = combineReducers({todos, setVisibilityFilter})
// function todoReducer(state = {}, action) {
//   return {
//     todos: todos((state.todos), action),
//     setVisibilityFilter: setVisibilityFilter((state.setVisibilityFilter), action)
//   }
// }

const store = createStore(todoReducer);

console.log("..............")
console.log("Current state")
console.log(store.getState());
console.log("..............")
console.log("dispatched ADD TODO");
console.log(store.dispatch({
  type: 'ADD_TODO',
  id: 0,
  text : "Code all day",
}));
console.log(store.dispatch({
  id: 1,
  type: 'ADD_TODO',
  text : "learn redux",
}));
console.log("..............")
console.log("Current state")
console.log(store.getState());
console.log("..............")
console.log("dispatched action");
console.log(store.dispatch({
  id: 0,
  type: 'TOGGLE_TODO',
}));
console.log("..............")
console.log("Current state")
console.log(store.getState());
console.log("dispatched action");
console.log(store.dispatch({
  type: 'SET_FILTER',
  filter: "completed todos"
}));
console.log("..............")
console.log("Current state")
console.log(store.getState());

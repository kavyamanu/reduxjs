import { render } from "react-dom";
import { createStore, combineReducers } from "redux";
import { useRef } from "react";

function todo(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state, {
          id: action.id, text: action.text, completed: false
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

function setVisibilityFilter(state = 'SHOW_ALL', action) {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter;
    default:
      return state;
  }
}

function filterSettings(todos, filter) {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    default:
      return todos
  }
}

const todoReducer = combineReducers({ todos, setVisibilityFilter })
// function todoReducer(state = {}, action) {
//   return {
//     todos: todos((state.todos), action),
//     setVisibilityFilter: setVisibilityFilter((state.setVisibilityFilter), action)
//   }
// }

const store = createStore(todoReducer);
let index = 0;

function Filter({ filter, children }) {
  const currentFilter = store.getState().setVisibilityFilter
  if (filter === currentFilter) {
    return <span style={{ margin: '4px', padding: '4px' }} >{children}</span>
  }
  return (
    <a href="#" style={{ margin: '4px', padding: '4px' }} onClick={(e) => {
      e.preventDefault();
      store.dispatch({
        type: 'SET_FILTER',
        filter
      })
    }}>{children}</a>
  )
}

function App({ todos, setVisibilityFilter }) {
  const textElement = useRef('hi');
  const filterTool = filterSettings(todos, setVisibilityFilter);
  return (
    <form>
      <input ref={textElement}></input>
      <button type='submit' onClick={(e) => {
        e.preventDefault();
        store.dispatch({
          type: 'ADD_TODO', id: index++, text: textElement.current.value
        })
        textElement.current.value = '';
      }}>Add TODO</button>
      <ul>
        {filterTool.map((todo) => {
          return (
            <li key={todo.id} onClick={() => {
              store.dispatch({
                type: 'TOGGLE_TODO',
                id: todo.id,
              })
            }} style={{
              textDecoration: todo.completed ?
                'line-through' : 'none'
            }}>{todo.text}</li>
          )
        }
        )}
      </ul>
      <p>
        show:

        <Filter filter='SHOW_ALL' children='All' />
        <Filter filter='SHOW_ACTIVE' children='Active' />
        <Filter filter='SHOW_COMPLETED' children='Completed' />


      </p>


    </form>
  )
}

function renderApp() {
  render(<App {...store.getState()} />, document.getElementById('root'));
}

store.subscribe(renderApp);
renderApp();

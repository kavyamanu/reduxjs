//import { createStore } from "redux";

function reducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

function createStore(creator) {
  let state;
  let listeners = [];
  const getState = () => {
    return state;
  }
  const dispatch = (action) => {
    state = creator(state, action);
    listeners.forEach(listener => listener())
  }
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  }
  dispatch({});
  return { getState, dispatch, subscribe };
}

const store = createStore(reducer);

function render() {
  document.body.innerText = store.getState();
}
store.subscribe(render);
render();
document.addEventListener('click', () => store.dispatch({ type: 'INCREMENT' }));

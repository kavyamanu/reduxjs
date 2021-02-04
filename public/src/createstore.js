import { createStore } from "redux";

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

const store = createStore(reducer);
console.log(store.getState()); // will display initial state
store.dispatch({ type: 'DECREMENT' }); // perform action
console.log(store.getState()); // will decrement the state

function render() {
    document.body.innerText = store.getState();
}

store.subscribe(render);
render();
document.addEventListener('click', ()=>{
  store.dispatch({ type : 'INCREMENT'});
})



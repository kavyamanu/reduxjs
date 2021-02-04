import deepFreeze from "deep-freeze";
import expect from "expect";

function addTodo( state, action){
  switch (action.type) {
    case 'Add_TODO' :
      return [{
        ...state, id: action.id, text: action.text, completed : false
      }];
      default:
        return state;
  }
}

const initialState =[];
const action = {
    type : 'Add_TODO',
    id: 1,
    text:'code all day'
}

const finalState = [
  {
    id: 1,
    text: 'code all day',
    completed: false
  }
]
deepFreeze(initialState);
deepFreeze(action);

expect(addTodo(initialState, action)).toEqual(finalState);
console.log('Testpassed!');

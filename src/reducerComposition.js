import deepFreeze from "deep-freeze";
import expect from "expect";

function todo(state, action){
  switch (action.type) {
    case 'Add_TODO' :
      return [{
        ...state, id: action.id, text: action.text, completed : false
      }];
    case 'toggle_TODO' :
        if(action.id!==state.id){
          return state;
        }
        return {...state, completed:!state.completed}

      default:
        return state;
}
}

function todos( state, action){
  switch (action.type) {
    case 'Add_TODO' :
      return todo(state, action);
    case 'toggle_TODO' :
      return state.map(t=>todo(t, action));

      default:
        return state;
  }
}

function testtoggleToDO(){

const initialState =[
  {
  id: 0,
  text: 'code all day',
  completed: false
},
{
  id: 1,
  text: 'Learn Redux',
  completed: false
}];
const action = {
    type : 'toggle_TODO',
    id: 1
}

const finalState = [
  {
  id: 0,
  text: 'code all day',
  completed: false
},
{
  id: 1,
  text: 'Learn Redux',
  completed: true
}];
deepFreeze(initialState);
deepFreeze(action);

expect(todos(initialState, action)).toEqual(finalState);
}
function testaddToDO(){
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

expect(todos(initialState, action)).toEqual(finalState);
}

testaddToDO();
testtoggleToDO();
console.log('Testpassed!');

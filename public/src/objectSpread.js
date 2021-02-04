import  expect from "expect";

function toggleTODO(state){
  return {...state, completed:!state.completed}
}

let initialState = {
  id : 1,
  text : "Code all day",
  completed : false
}
let finalState = {
  id : 1,
  text : "Code all day",
  completed : true
}

expect(toggleTODO(initialState)).toEqual(finalState);
console.log('Test passed!')

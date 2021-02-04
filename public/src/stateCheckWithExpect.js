import expect from 'expect';

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}
expect(reducer(1, { type: 'INCREMENT' })).toEqual(2);
expect(reducer(0, { type: 'INCREMENT' })).toEqual(1);
expect(reducer(1, { type: 'DECREMENT' })).toEqual(0);
expect(reducer(2, { type: 'DECREMENT' })).toEqual(1);
expect(reducer(1, { type: '' })).toEqual(1);
console.log('Test success!');

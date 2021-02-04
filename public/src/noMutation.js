import deepFreeze from 'deep-freeze';
import expect from 'expect';

function addCounter(list) {
  return [...list, 0]
}
function removeCounter(list, index) {
  return [
    ...list.slice(0, index),
    ...list.slice(index + 1)];
}
function incrementCount(list, index) {
  // let elements = [...list]
  // elements[index]++;
  // return elements;
  return [
    ...list.slice(0, index),
    list[index] + 1,
    ...list.slice(index + 1)];
}

const listBefore = [];
const listAfter = [0];
deepFreeze(listBefore);
expect(
  addCounter(listBefore)
).toEqual(listAfter);

const oldList = [2, 4, 6];
const newList = [2, 6];
deepFreeze(oldList);

expect(
  removeCounter(oldList, 1)
).toEqual(newList);

const firstList = [10, 20, 30];
const lastList = [10, 21, 30];
deepFreeze(firstList);

expect(
  incrementCount(firstList, 1)
).toEqual(lastList);
console.log('Test Passed!');

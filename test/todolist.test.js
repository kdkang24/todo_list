/* eslint-disable max-lines-per-function */
const Todo = require('./todo');
const TodoList = require('./todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  // your tests go here
  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  // toArray
  test('toArray returns a copy of this.todos array', () => {
    let copy = list.toArray();
    expect(copy).toEqual([todo1, todo2, todo3]);
  });

  // first
  test('first returns the first todo', () => {
    expect(list.first()).toBe(todo1);
  });

  // last
  test('last returns the last todo', () => {
    expect(list.last()).toBe(todo3);
  });

  // shift
  test('shift returns the first todo and removes it from todos', () => {
    expect(list.shift()).toBe(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  // pop
  test('pop returns the last todo and removes it from todos', () => {
    expect(list.pop()).toBe(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  // isDone
  test('isDone returns true if all todos are done', () => {
    // not done, should return false
    expect(list.isDone()).not.toBeTruthy();
    // mark all tasks done, should return true
    list.markAllDone();
    expect(list.isDone()).toBeTruthy();
  });

  // add
  test('add on a non-Todo object throws TypeError', () => {
    expect(() => list.add('new task').toThrow(TypeError));
    expect(() => list.add(123).toThrow(TypeError));
    // test adding new TodoList object
    let newList = new TodoList();
    expect(() => list.add(newList).toThrow(TypeError));
  });

  // itemAt
  test('itemAt returns todo at index', () => {
    // get valid index
    expect(list.itemAt(0)).toEqual(todo1);
    // get invalid index
    expect(() => list.itemAt(5555)).toThrow(ReferenceError);
  });

  // markDoneAt
  test('markDoneAt marks todo as done at index', () => {
    // valid indexes
    list.markDoneAt(0);
    list.markDoneAt(1);
    expect(todo1.isDone()).toBeTruthy();
    expect(todo2.isDone()).toBeTruthy();
    // throw ReferenceError if invalid index
    expect(() => list.markDoneAt(5555)).toThrow(ReferenceError);
  });

  // markUndoneAt
  test('markUndoneAt marks todo as undone at given index', () => {
    // mark all done and verify
    list.markDoneAt(0);
    list.markDoneAt(1);
    list.markDoneAt(2);
    expect(list.isDone()).toBe(true);
    // mark first and second todos undone and verify markUndoneAt
    list.markUndoneAt(0);
    list.markUndoneAt(1);
    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(true);
    // throw ReferenceError if invalid index
    expect(() => list.markUndoneAt(5555)).toThrow(ReferenceError);
  });

  // markAllDone
  test('markAllDone marks all todos as done', () => {
    list.markAllDone();
    expect(list.isDone()).toBe(true);
  });

  // removeAt
  test('removeAt removes todo at specified index', () => {
    // valid indexes
    list.removeAt(0);
    expect(list.toArray()).toEqual([todo2, todo3]);
    // invalid index throws ReferenceError
    expect(() => list.removeAt(5555)).toThrow(ReferenceError);
  });

  // toString 1
  test('toString1 returns string representation of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  // toString 2
  test('toString2 tests for the correct string when one todo is done', () => {
    let string = `---- Today's Todos ----
[X] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    list.markDoneAt(0);
    expect(list.toString()).toBe(string);
  });

  // toString 3
  test('toString3 tests for the correct string when all todos are done', () => {
    let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;

    list.markAllDone();
    expect(list.toString()).toBe(string);
  });

  // forEach
  test('forEach takes a callback and iterates over each todo', () => {
    let arr = [];
    list.forEach(todo => arr.push(todo));
    expect(arr).toEqual([todo1, todo2, todo3]);
  });

  // filter
  test('filter take a callback and returns a new filtered list', () => {
    let filteredList = list.filter(todo => todo.title === 'Buy milk');
    let filteredTodo = new TodoList(`Today's Todos`);
    filteredTodo.add(todo1);
    expect(filteredList).toEqual(filteredTodo);
  });
});
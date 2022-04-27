import {
  addToTheDom,
  onMount,
  createRemove,
  createTodosDiv,
  displayError,
} from './utils.js'

// Get Elements From the DOM
const main = document.getElementById('main')
const form = document.getElementById('form')
const input = document.getElementById('input')

// Create Todos on the DOM
createTodosDiv()

// Check if There was TodosList on this browser, if yes save them in the todosList, if not add new empty array
let todosList =
  JSON.parse(window.localStorage.getItem('myTodos')) || []

// Get remove btn
let removeBtn = todosList.length > 0 ? onMount(todosList) : null

// Handling Submit event
const handleSubmit = (e) => {
  e.preventDefault()
  const value = input.value
  if (value) {
    const hasTodo =
      window.localStorage.getItem('myTodos') &&
      JSON.parse(window.localStorage.getItem('myTodos')).find(
        (t) => t === value
      )
    if (!hasTodo) {
      todosList.push(value)
      addToTheDom(value)
      if (todosList.length === 1) {
        removeBtn = createRemove()
        removeBtn.addEventListener('click', handleRemove)
      }
      window.localStorage.setItem(
        'myTodos',
        JSON.stringify(todosList)
      )
    } else displayError('You already have a todo with this name')
    input.value = ''
  } else displayError('Input field must be filled')
}

// Handling remove event
const handleRemove = () => {
  todosList = []
  window.localStorage.removeItem('myTodos')
  while (todos.firstChild) {
    todos.removeChild(todos.firstChild)
  }
  removeBtn.style.display = 'none'
}

form.addEventListener('submit', handleSubmit)
removeBtn && removeBtn.addEventListener('click', handleRemove)

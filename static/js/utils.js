export const addToTheDom = (value) => {
  let newTodo = document.createElement('li')
  newTodo.classList.add('todo')
  newTodo.textContent = value
  let todoBtn = document.createElement('button')
  todoBtn.classList.add('todo-btn')
  todoBtn.classList.add('btn')
  todoBtn.textContent = 'Remove'
  todoBtn.addEventListener('click', () => {
    newTodo.style.display = 'none'
    let existingTodos = JSON.parse(
      window.localStorage.getItem('myTodos')
    )
    window.localStorage.setItem(
      'myTodos',
      JSON.stringify(existingTodos.filter((t) => t !== value))
    )
  })
  newTodo.appendChild(todoBtn)
  todos.prepend(newTodo)
}

export const onMount = (todosList) => {
  todosList.forEach((todo) => addToTheDom(todo))
  if (todosList.length > 0) {
    return createRemove()
  }
  return false
}

export const createRemove = () => {
  let removeBtn = document.createElement('button')
  removeBtn.classList.add('btn')
  removeBtn.setAttribute('id', 'remove-btn')
  removeBtn.textContent = 'Remove'
  main.appendChild(removeBtn)
  return removeBtn
}

export const createTodosDiv = () => {
  let todos = document.createElement('todos')
  todos.setAttribute('id', 'todos')
  main.appendChild(todos)
}

export const displayError = (errorText) => {
  let error = document.createElement('div')
  error.classList.add('error')
  error.textContent = errorText
  main.prepend(error)
  setTimeout(() => {
    error.style.display = 'none'
  }, 2000)
}

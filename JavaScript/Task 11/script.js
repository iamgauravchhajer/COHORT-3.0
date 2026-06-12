const todoContainer = document.querySelector('.todo-container')
const input = document.querySelector('input')
const addBtn = document.querySelector('.addBtn')

function taskCreation(value) {
    const taskList = document.createElement('div')
    const task = document.createElement('div')
    const taskLeft = document.createElement('div')
    const checkbox = document.createElement('input')
    const taskText = document.createElement('div')
    const taskActions = document.createElement('div')
    const editBtn = document.createElement('button')
    const deleteBtn = document.createElement('button')
    const faTrashCan = document.createElement('i')
    let checkboxStatus = false

    taskList.classList = "task-list"
    task.classList = "task"
    taskLeft.classList = "task-left"
    checkbox.classList = 'checkbox'
    taskText.classList = 'task-text'
    taskActions.classList = 'task-actions'
    editBtn.classList = 'edit-btn'
    deleteBtn.classList = 'delete-btn'
    faTrashCan.classList = 'fa-regular fa-trash-can'

    todoContainer.appendChild(taskList)
    taskList.appendChild(task)
    task.appendChild(taskLeft)
    task.appendChild(taskActions)
    taskLeft.appendChild(checkbox)
    taskLeft.appendChild(taskText)
    taskActions.appendChild(editBtn)
    taskActions.appendChild(deleteBtn)
    deleteBtn.appendChild(faTrashCan)

    taskText.innerHTML = value
    checkbox.type = 'checkbox'
    editBtn.innerHTML = 'Edit'

    deleteBtn.addEventListener('click', () => {
        taskList.remove()
    })

    editBtn.addEventListener('click', ()=>{
        let editText = prompt('enter your edited text')
        if(editText.trim() === '') return;
        taskText.innerHTML = editText
    })

    checkbox.addEventListener('click' , (elem)=>{
        if(checkboxStatus === false){
            checkboxStatus = true
            console.log('task completed')
        }else{
            checkboxStatus = false
            console.log('task incomplete')
        }
    })

}

addBtn.addEventListener('click', () => {
    if (input.value.trim() === '') return;
    taskCreation(String(input.value))
    input.value = ''
})



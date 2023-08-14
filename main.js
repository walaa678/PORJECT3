var todoArray = []; selectedIndex = -1;

function getSavedTodoItems(){
    const TodoItems = localStorage.getItem('todolist');
    todoArray = JSON.parse(TodoItems) || [];
    console.log('==todoArray==', todoArray);
    displayTOdoITEMS();
    
}
getSavedTodoItems();

function addTodoItem(){
   const todoInput = document.getElementById("todo-input")
   if(selectedIndex >= 0){
    todoArray[selectedIndex].text = todoInput.value;
    selectedIndex = -1;
     document.getElementById("todo-add-btn").innerHTML = 'Add';
    document.getElementById("todo-add-btn").classList.remove('edit');
   }else{
    todoArray.push({ text: todoInput.value, isDone : false});
   }
   
  todoInput.value ='';
  displayTOdoITEMS();
  savedTodoItems();
}

function savedTodoItems(){
    const TodoItems = JSON.stringify(todoArray)
    localStorage.setItem('todolist',TodoItems);
}

function displayTOdoITEMS(){
         document.getElementById("todo-list").innerHTML = '';
         todoArray.forEach((item,index)=>{
          appendTOdoItem(item,index);
        
    });
    
    if(!todoArray.length){
        document.getElementById("todo-list").innerHTML = '<p class="no-todo-items">No todo Items</p>'
    }
}

function appendTOdoItem(item,index){
    const todoList = document.getElementById("todo-list");
    const TodoItem = document.createElement("li");
    TodoItem.setAttribute('class','todo-item');

    if (item.isDone){
        TodoItem.classList.add('done');
    }
    const todoText = '<span class="todo-text">'+ item.text +'</span>';
    const EditButton = '<i class="fa fa-edit" onclick="editItem (' + index +' )"></i>';
    const closeButton = '<i class="fa fa-close" onclick="colseItem (' + index +' )"></i>';
    const doneButton =  '<i class="fa fa-check" onclick="markAsDone(' + index + ' )"></i>';
    TodoItem.innerHTML = todoText + EditButton + closeButton +doneButton;
    todoList.appendChild(TodoItem);
}
colseItem();

function colseItem(index){
    todoArray.splice(index,1);
    displayTOdoITEMS();
    savedTodoItems();
    
}

function markAsDone(index){
    todoArray[index].isDone = !todoArray[index].isDone;
    displayTOdoITEMS();
    savedTodoItems();
    console.log('==markAsDone===',todoArray[index])
}
markAsDone();

function editItem(index){
  selectedIndex = index;
  console.log('=selectedIndex ==',selectedIndex );
  document.getElementById("todo-input").value = todoArray[index].text;
  document.getElementById("todo-add-btn").innerHTML = 'Edit';
  document.getElementById("todo-add-btn").classList.add('edit');
  displayTOdoITEMS();
    savedTodoItems();
}
editItem();
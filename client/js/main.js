var todoApi = "http://localhost:3000/todos";


function start(){
    getTodo(renderTodo);
    handlePostTodo();
}

start();

// function get data
function getTodo(callback){
    fetch(todoApi)
    .then(function(response) {
        return response.json();
    })
    .then(callback)
}

function renderTodo(todos){
    var listBox = document.querySelector(".box-list-todo");
    var htmls = ``;
    todos.forEach(function(todo){
        var html = `<li class="todo-item-${todo.id}">
                        <h4>${todo.title}</h4>
                        <p align = "justify">${todo.content}</p>
                        <button onclick="handleDeleteTodo(${todo.id})" class="btn btn-danger">DELETE</button>
                        <button onclick="handleUpdateTodo(${todo.id})" class="btn btn-primary">EDIT</button>
                        <hr/>
                    </li>`
        htmls += html;
    })
    listBox.innerHTML = htmls;
}

// function post data
function postTodo(data, callback){
    var options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(todoApi, options)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
function handlePostTodo(){
    var submitBtn = document.querySelector("#submitTodo");
    submitBtn.onclick = function(){
        var title = document.querySelector('input[name="title"]').value;
        var content = document.querySelector('textarea[name="content"]').value;
        
        var data = {
            "title": title,
            "content": content
        }

        console.log(data);
        postTodo(data, function(){
            getTodo(renderTodo);
        })
    }
}

// function delete todo
function deleteTodo(id){
    var options = {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json'
        },
    }
    fetch(todoApi+`/${id}`, options)
        .then(function(response){
            return response.json();
        })
        .then(
            document.querySelector(`.todo-item-${todo.id}`).classList.remove()
        );
}
function handleDeleteTodo(id){
    deleteTodo(id);
}

//function update todo-item
function updateTodo(id, data, callback){
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch(todoApi+"/"+id, options)
        .then(function(response){
            return response.json();
        })
        .then(callback)
        .catch(err => {console.error(err);})
}
function handleUpdateTodo(id){
    var itemUpdate = document.querySelector(`.todo-item-${id}`);
    var formUpdate = document.querySelector('.form-todo');
    formUpdate.querySelector("h2").innerText = "Sửa công việc";

    var title = formUpdate.querySelector('input[name="title"]');
    var content = formUpdate.querySelector('textarea[name="content"]');

    var getTitle = itemUpdate.querySelector('h4').innerText;
    var getContent = itemUpdate.querySelector('p').innerText;

    title.value = getTitle;
    content.value = getContent;

    document.querySelector("#submitTodo").hidden = true;

    
    
    var submitEditBtn = document.querySelector('#submitEdit');
    submitEditBtn.hidden = false;

    submitEditBtn.onclick = function(){
        var data = {
            title: title.value,
            content: content.value,
        }
        updateTodo(id, data, function(){
            getTodo(renderTodo);
        })
    }

}
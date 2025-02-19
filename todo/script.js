const inputbox = document.getElementById('inputbox')
const addbtn = document.getElementById('addbtn')
const todolist = document.getElementById('todolist')

let edittodo = null;
const addtodo = () => {
    const inputtext = inputbox.value.trim();
    if (inputtext.length <= 0) {
        alert("You must write something to add in list")
        return false;
    }

    if (addbtn.value === "Edit") {
        updatelocalhost(inputtext);
        edittodo.target.previousElementSibling.innerHTML = inputtext;

        addbtn.value = "Add";
        inputbox.value = "";
    } else {
        const li = document.createElement('li')
        const p = document.createElement('p')
        p.innerHTML = inputtext;
        li.appendChild(p);

        const editbtn = document.createElement("button")
        editbtn.innerHTML = "Edit";
        editbtn.classList.add('btn', "editbtn")
        li.appendChild(editbtn);

        const delbtn = document.createElement("button")
        delbtn.innerHTML = "Remove";
        delbtn.classList.add('btn', "delbtn")//class name add to style it
        li.appendChild(delbtn);



        todolist.appendChild(li)
        inputbox.value = ""
        savelocalhost(inputtext);
    }


}
const update = (e) => {
    if (e.target.innerHTML === 'Remove') {
        todolist.removeChild(e.target.parentElement);
        deletelocalhost(e.target.parentElement);
    }
    if (e.target.innerHTML === 'Edit') {
        inputbox.value = e.target.previousElementSibling.innerHTML;

        inputbox.focus();
        addbtn.value = "Edit"
        edittodo = e;

    }
}

const savelocalhost = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

}

const getlocalhost = () => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {
            const li = document.createElement('li')
            const p = document.createElement('p')
            p.innerHTML = todo;
            li.appendChild(p);

            const editbtn = document.createElement("button")
            editbtn.innerHTML = "Edit";
            editbtn.classList.add('btn', "editbtn")
            li.appendChild(editbtn);

            const delbtn = document.createElement("button")
            delbtn.innerHTML = "Remove";
            delbtn.classList.add('btn', "delbtn")//class name add to style it
            li.appendChild(delbtn);



            todolist.appendChild(li)
        });
    }
}

const deletelocalhost = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    let todotext = todo.children[0].innerHTML;
    let todoindex = todos.indexOf(todotext);
    todos.splice(todoindex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));


}

const updatelocalhost = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));

    if (!todos) return;

    let oldtext = edittodo.target.previousElementSibling.innerHTML; // Get the old text
    let todoindex = todos.indexOf(oldtext); // Find the index of the old text

    if (todoindex !== -1) {
        todos[todoindex] = todo; // Update with the new text
        localStorage.setItem("todos", JSON.stringify(todos)); // Save back to localStorage
    }
};

// const updatelocalhost = (todo) => {
//     let todos = JSON.parse(localStorage.getItem("todos"))
//     let todoindex = todos.indexOf(todo)
//     todos[todoindex] = inputbox.value;
//     localStorage.setItem("todos", JSON.stringify(todos))
// }
addbtn.addEventListener('click', addtodo);
todolist.addEventListener('click', update)
document.addEventListener('DOMContentLoaded', getlocalhost)

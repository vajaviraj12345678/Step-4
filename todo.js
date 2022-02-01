const addBtn = document.getElementById('submit');
const deleteBtn = document.getElementById('submit1');

let inputArray = [];
let count = 0;
let index;

function addVal(event) {
    event.preventDefault();
    const userInput = document.getElementById('text-box').value;
    if (userInput == '') {
        alert("Please Enter The Task");
    } else {
        inputArray.push(userInput)
        document.getElementById('text-box').value = "";
        display();
    }
    deleteBtn.style.display="block";
}

function display() {
    for (let i = count; i < inputArray.length; i++) {

        count++;
        let newDiv = document.createElement("div");
        newDiv.classList.add("data");

        //Creating checkbox
        let checkBox = document.createElement("input");
        checkBox.setAttribute("type", "checkbox");
        checkBox.setAttribute("onClick", "checkVal(this)");
        checkBox.classList.add("checkBox");
        newDiv.appendChild(checkBox);

        //Creating textbox;
        let textBox = document.createElement("input");
        textBox.setAttribute("type", "text");
        textBox.setAttribute("value", `${inputArray[i]}`);
        textBox.setAttribute("onChange", "chanVal(this)");
        textBox.setAttribute("onfocusout", "focusOut(this)");
        textBox.setAttribute("disabled", true);
        textBox.classList.add("in-data");
        newDiv.appendChild(textBox);

        //Creating edit
        let editBtn = document.createElement('button');
        editBtn.innerHTML = '<i class = "far fa-edit"></i>';
        editBtn.setAttribute("onClick", "upVal(this)");
        editBtn.classList.add("edit-btn");
        newDiv.appendChild(editBtn);

        //Creating delete
        let deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class = "far fa-trash"></i>';
        deleteBtn.setAttribute("onClick", "delVal(this)");
        deleteBtn.classList.add("delete-btn");
        newDiv.appendChild(deleteBtn);
        data1.appendChild(newDiv);
    }
}


//Deleting Data
function delVal(e) {
    let item = e.previousSibling.previousSibling.value;
    for (let i = 0; i < inputArray.length; i++) {
        if (inputArray[i] == item && confirm('Are you sure to delete this record ?')) {
            inputArray.splice(i, 1);
            count--;
        }
        }
    e.parentNode.remove();
    return inputArray;
}

//Striking The Task
function checkVal(e) {

    if (e.checked) {
        let text = e.nextSibling;
        text.id = "newText";
        swal({
            title: "Task",
            text: "Task is completed",
            icon: "success",
            button: "Submit",
        });
    } else {
        let text = e.nextSibling;
        text.removeAttribute("id");
    }
}

//Removing The Disabled Property Of TextBox To Edit
function upVal(e) {
    let txt = e.previousSibling;
    index = inputArray.indexOf(txt.value);
    txt.previousSibling.checked = false;
    txt.removeAttribute("disabled");
    txt.removeAttribute("id");
    txt.focus();
    txt.setSelectionRange(txt.value.length, txt.value.length);
}

//Function the disable the textbox if clicked outside of it
function focusOut(e)
{
    e.setAttribute("disabled", true);
}

//Using OnChange Function To Change The Value
function chanVal(e) {
    e.previousSibling.checked = false;
    e.setAttribute("disabled", false);
    let value = e.value;
    for (let i = 0; i < inputArray.length; i++) {
        if (i == index) {
            inputArray[i] = value;
        }
    }
    return inputArray;
}

var input = document.getElementById("text-box");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("submit").click();
  }
});

function remove()
{
    location.reload();
    deleteBtn.style.display="none";
}

addBtn.addEventListener('click', addVal);
deleteBtn.addEventListener('click', remove);

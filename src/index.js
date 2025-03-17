document.addEventListener("DOMContentLoaded", () => {
  // your code here 
  const form = document.getElementById("create-task-form"); // get reference to the form.
  const taskList = document.getElementById("tasks"); // acess the parent element holding our list, ul element with id="tasks".
  const newDescription = document.getElementById("new-task-description") // Target the input field where the user will enter task description.
  const listDivContainer = document.getElementById("list"); // get reference to the list container.
  const mainContentDiv = document.getElementById("main-content"); // Target the main content parent div element.

  let submitEventCount = 0; // Track the number of tasks added. If 5 are added, disable or remove input.
  
  // listen for "submit" event on the form. Pass event object to it.
  form.addEventListener("submit", function(eventObject) {
    eventObject.preventDefault(); // prevent default submission when page reloads.
    submitEventCount++; // increment task count each time submit button is triggered.

    console.log("Our event object:", eventObject); // The event object is passed to the handler
    console.log("You entered a New Task:", newDescription);

    const newListElement = document.createElement("li"); // let's create list element.
    // lets create a button which will help us to delete the list we create.
    const buttonToDeleteList = document.createElement("button");

    buttonToDeleteList.textContent = "Delete"; // indicate to the user, the Delete button.
    buttonToDeleteList.style.color = "red"; // style delete button to red.
    buttonToDeleteList.style.fontSize = ".7rem";

    // lets include eventListener to the delete button.
    buttonToDeleteList.addEventListener("click", () => deleteTaskFromTheList(newListElement)); // pass the created list so it can be removed by deleteTaskFromTheList.
    
    /// const taskList = document.getElementById("tasks"); // acess the parent element holding our list, ul element with id="tasks".
    
    newListElement.textContent = newDescription.value; // Get newDescription value and add it to the <li> we created.
    newListElement.appendChild(buttonToDeleteList); // append the delete button to the newly created 'li' DOM element.
    
    taskList.appendChild(newListElement); // add the 'li' to the right parent. The ul element with id="tasks".

    newDescription.value = ''; // Clear the input field after adding the task.

    // target the element that trigered the event.
    console.log("event.target:", eventObject.target); // log the DOM element, and its structure when the event occured.
    eventObject.target.style.color = "purple"; // Logs the color of the target element.
    eventObject.target.style.filter = "saturate(.8)"; // Reduce color saturation to 80%
    eventObject.target.style.opacity = ".2rem"; // Logs the background color of the tarhet element.
    // Check if the submit button has been clicked 5 times.
    if (submitEventCount === 5) {
      eventObject.target.textContent = "Congratulations. Your 5 Tasks have been added Succesfully!";
    }
  });

  // A delete function that will remove tasks('li') as a child of the ordered list in the DOM.
  function deleteTaskFromTheList(deleteTask) {
    deleteTask.remove();
  };


  // An additional input field (e.g. user, duration, date due)
  listDivContainer.style.width = "50%"; // Increase the wisth of list for better visibility.

  // new input field for the user:
  const parentInputDiv = document.createElement("div"); // let's create label for our input element.
  
  // label
  const labelForuserNameInput = document.createElement("label"); // let's create label for our input element.
  labelForuserNameInput.setAttribute = ("for", "user-name-input");
  labelForuserNameInput.innerText = "User Name:";
  
  // input element
  const userNameInputElement = document.createElement("input"); // let's create another input element.
  userNameInputElement.setAttribute("type", "text");
  userNameInputElement.placeholder = "Enter your Name";
  userNameInputElement.style.marginLeft = ".2rem";

  // button to effect the user-name
  const personalizeTodos = document.createElement("button"); // button to personalize todos.
  personalizeTodos.setAttribute("type", "button");
  personalizeTodos.value = "button"; // value of our button
  personalizeTodos.textContent = "Personalize Todo";
  personalizeTodos.style.height = "1.25rem";
  personalizeTodos.style.marginLeft = ".2rem";
  personalizeTodos.style.width = "7.25rem";
  personalizeTodos.style.fontSize = '.7rem';


  // append the newly created elements to the parent div we created.
  parentInputDiv.appendChild(labelForuserNameInput);
  parentInputDiv.appendChild(userNameInputElement);
  parentInputDiv.appendChild(personalizeTodos);

  // Append the new div to the existing div with id "divmain"
  mainContentDiv.appendChild(parentInputDiv);

  reflectUserInputOnTheDOM(personalizeTodos, userNameInputElement) // call the reusable function.
  
  // Create the event listener for the button.
  // A reusable function to add DOM effect when user clicks button.
  function reflectUserInputOnTheDOM(clickedButton, InputElement) {
    clickedButton.addEventListener("click", function(event) { // pass event object to the handler.
      const receivedValue = InputElement.value; // Get the input value
      const listHeader = document.querySelector("h2"); // we'll update its text content with userNameInputElement, otherwise append a new element to it for our todo description.
  
      if (InputElement == userNameInputElement) {
        // Update the list header with the entered name
        if (receivedValue.trim() !== '') {
          listHeader.textContent = `${receivedValue}'s Todos`; // Update the list header for the todos.
        } else {
          listHeader.textContent = 'Please enter a valid name.'; // Handle empty input
        }
      } else if (InputElement == descriptiveInputElement) {
        // append new div to listHeader
        const descriptionDiv = document.createElement("div"); // create new div element to hold the description
        descriptionDiv.textContent = receivedValue; // get value from InputElement and update the new div with that value
        descriptionDiv.style.color = "green"; 
        descriptionDiv.style.marginTop = ".5rem";
        descriptionDiv.style.fontSize = "1rem";
        
        listHeader.appendChild(descriptionDiv); 
      }

      // target the element that trigered the event.
      console.log("event.target:", event.target); // log the DOM element, and its structure when the event occured.
      event.target.textContent = "Clicked!";  // Changes button text to "Clicked!".
      event.target.style.backgroundColor = "lightblue"; // Logs the background color of the clicked button.

    });
  };
  
  // Textarea and Description of the Todo List.
  // label
  const labelForuserDescriptionInput = document.createElement("label"); // let's create label for our input element.
  labelForuserDescriptionInput.setAttribute = ("for", "todo-description");
  labelForuserDescriptionInput.innerText = "Description of the Todo:";
  
  // input element
  const descriptiveInputElement = document.createElement("textarea"); // let's create another input element.
  descriptiveInputElement.setAttribute("type", "text");
  descriptiveInputElement.placeholder = "Describe your Todo";
  descriptiveInputElement.style.marginLeft = ".2rem";
  descriptiveInputElement.style.marginTop = "4.2rem";
  descriptiveInputElement.style.height = "4.2rem";

  // button to effect the description
  const addTodoDescription = document.createElement("button"); // button to personalize todos.
  addTodoDescription.setAttribute("type", "button");
  addTodoDescription.value = "button"; // value of our button
  addTodoDescription.textContent = "Save Description";
  addTodoDescription.style.height = "2.25rem";
  addTodoDescription.style.marginLeft = ".2rem";
  addTodoDescription.style.width = "4.25rem";
  addTodoDescription.style.fontSize = '.7rem';

  // append the newly created elements to the parent div we created.
  parentInputDiv.appendChild(descriptiveInputElement);
  parentInputDiv.appendChild(addTodoDescription);

  reflectUserInputOnTheDOM(addTodoDescription, descriptiveInputElement) // call the reusable function.
});



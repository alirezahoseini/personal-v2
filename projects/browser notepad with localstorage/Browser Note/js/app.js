// variables

//access to the note list
const noteList = document.querySelector("#note-list");




// eventlisteners
eventListeners()
function eventListeners(){
    
    // form validation
    document.querySelector("#saveButton").addEventListener("click", formValidation);

    // remove note as noteList
    noteList.addEventListener("click", removeNote);

    // get data from localstorage onload
    document.addEventListener("DOMContentLoaded", getDataFromLocalStorageLoaded);

}





//functions

// form validation function
function formValidation(e){
    e.preventDefault();

    // access to the input value
    const note = document.querySelector("#note").value;

    // form validation white if else //
    if(note === null || note === "" || note === " "){
        alert("هیچ یادداشتی نوشته نشده است")
    }else{
        newNote()
    }
}

// adding new note
function newNote(e){
    
    // access to the input value
    const note = document.querySelector("#note").value;

    // created <p> tag 
    const p = document.createElement("p");

    // adding note to <p> tag
    p.appendChild(document.createTextNode(note));

    // created remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "x";
    removeButton.classList.add("removeButton");

    // created <li> tag 
    const li = document.createElement("li");

    // adding <p> and remove button to the <li>
    li.appendChild(p);
    li.appendChild(removeButton);

    // adding li to the notelist
    noteList.appendChild(li);

    addNewNoteFromLocalStorage(note);
}

// remove note from note list
function removeNote(e) {
    // click deligation
    if(e.target.classList.contains("removeButton")){
        e.target.parentElement.remove();
    }

    // also remove note from localStorage
    removeNoteFromLocalStorage(e.target.parentElement.textContent);
}

// add new note to the localStorage
function addNewNoteFromLocalStorage(note) {
    // access to the notes frome localStorage
    const notes = oldNotesFromLocalStorage();

    // push new note notes array
    notes.push(note);

    // setNew item to the localStorage
    localStorage.setItem("notes", JSON.stringify(notes));
}

// checking old notes frome the localStorage
function oldNotesFromLocalStorage(){
    let notes;
    // access to notes key from LS
    const localStorageNotes = localStorage.getItem("notes");

    // checking localStorage values
    if(localStorageNotes === null){
        notes = [];
    }else{
        // local value convert string to array
        notes = JSON.parse(localStorageNotes);
    }
    // send to addNewNoteFromLocalStorage()
    return notes;
}

// get data form local storage onloaded
function getDataFromLocalStorageLoaded() {
    // access to local storage data
    const notes = oldNotesFromLocalStorage();

    // print notes to list as localStorage onload page
    notes.forEach(function(note) {
        // created <p> tag 
        const p = document.createElement("p");

        // adding note to <p> tag
        p.appendChild(document.createTextNode(note));

        // created remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "x";
        removeButton.classList.add("removeButton");

        // created <li> tag 
        const li = document.createElement("li");

        // adding <p> and remove button to the <li>
        li.appendChild(p);
        li.appendChild(removeButton);

        // adding li to the notelist
        noteList.appendChild(li);
    });
}


// also reomve note in localStorage
function removeNoteFromLocalStorage(noteContent){
    // delete x as noteContent
    let noteDelete = noteContent.substring(0, noteContent.length -1);

    // access to noteList 
    const notesFromLs = oldNotesFromLocalStorage();

    notesFromLs.forEach(function (note, index) {
        if (noteDelete === note){
            notesFromLs.splice(index, 1);
        }
        
    });

    localStorage.setItem("notes", JSON.stringify(notesFromLs));
    
}
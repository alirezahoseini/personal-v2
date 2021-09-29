// -----------------------------------------variables

// accsee to the input 
const userNameInput = document.querySelector("#name"),
      emailInput = document.querySelector("#email"),
      passWordInput = document.querySelector("#password");



// ----------------------------------------eventListeners
eventListeners();
function eventListeners(){

    // adding active class to label
    userNameInput.addEventListener("focus", addActiveClassToLabel)
    emailInput.addEventListener("focus", addActiveClassToLabel)
    passWordInput.addEventListener("focus", addActiveClassToLabel)


    // inputs validation 
    userNameInput.addEventListener("blur", removeActiveClassToLabel)
    emailInput.addEventListener("blur", removeActiveClassToLabel)
    passWordInput.addEventListener("blur", removeActiveClassToLabel)


}





// ------------------------------------------ functions


// add active class to labels 
function addActiveClassToLabel(e){

    // access to label 
    const activeLabel = e.target.parentElement.firstElementChild;


    // add active class
    activeLabel.classList.add("active");

    // remove active class as input

}


// remove active class as input
function removeActiveClassToLabel(e){
    if(e.target.value === "" || e.target.value === null ){
        e.target.parentElement.firstElementChild.classList.remove("active")
    }
}
// -----------------------------------------variables

// accsee to the input 1 . 1
const userName = document.querySelector("#name"),
    email = document.querySelector("#email"),
    passWord = document.querySelector("#password"),
    myForm = document.querySelector("form");


// access to the submit button 
const submitBtn = document.querySelector("#submit-form");




// ----------------------------------------eventListeners
eventListeners();
function eventListeners() {

    // form init 
    document.addEventListener("DOMContentLoaded", formInit)

    // inputs validation 
    userName.addEventListener("blur", inputValidation)
    email.addEventListener("blur", inputValidation)
    passWord.addEventListener("blur", inputValidation)

    // submit form 
    myForm.addEventListener("submit", submitForm)

}





// ------------------------------------------ functions

// form init 
function formInit(e) {

    // disabeld submit button
    submitBtn.disabled = true;

}

// input Validation
function inputValidation() {

    // checking inpute type
    if (this.type === "email") {
        // cheking email value
        chekingEmail(this);
    } else {
        // chcking null value ====> send field to
        checkingNullValue(this);
    }

    // cecking errors in the form
    const errors = document.querySelectorAll(".error");

    // finish check and submit form
    if (email.value !== "" && userName.value !== "" && passWord.value !== "") {
        if (errors.length == 0) {
            submitBtn.disabled = false;
        }
    }
}

// check value is null
function checkingNullValue(field) {

    // checking and adding styly & error class
    if (field.value.length === null || field.value.length === "" || field.value.length === 0) {
        // adding false style and error style
        field.style.borderBottomColor = "red";
        field.classList.add("error")
    } else {
        // adding true style and remove error class
        field.style.borderBottomColor = "green";
        field.classList.remove("error")
    }
}


// cheking email @ charakter
function chekingEmail(field) {
    // access field value 
    const emailValue = field.value.includes("@");

    if (emailValue === false) {
        // adding false style and error style
        field.style.borderBottomColor = "red";
        field.classList.add("error")
    } else {
        // adding true style and remove error class
        field.style.borderBottomColor = "green";
        field.classList.remove("error")
    }
}


// form submit
function submitForm(e) {
    e.preventDefault();

    // access to loaders elements
    const loaders = document.querySelector("#loaders");

    // access to the loading gif
    const loadingGif = document.querySelector("#loading-gif");

    // add active class to loaders
    loaders.classList.add("active");

    // chenge body bg color
    const body = document.querySelector("body");
    body.classList.add("light");

    setTimeout(function () {
        // cheng gif
        loadingGif.src = "./files/image/mail.gif";
        loadingGif.style.width = "140px";

        // remove loaders and reset form
        setTimeout(() => {
            body.classList.remove("light");
            loaders.classList.remove("active");
            myForm.reset();
        }, 5000);

    }, 5000);
}
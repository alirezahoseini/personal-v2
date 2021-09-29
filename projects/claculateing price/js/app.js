// Variables

// access to the form
const form = document.querySelector('form');

// created new insurance constructor
let insurance;

// the final price
let finalPrice;

// created new Htmli ui
const htmlui = new HTMLUI();



// Eventlisteners
eventlisteners()
function eventlisteners() {
    //after  page loaded run class
    document.addEventListener("DOMContentLoaded", function () {
        // created last 20 year option to select box
        htmlui.createdYearOption()
    });

    // access values after submit form 
    form.addEventListener("submit", function (e) {
        e.preventDefault();


        // access to the form values
        let make = document.querySelector("#make"),
            year = document.querySelector("#year"),
            level = document.querySelector("input[name='level']:checked").value;

        // adding input values to the insurance
        insurance = new Insurance(make, year, level)

        if (make.value === "" || year.value === "" || level === "") {
            htmlui.displayError("لطفا تمام مقادیر را وارد کنید");
        } else {
            // clculating price
            insurance.calculatePrice();
        }
    })
}





// Objects


/////////////////////////////// Variables

// created New Budget Class
let budget = new Budget();

// created New Html Class
const html = new Html();

// created New LocalStorage Class
const localSt = new LocalST();

// user total budget 
let totalBudget;

// user left budget
let leftBudget;

// created expenses array
let expenses;

// access to expense-form for take and make new expense
const expenseForm = document.querySelector("#expense-form");



/////////////////////////////// Eventlisteners
eventlisteners();
function eventlisteners() {

    // local storage cheked budget
    document.addEventListener("DOMContentLoaded", function () {

        // checking expenses to local storage
        if (localStorage.getItem("expenses") === null) {
            // created expenses array
            expenses = [];
        } else {
            // insert old expense to expenses 
            expenses = localSt.getValue("expenses")
        }

        // cheked local storage
        const lsBudget = localSt.getValue("totalBudget");

        // show and hidde take budget form
        if (lsBudget === null) {
            // hidde take budget form
            html.removeActiveClass("#content");

            // show content
            html.addActiveClass("#take-budget");
        } else {
            // hidde take budget form
            html.removeActiveClass("#take-budget");

            // show content
            html.addActiveClass("#content");

            // set ls budget to total and left budget
            totalBudget = lsBudget;
            leftBudget = localSt.getValue("leftBudget");

            // insert total budget to html
            html.insertValue("#total span", totalBudget);
            html.insertValue("#left span", leftBudget);

            // insert old expense from local storage to expense list
            budget.insertOldExpenseFromLocalStorage();
        }
    });

    // take user budget from take form
    document.querySelector("#take-budget").addEventListener("submit", function (e) {
        e.preventDefault();
        // take user budget from input value
        const budgetTotal = document.querySelector("#budget").value;

        // take budget input validation
        if (budgetTotal.length < 6) {
            html.errMessage("حداقل بودجه باید بیشتر از 100 هزارتومان باشد", ".err-box");
        } else if (budgetTotal < 0) {
            html.errMessage("نمی توانید از اعداد منفی استفاده کنید", ".err-box");
        } else {

            // hidde take budget form
            html.removeActiveClass("#take-budget");

            // show content
            html.addActiveClass("#content");

            // set Total and left Budget to the Local Storage
            localSt.setValue(budgetTotal, "totalBudget");
            localSt.setValue(budgetTotal, "leftBudget");

            // set budget to total and left budget
            totalBudget = budgetTotal;
            leftBudget = budgetTotal;

            // insert total and left budget to html
            html.insertValue("#total span", totalBudget);
            html.insertValue("#left span", leftBudget);
        }
    });

    // created New expense affter submit expenseForm
    expenseForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // access the value of inputs
        const userExpense = document.querySelector("#expense-form  #expense").value;
        const userAmount = document.querySelector("#expense-form  #amount").value;

        // form validation
        if (userAmount === null || userAmount === "" || userAmount === 0 || userAmount < 100) {
            html.errMessage("لطفا مبلغ هزینه را وارد کنید.!", ".err-box2");
        } else if (userExpense === null || userExpense === "" || userExpense === " ") {
            html.errMessage("لطفا عنوان هزینه را وارد نمایید", ".err-box2");
        } else if (userAmount.length < 3) {
            html.errMessage("مبلغ هزینه باید بیشتر از 100 تومان باشد", ".err-box2");
        } else if (userAmount > Number(localSt.getValue("leftBudget"))) {
            html.errMessage("مبلغ هزینه بیشتر از باقی مانده بودجه شماست", ".err-box2");
        } else {
            // created new date
            const newDate = new Date().toLocaleDateString();
            // created new expense
            budget.addExpense(userExpense, userAmount, newDate);

            // Low off leftBudget
            if (localSt.getValue("leftBudget") === null) {
                budget.lowOffBudget(userAmount, leftBudget);
            } else {
                budget.lowOffBudget(userAmount, localSt.getValue("leftBudget"));
            }

            // reset form
            expenseForm.reset()

            // left budget colkor chenger
            html.leftBudgetColorChenger(localSt.getValue("leftBudget"), totalBudget);
        }
    });

    // clear all data in local storage
    document.querySelector("#clear").addEventListener("click", function () {
        localStorage.clear();
        location.reload();
    });
}

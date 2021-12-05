////// everything in budget 
class Budget {

    // add new expense
    addExpense(expense, amount, newDate) {

        // created new expense
        expenses.push({ expense, amount ,newDate });
        // adding new expense to local storage
        localStorage.setItem("expenses", JSON.stringify(expenses));

        // access to the expense list
        const expenseList = document.querySelector("#expense-list");

        // created li tag
        const li = document.createElement("li");
        li.innerHTML = `
            ${expense}<i>${newDate}</i><span>${amount}</span>
        `;

        // append li to expense list
        expenseList.appendChild(li);
    }

    // insert old expense from local storage to expense list
    insertOldExpenseFromLocalStorage() {
        // access to old expense
        const oldExpenses = JSON.parse(localStorage.getItem("expenses"));

        // insert old expense to html
        oldExpenses.forEach(element => {
            // access to the expense list
            const expenseList = document.querySelector("#expense-list");

            // created li tag
            const li = document.createElement("li");
            li.innerHTML = `
                ${element.expense}<i>${element.newDate}</i><span>${element.amount}</span>
            `;

            // append li to expense list
            expenseList.appendChild(li);

            // left color chenger from local storage
            const leftElement = document.querySelector("#left");
            leftElement.classList.add(localSt.getValue("leftColor"));
        });
    }

    // lowing off userAmount as leftBudget
    lowOffBudget(amount, left) {
        // low off amount as left budget 
        const newLeftBudget = left - amount;
        // update local storage
        localSt.setValue(newLeftBudget, "leftBudget");
        // update html
        html.insertValue("#left span", newLeftBudget);
    }
}


////// everything in HTML
class Html {
    // show all errors in html
    errMessage(message, element) {

        // access to the error box element
        const errBox = document.querySelector(element);

        // created P tag
        let p = document.createElement("p");

        // created message template
        p.innerHTML = message;

        // append p to errBox
        errBox.appendChild(p);

        // remove and hidden errors 
        setTimeout(() => {
            p.remove();
        }, 5000);
    }

    // add Active class to HTML Element
    addActiveClass(element) {
        // access to the element
        const el = document.querySelector(element);
        // add active class
        el.classList.add("active");
    }
    // remove Active class to HTML Element
    removeActiveClass(element) {
        // access to the element
        const el = document.querySelector(element);
        // remove active class
        el.classList.remove("active");
    }

    // insert value to html
    insertValue(element, value) {
        // access to the element
        const el = document.querySelector(element);

        // insert value
        el.innerHTML = value;
    }

    // left budget color chenger'
    leftBudgetColorChenger(left, total) {
        // access to left budget element in html 
        const el = document.querySelector("#left");

        // created left color in local storage
        let leftColor = localSt.setValue("alert-success", "leftColor");
        // vialidation 
        if ((total / 4) > left) {
            el.classList.add("alert-danger");
            leftColor = localSt.setValue("alert-danger", "leftColor");
        } else if ((total / 2) > left) {
            el.classList.add("alert-warning");
            leftColor = localSt.setValue("alert-warning", "leftColor");
        }
    }
}



/////// everything in Local Storage
class LocalST {
    // set value to local storage
    setValue(value, key) {
        // convert value to string
        const myValue = JSON.stringify(value);
        localStorage.setItem(key, myValue);
    }

    // get item from locl storage
    getValue(key) {
        // access to the value
        return JSON.parse(localStorage.getItem(key));
    }
}


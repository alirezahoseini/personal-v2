// Classes

// everything in the html
class HTMLUI{

    // adding active to class list
    addingActiveClass(element){
        // access to element
        const myElement = document.querySelector(element);

        // adding class
        myElement.classList.add("active");
    }

    // remove active to class list
    removeActiveClass(element){
        // access to element
        const myElement = document.querySelector(element);

        // remove class
        myElement.classList.remove("active");
    }
}
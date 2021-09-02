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

    // page scroll progress bar
    pageScrollProgress(progressBar){
        // access to the scroll top
        const scrollTop = document.documentElement.scrollTop;
        // access to the full height scroll bar
        const fullScrollHeight = document.documentElement.scrollHeight;
        // access to the client scroller height
        const scrollerHeight = document.documentElement.clientHeight;

        // calculateing scroll final value
        const finalScrollValue = (scrollTop) / (fullScrollHeight - scrollerHeight) * 100;

        // adding scroll value to the progress bar
        progressBar.style.width = `${finalScrollValue}%`

    }

    
}
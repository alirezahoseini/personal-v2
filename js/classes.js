// Classes

// everything in the html
class HTMLUI {

    // adding active to class list
    addingActiveClass(element) {
        // access to element
        const myElement = document.querySelector(element);

        // adding class
        myElement.classList.add("active");
    }

    // remove active to class list
    removeActiveClass(element) {
        // access to element
        const myElement = document.querySelector(element);

        // remove class
        myElement.classList.remove("active");
    }

    // access to the page scroll progress value
    pageScrollProgressValue() {
        // access to the scroll top
        const scrollTop = document.documentElement.scrollTop;
        // access to the full height scroll bar
        const fullScrollHeight = document.documentElement.scrollHeight;
        // access to the client scroller height
        const scrollerHeight = document.documentElement.clientHeight;

        // calculateing scroll final value
        const finalScrollValue = (scrollTop) / (fullScrollHeight - scrollerHeight) * 100;

        return finalScrollValue;
    }

    // access element position x,y and add custom class
    addCustomClassToElementInShowEvent(element, customClass){
        // access to element
        const myElement = document.querySelector(element);

        // access to element offset top + user window height / 2
        const offset = myElement.offsetTop + (window.innerHeight / 2);

        // add custom class to element after scroll
        var myScrollFunc = function() {
            // access to scroll y
            let y = window.scrollY;
            // adding class
            if (y >= offset) {
            myElement.classList.add(customClass);
            }
        };
        
        myScrollFunc();
    }


    // Dark mode switcher
    darkModeSwitcher(bodyTheme, body, element) {
        /*
        bodyTheme: true ===> dark theme Enable
        bodyTheme: false ===> light theme Enable
        */
        if (bodyTheme == false) {
            // adding dark class and enabled dark mode
            body.classList.add("dark");

            // chenge switcher icon 
            element.style.backgroundImage = `url("./files/icons/dark/sun.svg")`;

            // switch animate
            element.style.transform = "rotate(40deg)"

            // chenge icons src
            document.querySelector("#hamberger-btn img").src = "./files/icons/dark/list.dark.svg";

            // set dark theme to LocalStorage
            localS.setItem("theme", "dark")
            
        } else {
            // removing dark class
            body.classList.remove("dark");

            // chenge switcher icon 
            element.style.backgroundImage = `url("./files/icons/moon.svg")`;

            // switch animate
            element.style.transform = "rotate(0deg)";

            // chenge icons src
            document.querySelector("#hamberger-btn img").src = "./files/icons/list.svg";

            // set light theme to localStorge
            localS.setItem("theme", "light")
        }

    }

    // chenge theme after loaded page
    setThemeFromLsAfterLoaded(theme, body, element){
        if (theme == "dark") {
            // adding dark class and enabled dark mode
            body.classList.add("dark");

            // chenge switcher icon 
            element.style.backgroundImage = `url("./files/icons/dark/sun.svg")`;

            // switch animate
            element.style.transform = "rotate(40deg)"

            // chenge icons src
            document.querySelector("#hamberger-btn img").src = "./files/icons/dark/list.dark.svg";
            
        } else {
            // removing dark class
            body.classList.remove("dark");

            // chenge switcher icon 
            element.style.backgroundImage = `url("./files/icons/moon.svg")`;

            // switch animate
            element.style.transform = "rotate(0deg)";

            // chenge icons src
            document.querySelector("#hamberger-btn img").src = "./files/icons/list.svg";

        }
    }
}


// evrey thing in Loacal Storage
class LocalStorage{
 
    // set value in LocalStorage
    setItem(key, value){
        localStorage.setItem(key, value);
    }

    // access to value from localStorage
    getItem(key){
        return localStorage.getItem(key)
        
    }

    // delete key in localStorage
    removeItem(key){
        localStorage.removeItem(key);
    }

    // clear value in LocalStorage
    cleareAll(){
        localStorage.clear();
    }
}
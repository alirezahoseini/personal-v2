// Variables

// created new HTML UI
const htmlui = new HTMLUI();

// created new LocalStorage
const localS = new LocalStorage();






// Eventlistener
eventlistener();
function eventlistener() {

    // chenge header style after 
    document.addEventListener("scroll", chengeHeaderStyle);

    // show hamberger menu
    document.querySelector("#hamberger-btn").addEventListener("click", function () {
        // adding active to class list
        htmlui.addingActiveClass("#hamberger-menu");
    });

    // hide hamberger menu
    document.querySelector("#hamberger-bg").addEventListener("click", function () {
        // removing active to class list
        htmlui.removeActiveClass("#hamberger-menu");
    })

    // go up button
    window.addEventListener("scroll", goUpBtn);

    // check theme from local storage value after page loaded
    document.addEventListener("DOMContentLoaded", setThemeFromLocalStorage)

    // dark mode switcher
    document.querySelector("#dark-switcher").addEventListener("click", darkMode);

    
}






// Objects

// chenge header style after scroll page
function chengeHeaderStyle(){
    // access to the page scroll
    const scroll = htmlui.pageScrollProgressValue();

    if (scroll > 5) {
        htmlui.addingActiveClass("header")
    } else {
        htmlui.removeActiveClass("header")
    }

}

// set them from local storage after page loaded
function setThemeFromLocalStorage(){
    // access to ls value
    const theme = localS.getItem("theme");
    
    // access to the body
    const body = document.querySelector("body");

    // access to the switcher
    const element = document.querySelector("#dark-switcher")

    //set theme
    htmlui.setThemeFromLsAfterLoaded(theme, body, element);
}

// dark mode 
function darkMode(e){
    // access to the body
    const body = document.querySelector("body");

    // access to the switcher
    const element = e.target;

    // chenge
    localS.setItem("theme", " ");

    /*
    bodyTheme: true ===> dark theme Enable
    bodyTheme: false ===> light theme Enable
    */
    // access to the body Theme
    const bodyTheme = body.classList.contains("dark");

    // enable and disable dark mode
    htmlui.darkModeSwitcher(bodyTheme, body, element);
}

// go to up button
function goUpBtn(){

    // access to the page scroll value
    const scrollValue = htmlui.pageScrollProgressValue();

    // show and hide go up btn
    if (scrollValue > 20){
        // hidden go up button
        htmlui.addingActiveClass("#go-up");
    }else{
        // show go up button
        htmlui.removeActiveClass("#go-up");
    }
}

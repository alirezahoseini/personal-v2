// Variables

// created new HTML UI
const htmlui = new HTMLUI();






// Eventlistener
eventlistener();
function eventlistener() {
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

    // page scroll progress bar
    window.addEventListener("scroll", showProgress);

    // go up button
    window.addEventListener("scroll", goUpBtn);

    // dark mode switcher
    document.querySelector("#dark-switcher").addEventListener("click", darkMode);
    
}







// Objects

// dark mode 
function darkMode(e){
    // access to the body
    const body = document.querySelector("body");

    // access to the switcher
    const element = e.target;

    /*
    bodyTheme: true ===> dark theme Enable
    bodyTheme: false ===> light theme Enable
    */
    // access to the body Theme
    const bodyTheme = body.classList.contains("dark");

    // enable and disable dark mode
    htmlui.darkModeSwitcher(bodyTheme, body, element);
}

// show scroll progress bar
function showProgress() {
    // access to the progress bar
    const progressBar = document.querySelector("#progress-bar");

    // active progress bar after scrolling page
    const progressValue = htmlui.pageScrollProgressValue();

    // adding scroll value to the progress bar width
    progressBar.style.width = `${progressValue}%`;

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

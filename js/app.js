// Variables

// created new HTML UI
const htmlui = new HTMLUI();






// Eventlistener
eventlistener();
function eventlistener(){
    // show hamberger menu
    document.querySelector("#hamberger-btn").addEventListener("click", function(){
        htmlui.addingActiveClass("#hamberger-menu");
    });

    // hide hamberger menu
    document.querySelector("#hamberger-bg").addEventListener("click",function(){
        htmlui.removeActiveClass("#hamberger-menu");
    })

    // page scroll progress bar
    window.addEventListener("scroll", function(){
        // access to the progress bar
        const progressBar = document.querySelector("#progress-bar");

        // active progress bar after scrolling page
        htmlui.pageScrollProgress(progressBar);
    })
}







// Objects
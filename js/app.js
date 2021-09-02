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
}





// Objects
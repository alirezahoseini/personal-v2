// Variables

// created new HTMLUI Class
const htmlUi =  new HTMLUI();






// Eventlistener
eventlistener();
function eventlistener() {
    // show awards progress
    document.addEventListener("scroll", function(){
        // show awards
        htmlUi.addCustomClassToElementInShowEvent("#award-col","show");
    });
}





// Objects

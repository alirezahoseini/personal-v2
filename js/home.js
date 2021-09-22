// Variables

// created new HTMLUI Class
const htmlUi =  new HTMLUI();

//  work samples Carusel -- Swiper JS
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
      // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });




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


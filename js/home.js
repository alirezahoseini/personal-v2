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

  // access to the contact Section
  const contact = document.querySelector("#contact");



// Eventlistener
eventlistener();
function eventlistener() {
    // show awards progress
    window.addEventListener("scroll", function(){
      // access to to award-col position
      const awardCol = document.getElementById('award-col');
      const posiation = awardCol.offsetTop * 8;

      console.log(posiation);
      console.log(window.scrollY);
      // if page scroll y > 20px 
      if(window.scrollY > posiation){
        // show awards
        console.log('ok');
        htmlUi.addCustomClassToElementInShowEvent("#award-col","show");
      }
    });
}



// Objects



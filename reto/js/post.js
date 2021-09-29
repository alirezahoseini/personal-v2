const myImages = ["../images/home-page-images/1.jpg"];
const lightboxFillter = document.getElementsByClassName("lightbox-fillter")[0];
const lightboxBase = document.getElementsByClassName("lightbox-base")[0];
const imageSelector = document.getElementById("image");
const zoomIcon = document.getElementsByClassName("zoom-icon")[0];

imageSelector.addEventListener("click", function(){
    lightboxBase.classList.add("active");
	lightboxFillter.classList.add("active");
});

zoomIcon.addEventListener("click", function(){
    lightboxBase.classList.add("active");
	lightboxFillter.classList.add("active");
});

lightboxFillter.addEventListener("click", function(){
	lightboxBase.classList.remove("active");
	lightboxFillter.classList.remove("active");
});

lightboxBase.addEventListener("click", function(){
	lightboxBase.classList.remove("active");
	lightboxFillter.classList.remove("active");
});
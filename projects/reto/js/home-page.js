

// loading button
const displayNone1 = document.getElementsByClassName("d-none-1")[0];
const displayNone2 = document.getElementsByClassName("d-none-1")[1];
const displayNone3 = document.getElementsByClassName("d-none-1")[2];
const displayNone4 = document.getElementsByClassName("d-none-1")[3];
const displayNone5 = document.getElementsByClassName("d-none-1")[4];
const displayNone6 = document.getElementsByClassName("d-none-1")[5];
const displayNone7 = document.getElementsByClassName("d-none-1")[6];
const displayNone8 = document.getElementsByClassName("d-none-1")[7];
const displayNone9 = document.getElementsByClassName("d-none-1")[8];
const displayNone10 = document.getElementsByClassName("d-none-1")[9];
const displayNone11 = document.getElementsByClassName("d-none-1")[10];
const displayNone12 = document.getElementsByClassName("d-none-1")[11];
const displayNone13 = document.getElementsByClassName("d-none-1")[12];
const displayNone14 = document.getElementsByClassName("d-none-1")[13];
const displayNone15 = document.getElementsByClassName("d-none-1")[14];
const displayNone16 = document.getElementsByClassName("d-none-1")[15];

const displayNone17 = document.getElementsByClassName("d-none-2")[0];
const displayNone18 = document.getElementsByClassName("d-none-2")[1];
const displayNone19 = document.getElementsByClassName("d-none-2")[2];
const displayNone20 = document.getElementsByClassName("d-none-2")[3];
const displayNone21 = document.getElementsByClassName("d-none-2")[4];
const displayNone22 = document.getElementsByClassName("d-none-2")[5];
const displayNone23 = document.getElementsByClassName("d-none-2")[6];
const displayNone24 = document.getElementsByClassName("d-none-2")[7];
const displayNone25 = document.getElementsByClassName("d-none-2")[8];
const displayNone26 = document.getElementsByClassName("d-none-2")[9];

const loadingButton = document.getElementsByClassName("loadMoreBtn")[0];
const loadingButton2 = document.getElementsByClassName("loadMoreBtn")[1];
loadingButton.addEventListener("click", function () {
	displayNone1.classList.remove("d-none-1");
	displayNone2.classList.remove("d-none-1");
	displayNone3.classList.remove("d-none-1");
	displayNone4.classList.remove("d-none-1");
	displayNone5.classList.remove("d-none-1");
	displayNone6.classList.remove("d-none-1");
	displayNone7.classList.remove("d-none-1");
	displayNone8.classList.remove("d-none-1");
	displayNone9.classList.remove("d-none-1");
	displayNone10.classList.remove("d-none-1");
	displayNone11.classList.remove("d-none-1");
	displayNone12.classList.remove("d-none-1");
	displayNone13.classList.remove("d-none-1");
	displayNone14.classList.remove("d-none-1");
	displayNone15.classList.remove("d-none-1");
	displayNone16.classList.remove("d-none-1");
	displayNone17.classList.remove("d-none-1");
	loadingButton.classList.add("d-none-1")
	loadingButton2.classList.remove("d-none-1")
});
loadingButton2.addEventListener("click", function(){
	displayNone17.classList.remove("d-none-2");
	displayNone18.classList.remove("d-none-2");
	displayNone19.classList.remove("d-none-2");
	displayNone20.classList.remove("d-none-2");
	displayNone21.classList.remove("d-none-2");
	displayNone22.classList.remove("d-none-2");
	displayNone23.classList.remove("d-none-2");
	displayNone24.classList.remove("d-none-2");
	displayNone25.classList.remove("d-none-2");
	displayNone26.classList.remove("d-none-2");
	loadingButton2.classList.add("d-none-1")
});

//----End of loading button



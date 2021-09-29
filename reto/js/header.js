// switcher dark theme //
const darkButton = document.getElementById("darkButton");
const bodyChanger = document.getElementById("bodyChenger");
darkButton.addEventListener("click", function () {
	bodyChanger.classList.toggle("dark");
});
//-----End of switcher dark theme //

// menu button //
const menuButton = document.getElementById("menu-button");
const hambergerMenu = document.getElementById("hamberger-menu");
const menuCloserBtn1 = document.getElementById("menu-closer-1");
const hambergerMenuBgFillter = document.getElementById(
	"hamberger-menu-background-fillter",
);
menuButton.addEventListener("click", function () {
	hambergerMenu.classList.add("active");
	hambergerMenuBgFillter.classList.add("active");
});
menuCloserBtn1.addEventListener("click", function () {
	hambergerMenu.classList.remove("active");
	hambergerMenuBgFillter.classList.remove("active");
});
hambergerMenuBgFillter.addEventListener("click", function () {
	hambergerMenu.classList.remove("active");
	hambergerMenuBgFillter.classList.remove("active");
});

//-----End of menu button

// switcher button
const switcherBtn = document.getElementById("page-switcher-btn");
const switcherIcons = document.getElementById("page-switcher-icons");
	switcherBtn.addEventListener("click", function() {
	switcherBtn.classList.toggle("active");
	switcherIcons.classList.toggle("active");
	})
//--------End of switcher button
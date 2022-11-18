// login page - form chenger
const loginBtn = document.getElementById("login-btn");
const singupBtn = document.getElementById("singup-btn");
const loginForm = document.getElementById("login-form");
const singupForm = document.getElementById("singup-form");
const loginTitle = document.getElementsByClassName("login-title ")[0];
const singupTitle = document.getElementsByClassName("singup-title ")[0];
loginBtn.addEventListener("click" , function() {
	loginBtn.classList.add("active");
	singupBtn.classList.remove("active");
    loginForm.classList.add("active");
    singupForm.classList.remove("active");
    loginTitle.classList.add("active");
    singupTitle.classList.remove("active");
});
singupBtn.addEventListener("click" , function(){
    loginBtn.classList.remove("active");
	singupBtn.classList.add("active");
    loginForm.classList.remove("active");
    singupForm.classList.add("active");
    loginTitle.classList.remove("active");
    singupTitle.classList.add("active");
});
//----End of login page - form chenger
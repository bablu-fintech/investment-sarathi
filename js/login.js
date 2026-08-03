document.addEventListener("DOMContentLoaded", () => {

    console.log("Investment Sarathi Login Loaded");

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const email = document.querySelector('input[type="email"]').value.trim();
            const password = document.querySelector('input[type="password"]').value.trim();

            if (!email || !password) {
                alert("Please enter your Email and Password.");
                return;
            }

            const loginBtn = document.querySelector(".login-btn");

            loginBtn.innerHTML = "Signing In...";
            loginBtn.disabled = true;

            setTimeout(() => {

                alert("Login Successful!");

                loginBtn.innerHTML = "Login";
                loginBtn.disabled = false;

            },1500);

        });

    }

    // Swiper
    if(document.querySelector(".loginSwiper")){

        

    }

});
window.addEventListener("load", () => {

    new Swiper(".loginSwiper",{
        loop:true,
        autoplay:{
            delay:4000,
            disableOnInteraction:false
        },
        pagination:{
            el:".swiper-pagination",
            clickable:true
        }
    });

});
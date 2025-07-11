document.addEventListener("DOMContentLoaded", () => {
  const box = document.getElementById("authBox");
  const brand = document.getElementById("brandLogo");
  const loginContainer = document.getElementById("loginContainer");

  const loginForm = document.querySelector(".login-form");
  const signupForm = document.querySelector(".signup-form");
  const showSignup = document.getElementById("show-signup");
  const showLogin = document.getElementById("show-login");

  let currentForm = "login";

  function showAuthForm() {
    brand.style.display = "none";
    loginContainer.style.display = "flex";
    loginForm.style.display = currentForm === "login" ? "flex" : "none";
    signupForm.style.display = currentForm === "signup" ? "flex" : "none";
    box.style.width = "460px";
    box.style.height = "540px";
  }

  function showLogo() {
    brand.style.display = "block";
    loginContainer.style.display = "none";
    box.style.width = "400px";
    box.style.height = "200px";
  }

  box.addEventListener("mouseenter", showAuthForm);
  box.addEventListener("mouseleave", showLogo);

  showSignup.addEventListener("click", () => {
    currentForm = "signup";
    showAuthForm();
  });

  showLogin.addEventListener("click", () => {
    currentForm = "login";
    showAuthForm();
  });

  showLogo();

  document.querySelectorAll(".toggle-password").forEach((eye) => {
    eye.addEventListener("click", () => {
      const input = eye.previousElementSibling;
      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      eye.classList.toggle("fa-eye");
      eye.classList.toggle("fa-eye-slash");
    });
  });
});
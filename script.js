document.addEventListener("DOMContentLoaded", () => {
  // Loading screen functionality
  const loader = document.getElementById("fake-loading-screen");
  const mainContent = document.getElementById("main-content");
  const loadingGif = document.querySelector(".loading-gif");
  const loadingText = document.querySelector(".loading-text");
  
  // Set loading time to exactly 10 seconds
  const totalLoadingTime = 10000; // 10 seconds in milliseconds
  
  // Animate the dots in "Popcorning..."
  const dots = ["", ".", "..", "..."];
  let dotIndex = 0;
  
  const dotInterval = setInterval(() => {
    loadingText.textContent = "Popcorning" + dots[dotIndex];
    dotIndex = (dotIndex + 1) % dots.length;
  }, 500); // Change dots every 500ms
  
  setTimeout(() => {
    clearInterval(dotInterval); // Stop the dot animation
    loader.style.opacity = 0;
    setTimeout(() => {
      loader.style.display = "none";
      mainContent.style.display = "flex";
    }, 1000);
  }, totalLoadingTime);

  // Auth box functionality
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

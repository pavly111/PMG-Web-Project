// Universal Loading Screen Script
document.addEventListener("DOMContentLoaded", () => {
  // Check if loading screen exists
  const loader = document.getElementById("fake-loading-screen");
  if (!loader) return; // Exit if no loading screen found
  
  const loadingText = document.querySelector(".loading-text");
  
  // Set loading time to exactly 2 seconds
  const totalLoadingTime = 2000; // 2 seconds in milliseconds
  
  // Animate the dots in "Popcorning..."
  const dots = ["", ".", "..", "..."];
  let dotIndex = 0;
  
  const dotInterval = setInterval(() => {
    if (loadingText) {
      loadingText.textContent = "Popcorning" + dots[dotIndex];
      dotIndex = (dotIndex + 1) % dots.length;
    }
  }, 500); // Change dots every 500ms
  
  setTimeout(() => {
    clearInterval(dotInterval); // Stop the dot animation
    loader.style.opacity = 0;
    setTimeout(() => {
      loader.style.display = "none";
    }, 1000);
  }, totalLoadingTime);
}); 
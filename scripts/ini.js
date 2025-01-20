document.addEventListener("DOMContentLoaded", () => {
  //nav function
  const header = document.querySelector("header");
  const nav = document.querySelector("nav");
  const placeholder = document.getElementById("nav-placeholder");

  let headerHeight = 40;
  if (header !== null) {
    headerHeight = header.offsetHeight;
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY >= headerHeight) {
      nav?.classList.add("fixed");
    } else {
      nav?.classList.remove("fixed");
    }
  });

  if (placeholder) {
    fetch("/assets/nav.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        placeholder.innerHTML = data;
      })
      .catch((error) => {
        console.error("Fehler beim Laden der Navigation:", error);
      });
  }

  //footer year function
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.innerHTML = new Date().getFullYear();
  }
});

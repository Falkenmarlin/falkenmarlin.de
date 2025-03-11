//footer year function
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.innerHTML = new Date().getFullYear();
}
//dynamic nav function
const placeholder = document.getElementById("nav-links");
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


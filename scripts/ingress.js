document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggle-timeline");
  const timelineContainer = document.querySelector(".timeline");

  fetch("/assets/ingress-timeline.json")
    .then((response) => response.json())
    .then((data) => {
      timelineContainer.innerHTML = "";

      data.forEach((item, index) => {
        const timelineItem = document.createElement("div");
        timelineItem.classList.add("timeline-item");
        if (index >= 5) {
          timelineItem.classList.add("hidden");
        }

        const timelineContent = document.createElement("div");
        timelineContent.classList.add("timeline-content");

        const dateElement = document.createElement("h3");
        dateElement.textContent = item.date;

        const eventElement = document.createElement("p");
        eventElement.textContent = item.event;

        timelineContent.appendChild(dateElement);
        timelineContent.appendChild(eventElement);
        timelineItem.appendChild(timelineContent);
        timelineContainer.appendChild(timelineItem);
      });

      if (data.length <= 5) {
        toggleButton.style.display = "none";
      }
    })
    .catch((error) => {
      console.error("Fehler beim Abrufen der Timeline-Daten:", error);
    });

  toggleButton.addEventListener("click", function () {
    const hiddenItems = document.querySelectorAll(".timeline-item.hidden");
    hiddenItems.forEach((item) => {
      item.classList.toggle("hidden");
    });

    if (toggleButton.innerText === "Mehr anzeigen") {
      toggleButton.innerText = "Weniger anzeigen";
    } else {
      toggleButton.innerText = "Mehr anzeigen";
    }
  });
});

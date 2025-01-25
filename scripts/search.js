//search function

document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.querySelector("button[aria-label='Search']");
  const searchInput = document.querySelector('input[type="search"]');
  const resultsDiv = document.getElementById("search-results");

  console.log("Search button:", searchButton);
  console.log("Search input:", searchInput);
  console.log("Results div:", resultsDiv);

  if (searchButton && searchInput && resultsDiv) {
    searchInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        searchButton.click();
      }
    });
    searchButton.addEventListener("click", function () {
      const query = searchInput.value.toLowerCase();
      console.log("Search query:", query);

      fetch("/assets/search.json")
        .then((response) => {
          console.log("Fetch response:", response);
          return response.json();
        })
        .then((data) => {
          console.log("Search data:", data);
          const filteredResults = data.filter((result) =>
            result.titles.some((title) => title.toLowerCase().includes(query))
          );

          resultsDiv.innerHTML = filteredResults.length
            ? `<h3>Suchergebnisse für "${query}":</h3>` + filteredResults
                .map(
                  (result) => `
                    <div class="search-result">
                      <a href="${result.url}" target="_blank">${result.titles[0]}</a>
                    </div>
                  `
                )
                .join("<br>")
            : `<p>Keine Ergebnisse für "${query}" gefunden.</p>`;

          console.log(
            filteredResults.length
              ? filteredResults
              : "Keine Ergebnisse gefunden"
          );
        })
        .catch((error) => {
          console.error("Fehler beim Abrufen der Suchergebnisse:", error);
          resultsDiv.innerHTML = "Fehler beim Abrufen der Suchergebnisse";
        });
    });
  } else {
    console.error("One or more elements are missing:", {
      searchButton,
      searchInput,
      resultsDiv,
    });
  }
});

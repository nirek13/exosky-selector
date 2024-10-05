// Sample exoplanet data
const exoplanetData = [
    { name: "Kepler-22b", star: "Kepler-22", distance: 620, radius: 2.4 },
    { name: "Proxima Centauri b", star: "Proxima Centauri", distance: 4.24, radius: 1.1 },
    { name: "Gliese 667 Cc", star: "Gliese 667 C", distance: 23.6, radius: 1.5 },
    { name: "TRAPPIST-1e", star: "TRAPPIST-1", distance: 39.46, radius: 0.91 },
    { name: "HD 209458 b", star: "HD 209458", distance: 157, radius: 1.38 },
    { name: "55 Cancri e", star: "55 Cancri", distance: 41, radius: 1.63 },
    { name: "LHS 1140 b", star: "LHS 1140", distance: 40.5, radius: 1.43 },
    { name: "K2-18 b", star: "K2-18", distance: 124, radius: 2.6 },
    { name: "GJ 1214 b", star: "GJ 1214", distance: 42.5, radius: 2.85 },
    { name: "WASP-12b", star: "WASP-12", distance: 870, radius: 1.79 },
    { name: "CoRoT-7b", star: "CoRoT-7", distance: 489, radius: 1.58 },
    { name: "HD 189733 b", star: "HD 189733", distance: 63, radius: 1.14 }
];

// Function to render the list of exoplanets
const renderExoplanets = (data) => {
    const exoplanetList = document.getElementById("exoplanet-list");
    exoplanetList.innerHTML = "";  // Clear previous list items

    data.forEach(exoplanet => {
        const exoplanetItem = document.createElement("li");
        exoplanetItem.className = "exoplanet-item";
        exoplanetItem.innerHTML = `
            <div class="exoplanet-header">
                <div class="exoplanet-name">${exoplanet.name}</div>
            </div>
            <div class="exoplanet-details">
                <p><strong>Star:</strong> ${exoplanet.star}</p>
                <p><strong>Distance:</strong> ${exoplanet.distance} light-years</p>
                <p><strong>Radius:</strong> ${exoplanet.radius} Earth radii</p>
            </div>
        `;
        exoplanetList.appendChild(exoplanetItem);
    });
};

// Function to filter exoplanets based on search input
const filterExoplanets = (searchTerm) => {
    return exoplanetData.filter(exoplanet =>
        exoplanet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
};

// Event listener for search input
document.getElementById("search-input").addEventListener("input", (event) => {
    const searchTerm = event.target.value;
    const filteredExoplanets = filterExoplanets(searchTerm);
    renderExoplanets(filteredExoplanets);
});

// Initial render
renderExoplanets(exoplanetData);

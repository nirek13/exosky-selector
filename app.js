// Dummy data for exoplanets (to be used if the API call fails)
const dummyExoplanetData = [
    { name: "Proxima Centauri b", star: "Proxima Centauri", distance: 4.2, radius: 1.3 },
    { name: "TRAPPIST-1e", star: "TRAPPIST-1", distance: 39.5, radius: 1.0 },
    { name: "Kepler-186f", star: "Kepler-186", distance: 500, radius: 1.1 },
    { name: "HD 209458 b", star: "HD 209458", distance: 150, radius: 1.4 },
    { name: "LHS 1140 b", star: "LHS 1140", distance: 40, radius: 1.3 },
    { name: "WASP-12b", star: "WASP-12", distance: 870, radius: 1.8 },
    { name: "Gliese 667 Cc", star: "Gliese 667", distance: 23.62, radius: 1.5 },
    { name: "K2-18b", star: "K2-18", distance: 124, radius: 2.0 },
    { name: "WASP-39b", star: "WASP-39", distance: 300, radius: 1.4 },
    { name: "Kepler-22b", star: "Kepler-22", distance: 600, radius: 2.4 }
];

// Function to fetch exoplanet data from the API
function fetchExoplanetData() {
    fetch('http://exosky-backend.eastus.cloudapp.azure.com:5000/selector?max=10', {
        method: 'GET',
        mode: 'cors',  // This allows handling of the response if the server supports it
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("WORKS");
            console.log('Generated text:', data);
            renderExoplanets(data);

        })
        .catch(error => {
            console.error('Error generating text:', error);
        });
}


// Function to render the list of exoplanets
const renderExoplanets = (data) => {
    const exoplanetList = document.getElementById("exoplanet-list");
    exoplanetList.innerHTML = ""; // Clear previous list items

    // Iterate over the dictionary's keys
    for (const key in data) {
        if (data.hasOwnProperty(key)) { // Ensure it is a property of the object
            const exoplanet = data[key]; // Access the exoplanet object
            const exoplanetItem = document.createElement("li");
            exoplanetItem.className = "exoplanet-item";
            exoplanetItem.innerHTML = `
                <div class="exoplanet-header">
                    <div class="exoplanet-name">${exoplanet.name || "Unknown"} (Key: ${key})</div>
                </div>
                <div class="exoplanet-details">
                    <p><strong>Star:</strong> ${exoplanet.hostStar || "N/A"}</p>
                    <p><strong>Distance:</strong> ${exoplanet.lightYears || "N/A"} light-years</p>
                    <p><strong>Radius:</strong> ${exoplanet.earthRadius || "N/A"} Earth radii</p>
                </div>
            `;
            exoplanetItem.addEventListener('click', () => updatePlanetSprite(key, exoplanet));
            exoplanetList.appendChild(exoplanetItem);
        }
    }
};

// Function to update planet sprite
const updatePlanetSprite = (planet_data) => {
    const planet = document.getElementById("planet-container");
    const images = ["images/planet.png", "images/mercury.png", "images/venus.png"];

    planet.innerHTML = `
        <div class="exoplanet-name">${planet_data.name || "Select a Planet"}</div>
        <button class="enter-experience-btn">Enter Experience</button>
        <img src="${planet_data.texture || images[Math.floor(Math.random() * images.length)]}" alt="${planet_data.name}" class="exoplanet-image">
        <br/>
        <div class="exoplanet-more-details">
            <p><strong>Star:</strong> ${planet_data.star || "N/A"}</p>
            <p><strong>Distance:</strong> ${planet_data.distance || "N/A"} light-years</p>
            <p><strong>Radius:</strong> ${planet_data.radius || "N/A"} Earth radii</p>
        </div>
    `;

    const button = planet.querySelector('.enter-experience-btn');
    button.addEventListener('click', () => {
        console.log('Entering experience for planet:', planet_data.name);
        window.location.href = `/${planet_data.name}`;  // Corrected template literal usage
    });
};

// Function to filter exoplanets based on search input
const filterExoplanets = (searchTerm) => {
    const filteredData = dummyExoplanetData.filter(exoplanet => {
        return exoplanet.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return filteredData;
};

// Fetch and render data on page load
fetchExoplanetData();

// Event listener for search input (optional, to filter planets)
document.getElementById("search-input").addEventListener("input", (event) => {
    const searchTerm = event.target.value;
    const filteredExoplanets = filterExoplanets(searchTerm);
    renderExoplanets(filteredExoplanets);
});

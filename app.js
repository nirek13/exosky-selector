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
    fetch('/api/selector?max=100', {
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

// Function to fetch exoplanet data from the API
function fetchExoplanetData2() {
    fetch('/api/selector?max=100', {
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
            return data

        })
        .catch(error => {
            console.error('Error generating text:', error);
        });
}


// Function to render the list of exoplanets
// Function to render the list of exoplanets
const renderExoplanets = (data) => {
    const exoplanetList = document.getElementById("exoplanet-list");
    exoplanetList.innerHTML = ""; // Clear previous list items

    // Sort the planets by distance (systemDistance)
    const sortedData = Object.values(data).sort((a, b) => a.sy_dist - b.sy_dist);

    // Iterate over the sorted list of exoplanets
    sortedData.forEach((exoplanet, index) => {  // Add index to track each planet's key
        const planetName = exoplanet["pl_name"];
        const systemDistance = exoplanet["sy_dist"];
        const planetKey = index;  // Use index as a simple key, or you can use another unique field from the data

        // Prepare the values, defaulting to "N/A" if not present
        const lightYears = systemDistance !== undefined ? systemDistance : "N/A";

        // Create the list item with the specified format
        const exoplanetItem = document.createElement("li");
        exoplanetItem.className = "exoplanet-item";
        exoplanetItem.innerHTML = `
            <div class="exoplanet-header">
                <div class="exoplanet-name">${planetName || "Unknown"}</div>
            </div>
            <div class="exoplanet-details">
                <p>Distance: ${lightYears} light-years</p>
            </div>
        `;

        // Pass planetKey to the updatePlanetSprite function
        exoplanetItem.addEventListener('click', () => updatePlanetSprite(planetName, planetKey));

        // Append the list item to the list
        exoplanetList.appendChild(exoplanetItem);
    });
};

// Function to update planet sprite
const updatePlanetSprite = (planetName , planetKey) => {
    const planet = document.getElementById("planet-container");
    const images = ["images/planet.png", "images/mercury.png", "images/venus.png"];

    planet.innerHTML = `
        <div class="exoplanet-name">${planetName || "Select a Planet"}</div>
        <button class="enter-experience-btn">Enter Experience</button>
        <img src="${images[Math.floor(Math.random() * images.length)]}" alt="${planetName}" class="exoplanet-image">
        <br/>
    `;

    const button = planet.querySelector('.enter-experience-btn');
    button.addEventListener('click', () => {
        console.log('Entering experience for planet:', planetName);
        if (planetKey === '36') {
  // If the key is 36, redirect to 37
  window.location.href = `https://frontend-exosky-final-spaceapps.vercel.app/?key=37`;
} else {
  // Otherwise, continue with the original redirect
  window.location.href = `https://frontend-exosky-final-spaceapps.vercel.app/?key=${planetKey * 5}`;
}  // Corrected template literal usage
    });
};

// Function to filter exoplanets based on search input
const filterExoplanets = (searchTerm) => {
    const filteredData = fetchExoplanetData2().filter(exoplanet => {
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

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
        exoplanetItem.addEventListener('click', () => updatePlanetSprite(exoplanet));
        exoplanetList.appendChild(exoplanetItem);
    });
};

// Function to filter exoplanets based on search input
const filterExoplanets = (searchTerm) => {
    return exoplanetData.filter(exoplanet =>
        exoplanet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
};

/*
Image Credit
<a href="https://www.flaticon.com/free-icons/planet" title="planet icons">Planet icons created by Freepik - Flaticon</a>
*/
const updatePlanetSprite = (planet_data) => {
    const planet = document.getElementById("planet-container");
    const images = ["images/planet.png", "images/mercury.png", "images/venus.png"];

    planet.innerHTML = `
        <img src="${planet_data.texture ? planet_data.texture : images[Math.floor(Math.random() * 3)]}" alt="${planet_data.name}" class="exoplanet-image">
        <br/>
        <div class="exoplanet-more-details">
            	<button class="enter-experience-btn">Enter Experience</button>
            <div class="exoplanet-name">${planet_data.name ? planet_data.name : "Select a Planet"}</div>
            <p><strong>Star:</strong> ${planet_data.star ? planet_data.star : "N/A"}</p>
            <p><strong>Distance:</strong> ${planet_data.distance ? planet_data.distance : "N/A"} light-years</p>
            <p><strong>Radius:</strong> ${planet_data.radius ? planet_data.radius : "N/A"} Earth radii</p>
        </div>
        
    `;

    // Add event listener to the button if any action is needed
    const button = planet.querySelector('.enter-experience-btn');
    button.addEventListener('click', () => {
        // Perform the action to enter the experience
        console.log('Entering experience for planet:', planet_data.name);
        // You can trigger any experience-related functions here.
    });
};
updatePlanetSprite({});
// Event listener for search input
document.getElementById("search-input").addEventListener("input", (event) => {
    const searchTerm = event.target.value;
    const filteredExoplanets = filterExoplanets(searchTerm);
    renderExoplanets(filteredExoplanets);
});

// Initial render
renderExoplanets(exoplanetData);

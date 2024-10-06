
// Dummy data for exoplanets (to be used if the API call fails)
const dummyExoplanetData = [
    {
        name: "Proxima Centauri b",
        star: "Proxima Centauri",
        distance: 4.2, // in light-years
        radius: 1.3 // in Earth radii
    },
    {
        name: "TRAPPIST-1e",
        star: "TRAPPIST-1",
        distance: 39.5,
        radius: 1.0
    },
    {
        name: "Kepler-186f",
        star: "Kepler-186",
        distance: 500,
        radius: 1.1
    },
    {
        name: "HD 209458 b",
        star: "HD 209458",
        distance: 150,
        radius: 1.4
    },
    {
        name: "LHS 1140 b",
        star: "LHS 1140",
        distance: 40,
        radius: 1.3
    },
    {
        name: "WASP-12b",
        star: "WASP-12",
        distance: 870,
        radius: 1.8
    },
    {
        name: "Gliese 667 Cc",
        star: "Gliese 667",
        distance: 23.62,
        radius: 1.5
    },
    {
        name: "K2-18b",
        star: "K2-18",
        distance: 124,
        radius: 2.0
    },
    {
        name: "WASP-39b",
        star: "WASP-39",
        distance: 300,
        radius: 1.4
    },
    {
        name: "Kepler-22b",
        star: "Kepler-22",
        distance: 600,
        radius: 2.4
    }


];
// Function to fetch exoplanet data from the API
const fetchExoplanetData = async () => {
    try {
        const response = await fetch('https://exosky-aacf98ce56cd.herokuapp.com/selector?max=100', {mode: "no-cors"});
        console.log(response);

        // If the response is not ok, throw an error
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const exoplanetData = await response.json();  // Assuming the response is in JSON format
        renderExoplanets(exoplanetData);
    } catch (error) {
        console.error('Error fetching exoplanet data:', error);
        console.log('Using dummy data instead.');
        renderExoplanets(dummyExoplanetData); // Use dummy data on error
    }
};

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

// Function to update planet sprite
const updatePlanetSprite = (planet_data) => {
    const planet = document.getElementById("planet-container");
    const images = ["images/planet.png", "images/mercury.png", "images/venus.png"];

    planet.innerHTML = `
        <div class="exoplanet-name">${planet_data.name ? planet_data.name : "Select a Planet"}</div>
        <button class="enter-experience-btn">Enter Experience</button>
        <img src="${planet_data.texture ? planet_data.texture : images[Math.floor(Math.random() * 3)]}" alt="${planet_data.name}" class="exoplanet-image">
        <br/>
        <div class="exoplanet-more-details">
            <p><strong>Star:</strong> ${planet_data.star ? planet_data.star : "N/A"}</p>
            <p><strong>Distance:</strong> ${planet_data.distance ? planet_data.distance : "N/A"} light-years</p>
            <p><strong>Radius:</strong> ${planet_data.radius ? planet_data.radius : "N/A"} Earth radii</p>
        </div>
    `;

    const button = planet.querySelector('.enter-experience-btn');
    button.addEventListener('click', () => {
        console.log('Entering experience for planet:', planet_data.name);
        window.location.href = '';  // Add experience action here
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
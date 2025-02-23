
const apiKey = '0b3c381c088ff97e8d855c9b8c089c04'; 

function getCities() {
    const cities = localStorage.getItem('cities');
    return cities ? JSON.parse(cities) : [];
}


function saveCities(cities) {
    localStorage.setItem('cities', JSON.stringify(cities));
}

function addCity(name,country,lat, lon) {
    const cities = getCities();
    cities.push({ name,country, lat, lon });
    saveCities(cities);
    
}

// Function to fetch cities from OpenWeatherMap API
async function fetchCities(query) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching cities:', error);
        return [];
    }
}

// Function to display cities in the results container
function displayCities(cities) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (cities.length === 0) {
        resultsContainer.innerHTML = '<p class="text-center">No cities found.</p>';
        return;
    }

    cities.forEach(city => {
        const cityItem = document.createElement('div');
        cityItem.classList.add('bg-purple-900','p-4','mb-2')
        
        cityItem.textContent = `${city.name}, ${city.country}`;
        cityItem.addEventListener('click', () => {
                addCity(city.name,city.country,city.lat,city.lon)
                const url = "/main";
                localStorage.setItem('selectedCity', [city.lat,city.lon]);
                window.location.href = url;
                

            });
        resultsContainer.appendChild(cityItem);
    });
}

// Event listener for the search button
async function search(){
    const query = document.getElementById('city-input').value.trim();
    if (query) {
        const cities = await fetchCities(query);
        displayCities(cities);
    } else {
        alert('Please enter a city name.');
    }

}
   

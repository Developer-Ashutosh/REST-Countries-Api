// Fetch data from the JSON file and update the HTML
const fetchData = async () => {
    const response = await fetch("data.json");
    const data = await response.json();

    updateHtml(data);
    toggleDetailedPage(data);
};

// Update the HTML with country information
const updateHtml = (responseData) => {
    const countryList = document.querySelector(".countries-list");

    countryList.innerHTML = ""; // Clear existing content

    responseData.forEach(data => {
        const { flags, name, population, region, capital } = data;

        const countryElement = document.createElement("div");
        countryElement.classList.add("country");

        // Create HTML structure for each country
        countryElement.innerHTML = `
            <div class="flag"><img src="${flags["png"]}" alt="Country Flag"></div>
            <div class="name">${name}</div>
            <div class="details">
                <div class="population">Population: <span>${population.toLocaleString()}</span></div>
                <div class="region">Region: <span>${region}</span></div>
                <div class="capital">Capital: <span>${(capital) ? capital : "None"}</span></div>
            </div>
        `;

        countryList.appendChild(countryElement);
    });
};

// Toggle between light and dark themes
const toggleTheme = () => {
    const themeSection = document.querySelector(".theme-section");

    // Toggle theme on click
    themeSection.addEventListener("click", () => {
        const rootElement = document.documentElement;
        rootElement.setAttribute('data-theme', (rootElement.getAttribute('data-theme') === 'dark') ? "light" : "dark");

        // Update theme text based on the current theme
        updateThemeText(themeSection);
    });
};

// Update theme text based on the current theme
const updateThemeText = (themeSection, rootElement) => {
    const isDarkMode = rootElement.getAttribute('data-theme') === 'dark';

    // Update theme text content
    themeSection.firstElementChild.innerHTML = isDarkMode ? `<i class="fa-regular fa-moon"></i>Dark Mode` : ` <i class="fa-solid fa-moon"></i>Light Mode`;
    themeSection.lastElementChild.innerHTML = isDarkMode ? ` <i class="fa-solid fa-moon"></i>Light Mode` : ` <i class="fa-regular fa-moon"></i>Dark Mode`;
};

// Toggle detailed page view for each country
const toggleDetailedPage = (responseData) => {
    const countriesList = document.querySelector(".countries-list");
    let lastScrollPosition = 0;

    countriesList.addEventListener("click", (event) => {
        const countryElement = event.target.closest(".country");

        if (countryElement) {
            // Store the current scroll position
            lastScrollPosition = window.scrollY;
            // Show detailed page for the selected country
            showDetailedPage(responseData, countryElement, lastScrollPosition);

            // Scroll smoothly to the top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
};

// Show detailed information for the selected country
const showDetailedPage = (responseData, selectedCountryElement, lastScrollPosition) => {
    const detailedPage = document.querySelector(".detail-page");

    // Slide detailed page into view
    detailedPage.style.top = "0%";

    const selectedCountryName = selectedCountryElement.querySelector(".name").textContent;
    const selectedCountryData = responseData.find(country => country.name === selectedCountryName);

    // Populate detailed page with content
    detailedPage.innerHTML = createDetailedPageContent(selectedCountryData);

    const backBtn = document.querySelector(".back-btn");
    // Add click event listener to the back button
    backBtn.addEventListener("click", () => {
        // Hide detailed page
        detailedPage.style.top = "-100vh";
        detailedPage.innerHTML = ""; // Clear existing content

        // Scroll back to the last position
        window.scrollTo({
            top: lastScrollPosition,
            behavior: 'smooth'
        });
    });
};

// Create HTML content for the detailed page
const createDetailedPageContent = (countryData) => {
    const { flags, name, nativeName, population, region, subregion, capital, topLevelDomain, currencies, languages, borders } = countryData;

    // Generate detailed page content
    return `
        <div class="back-btn">
            <i class="fa-solid fa-arrow-left"></i> Back
        </div>
        <div class="main-details">
            <div class="flag-img">
                <img src="${flags["png"]}" alt="Flag">
            </div>
            <div class="detail">
                <div class="head">${name}</div>
                <div class="main">
                    <div class="left">
                        <div class="native-name">Native Name: <span>${nativeName}</span></div>
                        <div class="population">Population: <span>${population.toLocaleString()}</span></div>
                        <div class="region">Region: <span>${region}</span></div>
                        <div class="sub-region">Sub Region: <span>${subregion}</span></div>
                        <div class="capital">Capital: <span>${(capital) ? capital : "None"}</span></div>
                    </div>
                    <div class="right">
                        <div class="top-level-domain">Top Level Domain: ${(topLevelDomain) ? topLevelDomain.map(domain => `<span>${domain}</span>`).join(' , ') : "<span>None</span>"}</div>
                        <div class="currencies">Currencies: ${(currencies) ? currencies.map(currency => `<span>${currency["name"]}</span>`).join(' , ') : "<span>None</span>"}</div>
                        <div class="languages">Languages: ${(languages) ? languages.map(language => `<span>${language["name"]}</span>`).join(' , ') : "<span>None</span>"}</div>
                    </div>
                </div>
                <div class="foot">
                    Border Countries: 
                    <div class="border-countries">
                        ${(borders) ? borders.map(border => `<span>${border}</span>`).join('') : "<span>None</span>"}
                    </div>
                </div>
            </div>
        </div>`;
};

// Function to search countries based on user input
const searchCountries = () => {
    document.querySelector("#searchBar").oninput = () => {
        const searchBar = document.querySelector("#searchBar").value.trim().toLowerCase();
        const countries = document.querySelectorAll(".country");

        countries.forEach(country => {
            const countryName = country.querySelector(".name").textContent.toLowerCase();

            // Split the search input into individual words
            const searchWords = searchBar.split(' ');

            // Check if any word in the input matches the country name
            const isMatch = searchWords.some(word => countryName.includes(word));

            // Display or hide the country based on the search result
            country.style.display = (isMatch || searchBar === "") ? "block" : "none";
        });
    }
};

// Function to filter countries based on selected region
const filterCountries = () => {
    const regionList = document.querySelector(".regions");

    regionList.addEventListener("click", (event) => {
        const region = event.target;
        if (region.tagName === "SPAN") {
            const regions = document.querySelectorAll(".regions span");
            regions.forEach(e => e.style.backgroundColor = "var(--Elements-Color)");

            // Highlight the selected region
            region.style.backgroundColor = "var(--Background-Color)";
            region.classList.add("selected");

            const countries = document.querySelectorAll(".country");
            countries.forEach(country => {
                // Display or hide the country based on the selected region
                country.style.display = (country.querySelector(".region span").textContent == region.textContent) ? "block" : "none";
            });
        }
    });
};

//Function to scroll smoothly to the top
const scrollWindow = () => {
    const toTopBtn = document.querySelector(".top-btn");
    // Toggle the display of the button based on the scroll position
    window.addEventListener("scroll", () => toTopBtn.style.display = (window.scrollY > 80) ? "block" : "none");

    // Add a click event listener to the "top-btn" for smooth scrolling
    toTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
};

// Initial execution of functions
fetchData();
toggleTheme();
filterCountries();
searchCountries();
scrollWindow();

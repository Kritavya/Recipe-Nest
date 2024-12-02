// document.addEventListener('DOMContentLoaded', () => {
//     const section = document.querySelector('.search-lists'); // The section where recipes will be displayed
//     const loadMoreButton = document.querySelector('#load-more'); // The Load More button with the id
//     const itemsPerPage = 4; // Number of items to load per click
//     let currentIndex = 0;

//     // Fetch the recipe data from the JSON file
//     fetch('../Data/search-page.json') // Replace with the correct path to your JSON file
//         .then(response => response.json())
//         .then(recipes => {
//             // Function to load the recipes
//             function loadRecipes() {
//                 const endIndex = currentIndex + itemsPerPage;
//                 const currentRecipes = recipes.slice(currentIndex, endIndex);

//                 currentRecipes.forEach(recipe => {
//                     // Create a formatted link by encoding the name
//                     const formattedLink = `recipe.html?title=${encodeURIComponent(recipe.name)}`;

//                     const recipeHTML = `
//                         <div class="col-lg-3 col-md-4 col-6">
//                             <figure class="my-3 my-md-4 RecipeNest-card">
//                                 <a href="${formattedLink}" class="RecipeNest-animation stretched-link rounded-6">
//                                     <img src="${recipe.imgSrc}" class="w-100" alt="${recipe.name}">
//                                 </a>
//                                 <figcaption class="mt-2">
//                                     <a href="${formattedLink}" class="text-black d-block mt-1 font-weight-semibold big">${recipe.name}</a>
//                                 </figcaption>
//                             </figure>
//                         </div>
//                     `;
//                     section.insertAdjacentHTML('beforeend', recipeHTML);
//                 });

//                 // Increment currentIndex after each load
//                 currentIndex += itemsPerPage;

//                 // If all recipes are loaded, hide the Load More button
//                 if (currentIndex >= recipes.length) {
//                     loadMoreButton.style.display = 'none';
//                 }
//             }

//             // Initial load of 4 recipes
//             loadRecipes();

//             // Event listener for the "Load More" button
//             loadMoreButton.addEventListener('click', function (e) {
//                 e.preventDefault(); // Prevent default link behavior
//                 loadRecipes(); // Load the next set of recipes
//             });
//         })
//         .catch(error => {
//             console.error('Error loading recipes:', error);
//         });
// });

// document.addEventListener('DOMContentLoaded', () => {
//     const searchInput = document.getElementById('Search2'); // The main search input
//     const searchResultsContainer = document.querySelector('.search-lists'); // Container for search results

//     // Event listener for keydown in the search input
//     searchInput.addEventListener('keydown', async (event) => {
//         if (event.key === 'Enter') { // Check if the Enter key is pressed
//             const query = searchInput.value.trim(); // Get the trimmed input value

//             if (query) {
//                 // Update the URL with the search query
//                 window.history.pushState({}, '', `?query=${encodeURIComponent(query)}`);

//                 try {
//                     const response = await fetch(`/search-recipes?query=${encodeURIComponent(query)}`); // Fetch matching recipes
//                     const recipes = await response.json(); // Parse the JSON response

//                     // Clear previous results
//                     searchResultsContainer.innerHTML = '';

//                     // Display results
//                     recipes.forEach(recipe => {
//                         const recipeHTML = `
//                             <div class="col-lg-3 col-md-4 col-6">
//                                 <figure class="my-3 my-md-4 RecipeNest-card">
//                                 <a href="recipe.html?title=${encodeURIComponent(recipe.title)}"  class="RecipeNest-animation stretched-link rounded-6">
//                                     <img src="${recipe.photo}" class="w-100" alt="${recipe.title}">
//                                 </a>
//                                     <figcaption class="mt-2">
//                                     <a href="recipe.html?title=${encodeURIComponent(recipe.title)}" class="text-black d-block mt-1 font-weight-semibold big">${recipe.title}</a>
//                                 </figcaption>
//                                 </figure>
//                             </div>

//                         `;
//                         searchResultsContainer.insertAdjacentHTML('beforeend', recipeHTML); // Add new results to the container
//                     });

//                     // If no recipes found, display a message
//                     if (recipes.length === 0) {
//                         searchResultsContainer.innerHTML = '<p>No recipes found.</p>';
//                     }
//                 } catch (error) {
//                     console.error('Error fetching search results:', error);
//                     searchResultsContainer.innerHTML = '<p>Error fetching results.</p>';
//                 }
//             }
//         }
//     });
// });


document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('Search2'); // The main search input
    const searchResultsContainer = document.querySelector('.search-lists'); // Container for search results

    // Event listener for keydown in the search input
    searchInput.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') { // Check if the Enter key is pressed
            const query = searchInput.value.trim(); // Get the trimmed input value

            if (query) {
                // Update the URL with the search query
                window.history.pushState({}, '', `?query=${encodeURIComponent(query)}`);

                try {
                    const response = await fetch(`/search-recipes?query=${encodeURIComponent(query)}`); // Fetch matching recipes
                    
                    // Check if the response is OK (status 200)
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const recipes = await response.json(); // Parse the JSON response

                    // Clear previous results
                    searchResultsContainer.innerHTML = '';

                    // Display results
                    if (recipes.length > 0) {
                        recipes.forEach(recipe => {
                            const recipeHTML = `
                                <div class="col-lg-3 col-md-4 col-6">
                                    <figure class="my-3 my-md-4 RecipeNest-card">
                                        <a href="recipe?title=${encodeURIComponent(recipe.title)}" class="RecipeNest-animation stretched-link rounded-6">
                                            <img src="${recipe.photo}" class="w-100" alt="${recipe.title}">
                                        </a>
                                        <figcaption class="mt-2">
                                            <a href="recipe?title=${encodeURIComponent(recipe.title)}" class="text-black d-block mt-1 font-weight-semibold big">${recipe.title}</a>
                                        </figcaption>
                                    </figure>
                                </div>
                            `;
                            searchResultsContainer.insertAdjacentHTML('beforeend', recipeHTML); // Add new results to the container
                        });
                    } else {
                        // If no recipes found, display a message
                        searchResultsContainer.innerHTML = '<p>No recipes found.</p>';
                    }
                } catch (error) {
                    console.error('Error fetching search results:', error);
                    searchResultsContainer.innerHTML = '<p>Error fetching results. Please try again later.</p>';
                }
            }
        }
    });
});

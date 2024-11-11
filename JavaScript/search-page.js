document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.search-lists'); // The section where recipes will be displayed
    const loadMoreButton = document.querySelector('#load-more'); // The Load More button with the id
    const itemsPerPage = 4; // Number of items to load per click
    let currentIndex = 0;

    // Fetch the recipe data from the JSON file
    fetch('../Data/search-page.json') // Replace with the correct path to your JSON file
        .then(response => response.json())
        .then(recipes => {
            // Function to load the recipes
            function loadRecipes() {
                const endIndex = currentIndex + itemsPerPage;
                const currentRecipes = recipes.slice(currentIndex, endIndex);

                currentRecipes.forEach(recipe => {
                    // Create a formatted link by encoding the name
                    const formattedLink = `recipe.html?title=${encodeURIComponent(recipe.name)}`;

                    const recipeHTML = `
                        <div class="col-lg-3 col-md-4 col-6">
                            <figure class="my-3 my-md-4 RecipeNest-card">
                                <a href="${formattedLink}" class="RecipeNest-animation stretched-link rounded-6">
                                    <img src="${recipe.imgSrc}" class="w-100" alt="${recipe.name}">
                                </a>
                                <figcaption class="mt-2">
                                    <a href="${formattedLink}" class="text-black d-block mt-1 font-weight-semibold big">${recipe.name}</a>
                                </figcaption>
                            </figure>
                        </div>
                    `;
                    section.insertAdjacentHTML('beforeend', recipeHTML);
                });

                // Increment currentIndex after each load
                currentIndex += itemsPerPage;

                // If all recipes are loaded, hide the Load More button
                if (currentIndex >= recipes.length) {
                    loadMoreButton.style.display = 'none';
                }
            }

            // Initial load of 4 recipes
            loadRecipes();

            // Event listener for the "Load More" button
            loadMoreButton.addEventListener('click', function (e) {
                e.preventDefault(); // Prevent default link behavior
                loadRecipes(); // Load the next set of recipes
            });
        })
        .catch(error => {
            console.error('Error loading recipes:', error);
        });
});

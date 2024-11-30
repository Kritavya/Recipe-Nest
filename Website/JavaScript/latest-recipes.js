document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.RecipeNest-components .latest-recipes');
    const loadMoreButton = document.querySelector('#load-more'); // Assuming you have a Load More button with this id
    const itemsPerPage = 4; // Number of items to load per click
    let currentIndex = 0;

    fetch('../Data/latest-recipes.json') // Adjust the path as needed for your project
        .then(response => response.json())
        .then(recipes => {
            // Function to load the recipes
            function loadRecipes() {
                const endIndex = currentIndex + itemsPerPage;
                const currentRecipes = recipes.slice(currentIndex, endIndex);

                currentRecipes.forEach(recipe => {
                    // Create a formatted link by encoding the title
                    const formattedLink = `recipe.html?title=${encodeURIComponent(recipe.title)}`;

                    const recipeHTML = `
                        <div class="col-lg-3 col-md-4 col-6">
                            <figure class="my-3 my-md-4 RecipeNest-card">
                                <a href="${formattedLink}" class="RecipeNest-animation stretched-link rounded-6">
                                    <img src="${recipe.image}" class="w-100" alt="${recipe.title}">
                                </a>
                                <figcaption class="mt-2">
                                    <a href="${formattedLink}" class="text-black d-block mt-1 font-weight-semibold big">${recipe.title}</a>
                                </figcaption>
                            </figure>
                        </div>
                    `;
                    section.insertAdjacentHTML('beforeend', recipeHTML);
                });

                currentIndex += itemsPerPage;

                // If all recipes are shown, hide the "Load More" button
                if (currentIndex >= recipes.length) {
                    loadMoreButton.style.display = 'none';
                }
            }

            // Initial load of 4 recipes
            loadRecipes();

            // Event listener for the "Load More" button
            loadMoreButton.addEventListener('click', function (e) {
                e.preventDefault();
                loadRecipes();
            });
        })
        .catch(error => {
            console.error('Error loading latest recipes:', error);
        });
});

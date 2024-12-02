document.addEventListener('DOMContentLoaded', () => {
    fetch('../Data/fresh-recipes.json') // Adjust the path as needed for your project
        .then(response => response.json())
        .then(recipes => {
            const section = document.querySelector('.RecipeNest-components .fresh-recipes'); // Adjust this selector to your container
            section.innerHTML = '<h6>Fresh Recipes</h6>'; // Clear existing content

            recipes.forEach(recipe => {
                // URL-encode the title for the link
                const formattedLink = `recipe?title=${encodeURIComponent(recipe.title)}`;

                const recipeHTML = `
                    <figure class="mt-4 pb-2 row g-0 align-items-center RecipeNest-card">
                        <div class="col-4">
                            <a href="${formattedLink}" class="RecipeNest-animation stretched-link rounded-4">
                                <img src="${recipe.image}" class="w-100" alt="Menu">
                            </a>
                        </div>
                        <figcaption class="bg-cream col-8">
                            <div class="pl-3">
                                <div class="w-100 float-left">
                                    <div class="float-left">
                                        <div class="fabrx-ratings has-rating rating">
                                            <!-- Add rating radio buttons here -->
                                        </div>
                                    </div>
                                </div>
                                <h6 class="inter-font f-size-20 mt-2 font-weight-semibold">
                                    <a href="${formattedLink}" class="text-black">${recipe.title}</a>
                                </h6>
                            </div>
                        </figcaption>
                    </figure>
                `;
                section.insertAdjacentHTML('beforeend', recipeHTML);
            });
        })
        .catch(error => {
            console.error('Error loading fresh recipes:', error);
        });
});

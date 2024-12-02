document.addEventListener('DOMContentLoaded', () => {
    fetch('../Data/you-might-also-like.json') // Adjust the path as needed for your project
        .then(response => response.json())
        .then(recipes => {
            const section = document.querySelector('.RecipeNest-components .you-might-also-like'); // Adjust this selector to your container
            section.innerHTML = ''; // Clear existing content

            recipes.forEach(recipe => {
                // URL-encode the title for the link
                const formattedLink = `recipe?title=${encodeURIComponent(recipe.title)}`;

                const recipeHTML = `
                    <div class="col-lg-3 col-md-4 col-6">
                        <figure class="my-3 my-md-4 RecipeNest-card">
                            <a href="${formattedLink}" class="RecipeNest-animation stretched-link rounded-6">
                                <img src="${recipe.image}" class="w-100" alt="Menu">
                            </a>
                            <figcaption class="mt-2">
                                <a href="${formattedLink}"
                                    class="text-black d-block mt-1 font-weight-semibold big">${recipe.title}</a>
                            </figcaption>
                        </figure>
                    </div>
                `;
                section.insertAdjacentHTML('beforeend', recipeHTML);
            });

            // Closing div tag for row
            section.innerHTML += '</div>';
        })
        .catch(error => {
            console.error('Error loading recipes:', error);
        });
});

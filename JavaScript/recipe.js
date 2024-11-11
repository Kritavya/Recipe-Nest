document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const title = params.get('title');

    // Fetch the recipes and display the recipe with the matching title
    fetch('../Data/recipes.json')
        .then(response => response.json())
        .then(recipes => {
            const recipe = recipes.find(r => r.title === title);

            if (recipe) {
                // Set the title dynamically
                document.getElementById('recipe-title').innerText = recipe.title;

                // Set the description dynamically
                document.querySelector('.blog-detail p').innerText = recipe.full_description;

                // Set the photo dynamically
                document.querySelector('.blog-detail img').src = recipe.photo;
                document.querySelector('.blog-detail img').alt = recipe.title; // Update alt text

                const detailsContainer = document.getElementById('recipe-details');

                // Create the Ingredients section
                let ingredientsHTML = `
                    <div class="mt-4 mt-md-5">
                        <h6>Ingredients</h6>
                `;

                for (const [category, items] of Object.entries(recipe.ingredients)) {
                    ingredientsHTML += `
                        <div class="checklist pb-2">
                            <strong>${category}</strong>
                    `;

                    items.forEach((ingredient, index) => {
                        const id = `${category.toLowerCase().replace(/\s+/g, '-')}-${index}`;
                        ingredientsHTML += `
                            <div class="form-check form-check-rounded recipe-checkbox">
                                <input type="checkbox" id="${id}" name="${id}" class="form-check-input">
                                <label class="form-check-label" for="${id}">${ingredient}</label>
                            </div>
                        `;
                    });

                    ingredientsHTML += `</div>`;
                }

                ingredientsHTML += `</div>`;

                // Create the Instructions section
                let instructionsHTML = `
                    <div class="mt-3 mt-md-5">
                        <h6>Instructions</h6>
                        <ol class="instruction-list">
                `;

                recipe.instructions.forEach(step => {
                    instructionsHTML += `<li>${step}</li>`;
                });

                instructionsHTML += `
                        </ol>
                    </div>
                `;

                // Insert the generated HTML into the details container
                detailsContainer.innerHTML = ingredientsHTML + instructionsHTML;
            } else {
                document.getElementById('recipe-title').innerText = 'Recipe not found.';
                document.getElementById('recipe-details').innerText = 'Recipe details not available.';
            }
        })
        .catch(error => console.error('Error fetching the recipes:', error));
});

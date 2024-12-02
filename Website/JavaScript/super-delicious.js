document.addEventListener('DOMContentLoaded', () => {
    fetch('../Data/super-delicious.json') // Update the path as needed
        .then(response => response.json())
        .then(recipes => {
            const section = document.querySelector('.RecipeNest-components .super-delicious');
            section.innerHTML = ''; // Clear any pre-existing content

            recipes.forEach((recipe, index) => {
                const starsHTML = Array.from({ length: 5 }, (_, i) => {
                    const starValue = 5 - i; // Reverse the order: 5, 4, 3, 2, 1
                    return `
                        <input type="radio" id="super-delicious-radio${index * 5 + starValue}" name="super-delicious-rate${index + 1}" value="${starValue}" ${recipe.rating === starValue ? 'checked="checked"' : ''}>
                        <label for="super-delicious-radio${index * 5 + starValue}" class="custom-starboxes"></label>
                    `;
                }).join('');

                const formattedLink = `recipe?title=${encodeURIComponent(recipe.title)}`;

                section.innerHTML += `
                    <div class="col-md-4">
                        <figure class="my-3 RecipeNest-card">
                            <a href="${formattedLink}" class="RecipeNest-animation rounded-6">
                                <img src="${recipe.photo}" class="w-100" alt="${recipe.title}">
                            </a>
                            <figcaption class="mt-2">
                                <div class="w-100 float-left">
                                    <div class="float-left">
                                        <div class="fabrx-ratings has-rating rating">
                                            ${starsHTML}
                                        </div>
                                    </div>
                                </div>
                                <a href="${formattedLink}" class="f-size-20 text-black d-block mt-1 font-weight-semibold">${recipe.title}</a>
                            </figcaption>
                        </figure>
                    </div>
                `;
            });
        })
        .catch(error => console.error('Error fetching the recipes:', error));
});

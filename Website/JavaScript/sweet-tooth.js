document.addEventListener('DOMContentLoaded', () => {
    fetch('../Data/sweet-tooth.json') // Update the path as needed
        .then(response => response.json())
        .then(desserts => {
            const section = document.querySelector('.RecipeNest-components .sweet-tooth');
            section.innerHTML = ''; // Clear any pre-existing content

            desserts.forEach((dessert, index) => {
                // Generate stars in reverse order so that the highest rating is visually on the right
                const starsHTML = Array.from({ length: 5 }, (_, i) => {
                    const starValue = 5 - i; // Reverse the order: 5, 4, 3, 2, 1
                    return `
                        <input type="radio" id="radio${index * 5 + starValue}" name="rate${index + 1}" value="${starValue}" ${dessert.rating === starValue ? 'checked="checked"' : ''}>
                        <label for="radio${index * 5 + starValue}" class="custom-starboxes"></label>
                    `;
                }).join('');

                // Create a URL with the title parameter encoded
                const formattedLink = `recipe.html?title=${encodeURIComponent(dessert.title)}`;

                section.innerHTML += `
                    <div class="col-md-4">
                        <figure class="my-3 RecipeNest-card">
                            <a href="${formattedLink}" class="RecipeNest-animation rounded-6">
                                <img src="${dessert.photo}" class="w-100" alt="${dessert.title}">
                            </a>
                            <figcaption class="mt-2">
                                <div class="w-100 float-left">
                                    <div class="float-left">
                                        <div class="fabrx-ratings has-rating rating">
                                            ${starsHTML}
                                        </div>
                                    </div>
                                </div>
                                <a href="${formattedLink}" class="f-size-20 text-black d-block mt-1 font-weight-semibold">${dessert.title}</a>
                            </figcaption>
                        </figure>
                    </div>
                `;
            });
        })
        .catch(error => console.error('Error fetching the desserts:', error));
});

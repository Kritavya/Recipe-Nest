document.addEventListener('DOMContentLoaded', () => {
    fetch('../Data/popular-categories.json') // Update the path as needed
        .then(response => response.json())
        .then(categories => {
            const section = document.querySelector('.RecipeNest-components .popular-categories');
            section.innerHTML = ''; // Clear any pre-existing content

            categories.forEach((category, index) => {
                const formattedLink = `category?title=${encodeURIComponent(category.title)}`;

                section.innerHTML += `
                    <div class="col-lg-2 col-md-4 col-4">
                        <figure class="my-3 text-center RecipeNest-card">
                            <a href="${formattedLink}" class="RecipeNest-animation stretched-link rounded-circle">
                                <img src="${category.photo}" class="rounded-circle" alt="${category.title}">
                            </a>
                            <figcaption class="mt-2">
                                <a href="${formattedLink}" class="RecipeNest-category-title">${category.title}</a>
                            </figcaption>
                        </figure>
                    </div>
                `;
            });
        })
        .catch(error => console.error('Error fetching the popular categories:', error));
});

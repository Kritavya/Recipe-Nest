document.addEventListener('DOMContentLoaded', function() {
    // Fetch the category data from the JSON file
    fetch('../Data/category.json')  // Adjust path based on actual location of your JSON file
        .then(response => response.json())  // Parse the JSON data
        .then(data => {
            const categories = data;  // The JSON data is an array of categories
            const container = document.querySelector('.row');  // Find the container to insert categories

            // Loop through each category and create HTML elements dynamically
            categories.forEach(category => {
                // Create a column div for each category
                const col = document.createElement('div');
                col.classList.add('col-lg-3', 'col-md-4', 'col-6');

                // Create a figure element for the category
                const figure = document.createElement('figure');
                figure.classList.add('my-3', 'my-md-4', 'text-center', 'RecipeNest-card');

                // Create the link element
                const link = document.createElement('a');
                link.href = category.link;
                link.classList.add('RecipeNest-animation', 'stretched-link', 'rounded-circle');

                // Create the image element
                const img = document.createElement('img');
                img.src = category.imgSrc;
                img.classList.add('rounded-circle');
                img.alt = category.name;  // Set alt text as category name

                // Append the image to the link
                link.appendChild(img);

                // Create the caption for the category
                const figcaption = document.createElement('figcaption');
                figcaption.classList.add('mt-2', 'mt-md-3');

                // Create the category title link
                const categoryTitle = document.createElement('a');
                categoryTitle.href = category.link;
                categoryTitle.classList.add('RecipeNest-category-title');
                categoryTitle.textContent = category.name;  // Set the category name as text

                // Append the title link to the figcaption
                figcaption.appendChild(categoryTitle);

                // Append the link and figcaption to the figure
                figure.appendChild(link);
                figure.appendChild(figcaption);

                // Append the figure to the column div
                col.appendChild(figure);

                // Append the column div to the container (row)
                container.appendChild(col);
            });
        })
        .catch(error => {
            console.error('Error loading the categories:', error);
        });
});

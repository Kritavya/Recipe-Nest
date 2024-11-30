// Collect the form data
const form = document.querySelector('form');
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(form); // Collect all form data
    const ingredientsMap = {}; // Initialize ingredients as an object

    // Collect ingredients into an object
    for (let [key, value] of formData.entries()) {
        if (key.startsWith('ingredients[')) {
            const groupKey = key.match(/ingredients\[(.*?)\]/)[1]; // Extract group ID
            if (!ingredientsMap[groupKey]) {
                ingredientsMap[groupKey] = []; // Initialize array for this group if not exists
            }
            ingredientsMap[groupKey].push(value); // Add the ingredient to the appropriate group
        }
    }

    // Prepare the JSON payload
    const payload = {
        title: formData.get('title'),
        full_description: formData.get('full_description'),
        photo: formData.get('photo'),
        categories: formData.get('categories').split(','), // Split categories into an array
        ingredients: ingredientsMap, // Use the collected ingredients object
        instructions: formData.getAll('instructions[]'), // Collect all instructions
    };

    try {
        const response = await fetch('/add-recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json();
        if (response.ok) {
            alert('Recipe added successfully!');
            form.reset(); // Reset form fields after successful submission
        } else {
            console.error('Error adding recipe:', result.error);
            alert('Failed to add recipe. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred.');
    }
});
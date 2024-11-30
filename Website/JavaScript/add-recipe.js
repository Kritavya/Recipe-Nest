const form = document.querySelector('form');
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(form); // Collect all form data
    const ingredientsMap = {}; // Initialize ingredients as an object

    // Collect ingredients into an object
    for (let [key, value] of formData.entries()) {
        const match = key.match(/ingredients\[(.+?)\]\[(\d+)\]/);
        if (match) {
            const headingValue = match[1]; // Get the group heading
            // Add the ingredient to the corresponding heading in the ingredientsMap
            if (!ingredientsMap[headingValue]) {
                ingredientsMap[headingValue] = []; // Initialize array for this heading
            }
            ingredientsMap[headingValue].push(value); // Push the ingredient into the array for the correct heading
        }
    }

    // Append the structured ingredients and instructions to formData
    formData.set('ingredients', JSON.stringify(ingredientsMap)); // Send as a JSON string
    formData.set('instructions', JSON.stringify(formData.getAll('instructions[]'))); // Send instructions as JSON string

    try {
        const response = await fetch('/add-recipe', { // Ensure the correct endpoint
            method: 'POST',
            body: formData, // Send FormData directly
        });

        const result = await response.json();
        if (response.ok) {
            alert('Recipe added successfully!');
            form.reset(); // Reset form fields after successful submission
            ingredientGroupCount = 0; // Reset ingredient group count
            document.getElementById('ingredients-section').innerHTML = ''; // Clear ingredient section
        } else {
            console.error('Error adding recipe:', result.error);
            alert('Failed to add recipe. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred.');
    }
});

function shareRecipe() {
    // Get the current page URL to copy
    var currentUrl = window.location.href;

    // Create a temporary input field to copy the URL
    var tempInput = document.createElement("input");
    tempInput.value = currentUrl;
    document.body.appendChild(tempInput);

    // Select the content of the input field
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);  // For mobile devices

    // Execute the copy command
    document.execCommand("copy");

    // Remove the temporary input field
    document.body.removeChild(tempInput);

    // Display a message to the user
    showCopyMessage();
}

function showCopyMessage() {
    // Create the message element
    var message = document.createElement("div");
    message.innerText = "Recipe link copied to clipboard!";
    message.style.position = "fixed";
    message.style.bottom = "20px";
    message.style.left = "50%";
    message.style.transform = "translateX(-50%)";
    message.style.backgroundColor = "#4CAF50";
    message.style.color = "white";
    message.style.padding = "10px 20px";
    message.style.borderRadius = "5px";
    message.style.fontSize = "16px";
    message.style.zIndex = "9999";

    // Append the message to the body
    document.body.appendChild(message);

    // Remove the message after 2 seconds
    setTimeout(function() {
        document.body.removeChild(message);
    }, 2000);
}

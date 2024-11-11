function printSection() {
    // Step 1: Clone the section you want to print
    var content = document.querySelector('.recipe-print').cloneNode(true);
    
    // Step 2: Find and remove the specific divs you want to exclude
    var excludeElements = content.querySelectorAll('.no-print1, .my-4.my-md-5.pt-5.pb-4.py-md-5, .my-5.pt-0.pt-md-3, .write-comment');
    excludeElements.forEach(function(element) {
        element.remove();  // Remove each of the unwanted elements
    });

    // Step 3: Open a new window for printing
    var printWindow = window.open('', '', 'height=600,width=800');

    // Step 4: Prepare the styles to inject into the print window
    var styles = '';
    var styleSheets = document.styleSheets;
    for (var i = 0; i < styleSheets.length; i++) {
        var sheet = styleSheets[i];
        if (sheet.cssRules) {
            for (var j = 0; j < sheet.cssRules.length; j++) {
                styles += sheet.cssRules[j].cssText;
            }
        } else if (sheet.rules) {
            for (var j = 0; j < sheet.rules.length; j++) {
                styles += sheet.rules[j].cssText;
            }
        }
    }

    // Step 5: Write the content and styles to the print window
    printWindow.document.open();
    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('<style>' + styles + '</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(content.outerHTML);  // Add the modified content
    printWindow.document.write('</body></html>');
    printWindow.document.close();  // Close the document to trigger the print dialog

    // Step 6: Trigger the print dialog
    printWindow.print();
}

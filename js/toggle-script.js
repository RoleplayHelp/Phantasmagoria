document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    const toggles = document.querySelectorAll('.toggle-title');
    console.log('Found', toggles.length, 'toggle elements');

    toggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            console.log('Toggle clicked:', this.textContent.trim());
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content && content.classList.contains('toggle-content')) {
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
                console.log('Toggled content visibility');
            } else {
                console.error('No matching toggle-content found');
            }
        });
    });
});
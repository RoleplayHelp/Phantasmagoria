document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const backToTopButton = document.getElementById("backToTop");

    // Hàm load nội dung
function loadContent(sectionId, fileName) {
    const section = document.getElementById(sectionId);
    const contentArea = section.querySelector('.content-area');
    
    fetch(`content/${fileName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            console.log(`Content loaded for ${sectionId}`); // Log khi nội dung được tải thành công
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const content = doc.querySelector('.background-plot') || doc.body;
            if (content) {
                contentArea.innerHTML = content.innerHTML;
            } else {
                console.warn(`No content found in ${fileName}`); // Log khi không tìm thấy nội dung
                contentArea.innerHTML = '<p>Không tìm thấy nội dung.</p>';
            }
        })
        .catch(error => {
            console.error(`Error loading content for ${sectionId}:`, error);
            contentArea.innerHTML = '<p>Lỗi khi tải nội dung. Vui lòng thử lại sau.</p>';
        });
}

    // Load nội dung cho các phần
    loadContent('plot-intro', 'background-plot.html');
    loadContent('organizations', 'organization.html');

    // Xử lý đóng/mở nội dung cho tất cả các phần
    sections.forEach(section => {
        const toggle = section.querySelector('.toggleable');
        const contentArea = section.querySelector('.content-area');

        toggle.addEventListener('click', function() {
            if (contentArea.style.display === 'none' || contentArea.style.display === '') {
                contentArea.style.display = 'block';
                toggle.classList.add('active');
            } else {
                contentArea.style.display = 'none';
                toggle.classList.remove('active');
            }
        });
    });

    // Xử lý nút Back to Top
    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    };

    backToTopButton.onclick = function() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };
});
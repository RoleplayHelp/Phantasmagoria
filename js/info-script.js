document.addEventListener('DOMContentLoaded', function() {
    const introSection = document.getElementById('intro');
    const introContent = introSection.querySelector('.content-area');
    const introToggle = introSection.querySelector('h2');
    const backToTopButton = document.getElementById("backToTop");

    // Hàm load nội dung
    function loadContent() {
        fetch('content/background-plot.html')
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                const content = doc.querySelector('.background-plot');
                if (content) {
                    introContent.innerHTML = content.innerHTML;
                } else {
                    introContent.innerHTML = '<p>Không tìm thấy nội dung.</p>';
                }
            })
            .catch(error => {
                console.error('Error loading content:', error);
                introContent.innerHTML = '<p>Lỗi khi tải nội dung. Vui lòng thử lại sau.</p>';
            });
    }

    // Load nội dung khi trang được tải
    loadContent();

    // Xử lý đóng/mở nội dung
    introToggle.addEventListener('click', function() {
        if (introContent.style.display === 'none' || introContent.style.display === '') {
            introContent.style.display = 'block';
            introToggle.classList.add('active');
        } else {
            introContent.style.display = 'none';
            introToggle.classList.remove('active');
        }
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
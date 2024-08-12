document.addEventListener('DOMContentLoaded', function() {
    // Cấu hình các section và file HTML tương ứng
    const sectionConfig = [
        { id: 'baseStat', file: 'baseStat.html' },
        { id: 'class', file: 'class.html' },
        { id: 'skill', file: 'skill.html' },
        { id: 'cpShop', file: 'cpShop.html' },
        // Thêm các section mới ở đây
    ];

    const sections = document.querySelectorAll('.section');
    const backToTopButton = document.getElementById("backToTop");

    // Hàm load nội dung
    function loadContent(sectionId, fileName) {
        const section = document.getElementById(sectionId);
        if (!section) {
            console.error(`Section with id "${sectionId}" not found`);
            return;
        }
        const contentArea = section.querySelector('.content-area');
        if (!contentArea) {
            console.error(`Content area not found in section "${sectionId}"`);
            return;
        }
        
        fetch(`content/${fileName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                console.log(`Content loaded for ${sectionId}`);
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                const content = doc.querySelector('.background-plot') || doc.body;
                if (content) {
                    contentArea.innerHTML = content.innerHTML;
                    // Sau khi load nội dung, áp dụng toggle cho các section con
                    applyToggle(contentArea);
                } else {
                    console.warn(`No content found in ${fileName}`);
                    contentArea.innerHTML = '<p>Không tìm thấy nội dung.</p>';
                }
            })
            .catch(error => {
                console.error(`Error loading content for ${sectionId}:`, error);
                contentArea.innerHTML = '<p>Lỗi khi tải nội dung. Vui lòng thử lại sau.</p>';
            });
    }

    // Hàm áp dụng toggle cho các phần tử
    function applyToggle(element) {
        const toggleables = element.querySelectorAll('.toggleable');
        toggleables.forEach(toggle => {
            toggle.addEventListener('click', function() {
                // Tìm phần tử content-area gần nhất
                const contentArea = this.nextElementSibling;
                if (contentArea && contentArea.classList.contains('content-area')) {
                    // Toggle hiển thị của content-area
                    contentArea.style.display = contentArea.style.display === 'none' || contentArea.style.display === '' ? 'block' : 'none';
                    
                    // Toggle class 'active' cho phần tử được click
                    this.classList.toggle('active');
                }
            });
        });
    }

    // Load nội dung cho các phần
    sectionConfig.forEach(section => {
        loadContent(section.id, section.file);
    });

    // Áp dụng toggle cho các section chính
    applyToggle(document);

    // Ẩn tất cả các content-area ban đầu
    document.querySelectorAll('.content-area').forEach(area => {
        area.style.display = 'none';
    });

    // Xử lý nút Back to Top
    if (backToTopButton) {
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
    }
});
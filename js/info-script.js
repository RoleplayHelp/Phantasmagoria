document.addEventListener('DOMContentLoaded', function() {
    // Cấu hình các section và file HTML tương ứng
    const sectionConfig = [
        { id: 'intro', file: 'background-plot.html' },
        { id: 'organizations', file: 'organization.html' },
        { id: 'networkavatar', file: 'network avatar.html' },
        { id: 'cyberInfo', file: 'cyberFrontier.html' },
        { id: 'miscInfo', file: 'miscInfo.html' }
        // Thêm các section mới ở đây
    ];

    const sections = document.querySelectorAll('section');
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

    // Load nội dung cho các phần
    sectionConfig.forEach(section => {
        loadContent(section.id, section.file);
    });

    // Xử lý đóng/mở nội dung cho tất cả các phần
    sections.forEach(section => {
        const toggle = section.querySelector('.toggleable');
        const contentArea = section.querySelector('.content-area');
        if (toggle && contentArea) {
            toggle.addEventListener('click', function() {
                if (contentArea.style.display === 'none' || contentArea.style.display === '') {
                    contentArea.style.display = 'block';
                    toggle.classList.add('active');
                } else {
                    contentArea.style.display = 'none';
                    toggle.classList.remove('active');
                }
            });
        }
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
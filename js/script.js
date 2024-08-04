function createDataParticles() {
    const container = document.body;
    const contentArea = document.querySelector('.background-plot');
    
    // Xóa các particles cũ nếu có
    const oldParticles = document.querySelectorAll('.data-particle');
    oldParticles.forEach(particle => particle.remove());

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('data-particle');
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 3}s`;
        particle.textContent = Math.random().toString(36).substring(2, 8);
        
        // Thêm particle vào body, nhưng đặt nó phía sau content area
        container.insertBefore(particle, contentArea);
    }
}

// Gọi hàm khi trang được load và khi cửa sổ thay đổi kích thước
document.addEventListener('DOMContentLoaded', createDataParticles);
window.addEventListener('resize', createDataParticles);
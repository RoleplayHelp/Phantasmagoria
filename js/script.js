function createDataParticles() {
    console.log("Creating data particles");
    let container = document.getElementById('particles-container');
    
    // Nếu container không tồn tại, tạo nó
    if (!container) {
        console.log("Particles container not found. Creating one.");
        container = document.createElement('div');
        container.id = 'particles-container';
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '-1';
        document.body.appendChild(container);
    }

    // Xóa các particles cũ nếu có
    container.innerHTML = '';

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('data-particle');
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 3}s`;
        particle.textContent = Math.random().toString(36).substring(2, 8);
        
        container.appendChild(particle);
    }
}

function initPage() {
    // Đảm bảo DOM đã tải xong trước khi tạo particles
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        createDataParticles();
        window.addEventListener('resize', createDataParticles);
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            createDataParticles();
            window.addEventListener('resize', createDataParticles);
        });
    }
}

initPage();
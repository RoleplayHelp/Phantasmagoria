(function() {
    const SCRIPT_URL = "https://html2canvas.hertzen.com/dist/html2canvas.min.js";
    const CAPTURE_BUTTON_TEXT = 'Chụp ảnh phần này';
    const LOADING_MESSAGE = 'Đang chụp ảnh...';

    function loadScript(url, callback) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.onload = callback;
        document.head.appendChild(script);
    }

    function initCaptureFunctionality() {
        function addCaptureButtons() {
            const contentSections = document.querySelectorAll('.content-area');
            contentSections.forEach((section, index) => {
                const button = createCaptureButton(index);
                section.parentNode.insertBefore(button, section.nextSibling);
            });
        }

        function createCaptureButton(index) {
            const button = document.createElement('button');
            button.textContent = CAPTURE_BUTTON_TEXT;
            button.className = 'capture-button';
            button.style.marginTop = '10px';
            button.addEventListener('click', () => prepareAndCapture(document.querySelectorAll('.content-area')[index], index));
            return button;
        }

        function prepareAndCapture(element, index) {
            const parentSection = element.closest('section');
            const toggleable = parentSection.querySelector('.toggleable');
            const wasHidden = element.style.display === 'none';

            toggleVisibility(element, toggleable, true);

            setTimeout(() => {
                captureContent(element, index, () => {
                    toggleVisibility(element, toggleable, wasHidden);
                });
            }, 100);
        }

        function toggleVisibility(element, toggleable, show) {
            element.style.display = show ? 'block' : 'none';
            if (toggleable) {
                toggleable.classList[show ? 'add' : 'remove']('active');
            }
        }

        function captureContent(element, index, callback) {
            const loadingMessage = showLoadingMessage();

            html2canvas(element, getHtml2CanvasOptions())
                .then(canvas => {
                    hideLoadingMessage(loadingMessage);
                    showCapturedImage(canvas, index);
                    if (callback) callback();
                })
                .catch(handleCaptureError(loadingMessage, callback));
        }

function getHtml2CanvasOptions() {
    return {
        allowTaint: true,
        useCORS: true,
        scale: 2,
        scrollY: -window.scrollY,
        backgroundColor: null,
        logging: false,
        onclone: function(clonedDoc) {
            const clonedElement = clonedDoc.querySelector('.content-area');
            clonedElement.style.display = 'block';
            
            // Xử lý background images
            handleBackgroundImages(clonedElement);
            
            // Xử lý các ảnh trong nội dung
            handleContentImages(clonedElement);
        }
    };
}

function handleBackgroundImages(element) {
    const elementsWithBg = element.querySelectorAll('*');
    elementsWithBg.forEach(el => {
        const style = window.getComputedStyle(el);
        const bgImage = style.getPropertyValue('background-image');
        if (bgImage && bgImage !== 'none') {
            el.setAttribute('data-html2canvas-ignore', 'false');
            el.style.backgroundImage = bgImage;
        }
    });
}

function handleContentImages(element) {
    const images = element.querySelectorAll('img');
    images.forEach(img => {
        // Đảm bảo rằng ảnh có thuộc tính crossOrigin
        if (img.src.startsWith('http')) {
            img.crossOrigin = 'anonymous';
        }
        // Thêm một canvas element để vẽ ảnh
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
        img.src = canvas.toDataURL();
    });
}

        function handleCaptureError(loadingMessage, callback) {
            return error => {
                console.error('Lỗi khi chụp ảnh:', error);
                hideLoadingMessage(loadingMessage);
                alert('Có lỗi xảy ra khi chụp ảnh. Vui lòng thử lại.');
                if (callback) callback();
            };
        }

        function showLoadingMessage() {
            const loadingMessage = document.createElement('div');
            loadingMessage.textContent = LOADING_MESSAGE;
            Object.assign(loadingMessage.style, {
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                padding: '20px',
                background: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                borderRadius: '10px',
                zIndex: '9999'
            });
            document.body.appendChild(loadingMessage);
            return loadingMessage;
        }

        function hideLoadingMessage(loadingMessage) {
            document.body.removeChild(loadingMessage);
        }

        function showCapturedImage(canvas, index) {
            const imageWindow = window.open();
            imageWindow.document.write(generateImageWindowHTML(canvas, index));
            imageWindow.document.close();
        }

        function generateImageWindowHTML(canvas, index) {
            const imageDataUrl = canvas.toDataURL("image/png", 1.0);
            return `
                <html>
                <head>
                    <title>Ảnh chụp nội dung</title>
                </head>
                <body style="margin:0; padding:0;">
                    <h1 style="text-align:center;">Ảnh chụp nội dung phần ${index + 1}</h1>
                    <img src="${imageDataUrl}" alt="Captured content" style="max-width:100%; display:block; margin:auto;">
                    <div style="text-align:center; margin-top:20px;">
                        <button onclick="window.print()">In ảnh</button>
                        <button onclick="download()">Tải xuống</button>
                    </div>
                    <script>
                    function download() {
                        const link = document.createElement('a');
                        link.download = 'content-capture-${index + 1}.png';
                        link.href = '${imageDataUrl}';
                        link.click();
                    }
                    </script>
                </body>
                </html>
            `;
        }


        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', addCaptureButtons);
        } else {
            addCaptureButtons();
        }
    }
function getContentTitle(element) {
    // Tìm tiêu đề trong phần tử nội dung
    const titleElement = element.querySelector('h1, h2, h3, h4, h5, h6');
    if (titleElement) {
        return titleElement.textContent.trim();
    }
    // Nếu không tìm thấy tiêu đề, sử dụng tiêu đề mặc định
    return `Nội dung phần ${index + 1}`;
}

function prepareAndCapture(element, index) {
    const parentSection = element.closest('section');
    const toggleable = parentSection.querySelector('.toggleable');
    const wasHidden = element.style.display === 'none';

    toggleVisibility(element, toggleable, true);

    setTimeout(() => {
        const title = getContentTitle(element);
        captureContent(element, index, title, () => {
            toggleVisibility(element, toggleable, wasHidden);
        });
    }, 100);
}

function captureContent(element, index, title, callback) {
    const loadingMessage = showLoadingMessage();

    // Đợi để đảm bảo tất cả ảnh đã load
    waitForImages(element).then(() => {
        html2canvas(element, getHtml2CanvasOptions())
            .then(canvas => {
                hideLoadingMessage(loadingMessage);
                showCapturedImage(canvas, index, title);
                if (callback) callback();
            })
            .catch(handleCaptureError(loadingMessage, callback));
    });
}

function waitForImages(element) {
    const images = element.querySelectorAll('img');
    const imagePromises = Array.from(images).map(img => {
        if (img.complete) {
            return Promise.resolve();
        } else {
            return new Promise(resolve => {
                img.onload = resolve;
                img.onerror = resolve; // Vẫn tiếp tục nếu ảnh không load được
            });
        }
    });
    return Promise.all(imagePromises);
}

function showCapturedImage(canvas, index, title) {
    const imageWindow = window.open();
    imageWindow.document.write(generateImageWindowHTML(canvas, index, title));
    imageWindow.document.close();
}

function generateImageWindowHTML(canvas, index, title) {
    const imageDataUrl = canvas.toDataURL("image/png", 1.0);
    const safeFileName = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    return `
        <html>
        <head>
            <title>${title}</title>
        </head>
        <body style="margin:0; padding:0;">
            <h1 style="text-align:center;">${title}</h1>
            <img src="${imageDataUrl}" alt="Captured content" style="max-width:100%; display:block; margin:auto;">
            <div style="text-align:center; margin-top:20px;">
                <button onclick="window.print()">In ảnh</button>
                <button onclick="download()">Tải xuống</button>
            </div>
            <script>
            function download() {
                const link = document.createElement('a');
                link.download = '${safeFileName}.png';
                link.href = '${imageDataUrl}';
                link.click();
            }
            </script>
        </body>
        </html>
    `;
}
    loadScript(SCRIPT_URL, initCaptureFunctionality);
})();
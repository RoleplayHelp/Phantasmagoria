// search.js

(function() {
    function createSearchBar() {
        const searchBar = document.createElement('div');
        searchBar.id = 'search-bar';
        searchBar.innerHTML = `
            <input type="text" id="search-input" placeholder="Tìm kiếm...">
            <button id="search-button">🔍</button>
        `;
        document.body.appendChild(searchBar);

        const style = document.createElement('style');
        style.textContent = `
            #search-bar {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 1000;
            }
            #search-input {
                padding: 5px;
                border-radius: 20px;
                border: 1px solid #ccc;
                background-color: rgba(0, 0, 0, 0.7);
                color: #fff;
            }
            #search-input::placeholder {
                color: #aaa;
            }
            #search-button {
                background: none;
                border: none;
                cursor: pointer;
                color: #fff;
            }
        `;
        document.head.appendChild(style);
    }

    function initSearch() {
        createSearchBar();
        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');

        function performSearch() {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
            }
        }

        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSearch);
    } else {
        initSearch();
    }
})();
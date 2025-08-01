
// ===============================
// UI Interactions Script (IIFE)
// ===============================
(function() {
    // Navbar dark mode on scroll
    const header = document.querySelector('.navbar');
    window.onscroll = function() {
        const top = window.scrollY;
        if (top >= 100) {
            header.classList.add('navbarDark');
        } else {
            header.classList.remove('navbarDark');
        }
    };

    // Collapse navbar after click on small devices
    const navLinks = document.querySelectorAll('.nav-item');
    const menuToggle = document.getElementById('navbarSupportedContent');
    navLinks.forEach((l) => {
        l.addEventListener('click', () => {
            new bootstrap.Collapse(menuToggle).toggle();
        });
    });

    // Drag and drop sorting for file list
    const fileList = document.getElementById('sortable-file-list');
    if (fileList) {
        let draggedItem = null;

        // Drag start
        fileList.addEventListener('dragstart', function(e) {
            try {
                if (e.target && e.target.nodeName === "LI") {
                    draggedItem = e.target;
                    e.dataTransfer.effectAllowed = "move";
                }
            } catch (err) {
                console.error('Drag start error:', err);
            }
        });

        // Drag over
        fileList.addEventListener('dragover', function(e) {
            try {
                e.preventDefault();
                const target = e.target;
                if (target && target.nodeName === "LI" && target !== draggedItem) {
                    target.classList.add('drag-over');
                }
            } catch (err) {
                console.error('Drag over error:', err);
            }
        });

        // Drag leave
        fileList.addEventListener('dragleave', function(e) {
            try {
                const target = e.target;
                if (target && target.nodeName === "LI") {
                    target.classList.remove('drag-over');
                }
            } catch (err) {
                console.error('Drag leave error:', err);
            }
        });

        // Drop
        fileList.addEventListener('drop', function(e) {
            try {
                e.preventDefault();
                const target = e.target;
                if (target && target.nodeName === "LI" && target !== draggedItem) {
                    target.classList.remove('drag-over');
                    fileList.insertBefore(draggedItem, target.nextSibling || target);
                }
            } catch (err) {
                console.error('Drop error:', err);
            }
        });

        // Drag end
        fileList.addEventListener('dragend', function(e) {
            try {
                const items = fileList.querySelectorAll('.drag-over');
                items.forEach(item => item.classList.remove('drag-over'));
            } catch (err) {
                console.error('Drag end error:', err);
            }
        });
    }

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        // Load preference
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
        }
        darkModeToggle.addEventListener('click', () => {
            try {
                document.body.classList.toggle('dark-mode');
                localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
            } catch (err) {
                console.error('Dark mode toggle error:', err);
            }
        });
    }
})();
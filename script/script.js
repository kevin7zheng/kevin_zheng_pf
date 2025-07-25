// add class navbarDark on navbar scroll
const header = document.querySelector('.navbar');
console.log(header)
window.onscroll = function() {
    const top = window.scrollY;
    if(top >=100) {
        header.classList.add('navbarDark');
    }
    else {
        header.classList.remove('navbarDark');
    }
}
// collapse navbar after click on small devices
const navLinks = document.querySelectorAll('.nav-item')
const menuToggle = document.getElementById('navbarSupportedContent')

navLinks.forEach((l) => {
    l.addEventListener('click', () => { new bootstrap.Collapse(menuToggle).toggle() })
})

// Drag and drop sorting for file list
const fileList = document.getElementById('sortable-file-list');
if (fileList) {
    let draggedItem = null;

    fileList.addEventListener('dragstart', function(e) {
        if (e.target && e.target.nodeName === "LI") {
            draggedItem = e.target;
            e.dataTransfer.effectAllowed = "move";
        }
    });

    fileList.addEventListener('dragover', function(e) {
        e.preventDefault();
        const target = e.target;
        if (target && target.nodeName === "LI" && target !== draggedItem) {
            target.classList.add('drag-over');
        }
    });

    fileList.addEventListener('dragleave', function(e) {
        const target = e.target;
        if (target && target.nodeName === "LI") {
            target.classList.remove('drag-over');
        }
    });

    fileList.addEventListener('drop', function(e) {
        e.preventDefault();
        const target = e.target;
        if (target && target.nodeName === "LI" && target !== draggedItem) {
            target.classList.remove('drag-over');
            fileList.insertBefore(draggedItem, target.nextSibling || target);
        }
    });

    fileList.addEventListener('dragend', function(e) {
        const items = fileList.querySelectorAll('.drag-over');
        items.forEach(item => item.classList.remove('drag-over'));
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
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });
}
// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const portfolioGrid = document.getElementById('portfolio-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contactForm');

// Foto portfolio (simulasi)
const portfolioItems = [
    { id: 1, src: 'assets/foto14.jpg', title: 'Internship Experince', category: 'PT. Pertamina', desc: 'On-site Data Collection' },
    { id: 2, src: 'assets/foto1.jpg', title: 'Internship Experince', category: 'PT. Kie Putra', desc: 'Catwalk installation supervision.' },
    { id: 3, src: 'assets/fotojpg.6.jpeg', title: 'On-site installation process.', category: 'PT. Kie Putra', desc: 'Catwalk installation.' },
    { id: 4, src: 'assets/fotojpg.6..jpeg', title: 'Catwalk installation', category: 'PT. Kie Putra', desc: 'Mengikuti workshop desain' },
    { id: 5, src: 'assets/4.jpeg', title: 'Design Freelance', category: 'Freelance Mechanical', desc: '' },
    { id: 6, src: 'assets/foto6.jpeg', title: 'Internship Experince', category: 'PT. Pertamina', desc: 'On-site Data Collection' },
    { id: 7, src: 'assets/5.jpeg', title: 'Design Freelance', category: 'Freelance Mechanical', desc: '' },
    { id: 8, src: 'assets/foto8.jpg', title: 'On-site installation process.', category: 'PT. Kie Putra', desc: 'Clean water piping installation.' },
    { id: 9, src: 'assets/foto9.jpeg', title: 'Internship Experince', category: 'PT. Pertamina', desc: '3D Design Models' },
    { id: 9, src: 'assets/1.jpeg', title: 'Internship Experince', category: 'PT. Pertamina', desc: '3D Design Models' },
    { id: 9, src: 'assets/2.jpeg', title: 'Internship Experince', category: 'PT. Pertamina', desc: 'On-site Data Collection' },
    { id: 9, src: 'assets/3.jpeg', title: 'Internship Experince', category: 'PT. Pertamina', desc: 'On-site Data Collection' },
    { id: 8, src: 'assets/foto11.jpg', title: 'On-site installation process.', category: 'PT. Kie Putra', desc: 'Clean water piping installation.' },
    { id: 8, src: 'assets/foto12.jpg', title: 'On-site installation process.', category: 'PT. Kie Putra', desc: 'Clean water piping installation.' },
    { id: 10, src: 'assets/6.jpeg', title: 'Design Freelance', category: 'Freelance Mechanical', desc: '' }
];

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Fungsi untuk membuat elemen portfolio
function createPortfolioItem(item) {
    return `
        <div class="portfolio-item" data-category="${item.category}">
            <img src="${item.src}" alt="${item.title}">
            <div class="portfolio-info">
                <h4>${item.title}</h4>
                <p>${item.desc}</p>
                <span class="portfolio-tag">${item.category}</span>
            </div>
        </div>
    `;
}

// Fungsi untuk memuat portfolio items
function loadPortfolioItems(filter = 'all') {
    portfolioGrid.innerHTML = '';
    
    const filteredItems = filter === 'all' 
        ? portfolioItems 
        : portfolioItems.filter(item => item.category === filter);
    
    filteredItems.forEach(item => {
        portfolioGrid.innerHTML += createPortfolioItem(item);
    });
}

// Filter portfolio items
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Hapus class active dari semua button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Tambah class active ke button yang diklik
        button.classList.add('active');
        
        // Filter portfolio items
        const filter = button.getAttribute('data-filter');
        loadPortfolioItems(filter);
    });
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Ambil nilai dari form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simulasi pengiriman form (bisa diganti dengan backend)
    alert(`Terima kasih ${name}! Pesan Anda telah berhasil dikirim. Saya akan membalas ke email ${email} segera.`);
    
    // Reset form
    contactForm.reset();
});

// Active navigation link berdasarkan scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const navbar = document.querySelector('.navbar');
    
    // Add scrolled class to navbar
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Inisialisasi portfolio items saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    loadPortfolioItems();
    
    // Tambahkan event listener untuk smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animasi saat scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.about-content, .experience-content, .portfolio-item, .skill-item, .contact-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    const animatedElements = document.querySelectorAll('.about-content, .experience-content, .portfolio-item, .skill-item, .contact-content');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    // Tambahkan di akhir script.js

// Fungsi untuk mengubah foto profil menjadi bulat
function makeProfilePhotoRound() {
    const profileImg = document.querySelector('.profile-image img');
    if (profileImg) {
        profileImg.style.borderRadius = '50%';
        profileImg.style.objectFit = 'cover';
        profileImg.style.width = '100%';
        profileImg.style.height = '100%';
    }
}

// Panggil fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    // Kode yang sudah ada...
    
    // Tambah foto profil bulat
    makeProfilePhotoRound();
    
    // Smooth scrolling untuk halaman baru
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Jika link mengarah ke section di halaman yang sama
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
            // Jika link mengarah ke halaman lain dengan hash, biarkan browser menanganinya
        });
    });
});
});
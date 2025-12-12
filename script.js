document.addEventListener('DOMContentLoaded', () => {
    
    // --- Typing Effect ---
    const typingText = document.querySelector('.typing-text');
    const words = ["Chuyển Đổi Số", "Thiết Kế Website", "Tiếp Thị Số (Marketing)"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(type, 2000); // Wait before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500); // Wait before typing next word
        } else {
            setTimeout(type, isDeleting ? 100 : 200);
        }
    }
    
    if(typingText) type();

    // --- Mobile Menu ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');

    function toggleMenu() {
        mobileMenuOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenuOverlay.classList.contains('active') ? 'hidden' : '';
    }

    if(menuBtn) menuBtn.addEventListener('click', toggleMenu);
    if(closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // --- Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const startCounters = (entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    
                    // Lower inc to slow and higher to slow
                    const inc = target / speed;
                    
                    if (count < target) {
                        // Add inc to count and output in counter
                        counter.innerText = Math.ceil(count + inc);
                        // Call function every ms
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    };

    const counterObserver = new IntersectionObserver(startCounters, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


    // --- 3D Tilt Effect for Cards ---
    const cards = document.querySelectorAll('.tilt-effect');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const cardWidth = cardRect.width;
            const cardHeight = cardRect.height;
            const centerX = cardRect.left + cardWidth / 2;
            const centerY = cardRect.top + cardHeight / 2;
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            const rotateX = (mouseY / (cardHeight / 2)) * -10; // Max rotation deg
            const rotateY = (mouseX / (cardWidth / 2)) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
        });
    });

    // --- Smooth Scroll for Header Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if(targetElement){
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Update active state
                document.querySelectorAll('.desktop-nav a').forEach(a => a.classList.remove('active'));
                if(this.closest('.desktop-nav')) {
                   this.classList.add('active');
                }
            }
        });
    });
    
    // --- Intersection Observer for Active Link Highlighting ---
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.desktop-nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

});

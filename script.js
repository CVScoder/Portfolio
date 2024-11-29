document.addEventListener('DOMContentLoaded', (event) => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Highlight active navigation item
    const navItems = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('main section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Animate skill bars
    const skillLevels = document.querySelectorAll('.skill-level');
    const animateSkills = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.style.getPropertyValue('--skill-level');
                observer.unobserve(entry.target);
            }
        });
    };

    const skillObserver = new IntersectionObserver(animateSkills, { threshold: 0.5 });
    skillLevels.forEach(skill => skillObserver.observe(skill));

    // Animate sections on scroll
    const animateSections = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(animateSections, { threshold: 0.1 });
    document.querySelectorAll('section').forEach(section => sectionObserver.observe(section));

    // Typing effect for hero title
    const heroTitle = document.querySelector('.typing-effect');
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    typeWriter();

    // Profile image hover effect
    const profileImage = document.querySelector('.profile-image');
    profileImage.addEventListener('mouseover', () => {
        profileImage.style.transform = 'scale(1.1) rotate(5deg)';
    });
    profileImage.addEventListener('mouseout', () => {
        profileImage.style.transform = 'scale(1) rotate(0deg)';
    });
});

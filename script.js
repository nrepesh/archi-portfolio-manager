// ================================
// CONFIGURATION - GITHUB PAGES BASE PATH
// ================================
const BASE_PATH = '/archi-portfolio-manager';

// ================================
// LOAD PROJECTS FROM CMS
// ================================
async function loadProjects() {
    try {
        const response = await fetch(BASE_PATH + '/projects-data.json?v=' + Date.now());
        if (!response.ok) {
            console.error('Failed to load projects');
            return;
        }

        const projects = await response.json();

        if (projects.length === 0) {
            document.getElementById('projects-grid').innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                    <p style="font-size: 18px; color: #8B8078;">No projects yet. Add your first project in the admin panel!</p>
                </div>
            `;
            return;
        }

        const grid = document.getElementById('projects-grid');
        grid.innerHTML = '';

        projects.forEach(project => {
            const projectCard = document.createElement('article');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                </div>
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-category">${project.category.toUpperCase()} · ${project.year}</p>
                    <p class="project-description">${project.description}</p>
                </div>
            `;
            grid.appendChild(projectCard);
        });

        console.log('Loaded ' + projects.length + ' projects');
    } catch (error) {
        console.error('Error loading projects:', error);
        document.getElementById('projects-grid').innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <p style="font-size: 18px; color: #C67B5C;">Error loading projects. Please refresh the page.</p>
            </div>
        `;
    }
}

// ================================
// LOAD PAGES DATA FROM CMS
// ================================
async function loadAboutPage() {
    try {
        const response = await fetch(BASE_PATH + '/pages-data.json?v=' + Date.now());
        if (!response.ok) {
            console.error('Failed to load pages data');
            return;
        }

        const pagesData = await response.json();

        // Update About Page
        if (pagesData.aboutPage) {
            const aboutPage = pagesData.aboutPage;

            // Update name in header logo
            const logoElement = document.querySelector('.logo');
            if (logoElement && aboutPage.name) {
                logoElement.textContent = aboutPage.name;
            }

            // Update about text
            const aboutTextDiv = document.querySelector('.about-text');
            if (aboutTextDiv && aboutPage.content) {
                const paragraphs = aboutPage.content.split('\n\n').filter(p => p.trim());
                aboutTextDiv.innerHTML = paragraphs.map(p => '<p>' + p + '</p>').join('');
            }

            // Update skills list
            const skillsList = document.querySelector('.skills ul');
            if (skillsList && aboutPage.skills && aboutPage.skills.length > 0) {
                skillsList.innerHTML = aboutPage.skills.map(skill => '<li>' + skill + '</li>').join('');
            }

            // Update profile image
            const aboutImage = document.querySelector('.about-image img');
            if (aboutImage && aboutPage.profile_image) {
                aboutImage.src = aboutPage.profile_image;
                aboutImage.alt = aboutPage.name + ' - Profile';
            }
        }

        // Update Contact Info
        if (pagesData.contact) {
            const contact = pagesData.contact;

            const emailLink = document.querySelector('a[href^="mailto:"]');
            if (emailLink && contact.email) {
                emailLink.href = 'mailto:' + contact.email;
                const svg = emailLink.querySelector('svg');
                if (svg) {
                    emailLink.innerHTML = '';
                    emailLink.appendChild(svg);
                    emailLink.appendChild(document.createTextNode(' ' + contact.email));
                }
            }

            const linkedinLink = document.getElementById('linkedin-link');
            if (linkedinLink && contact.linkedin) {
                linkedinLink.href = contact.linkedin;
            }

            // Update phone link (show only if phone number exists)
            const phoneLink = document.getElementById('phone-link');
            if (phoneLink && contact.phone) {
                phoneLink.href = 'tel:' + contact.phone.replace(/\s/g, '');
                document.getElementById('phone-text').textContent = contact.phone;
                phoneLink.style.display = 'flex';
            }

            // Update other link (show only if URL and label exist)
            const otherLink = document.getElementById('other-link');
            if (otherLink && contact.other_url && contact.other_label) {
                otherLink.href = contact.other_url;
                document.getElementById('other-link-text').textContent = contact.other_label;
                otherLink.style.display = 'flex';
            }
        }

        // Update Site Settings
        if (pagesData.settings) {
            const settings = pagesData.settings;

            if (settings.site_title) {
                document.title = settings.site_title;
            }

            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle && settings.hero_title) {
                heroTitle.textContent = settings.hero_title;
            }

            const heroSubtitle = document.querySelector('.hero-subtitle');
            if (heroSubtitle && settings.hero_subtitle) {
                heroSubtitle.textContent = settings.hero_subtitle;
            }

            const footerText = document.querySelector('.footer p');
            if (footerText) {
                const currentYear = new Date().getFullYear();
                const name = pagesData.aboutPage?.name || 'Your Name';
                const copyright = settings.copyright || 'All rights reserved.';
                footerText.innerHTML = '&copy; ' + currentYear + ' ' + name + '. ' + copyright;
            }
        }

        console.log('Pages data loaded successfully');
    } catch (error) {
        console.error('Error loading pages:', error);
    }
}

// Load data when page loads
document.addEventListener('DOMContentLoaded', function () {
    loadProjects();
    loadAboutPage();
});

// ================================
// PDF GENERATION
// ================================
function generatePDF() {
    const button = document.getElementById('export-pdf');
    const originalText = button.innerHTML;

    button.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="animation: spin 1s linear infinite;"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="50" stroke-dashoffset="0"/></svg> Generating PDF...';
    button.disabled = true;

    const style = document.createElement('style');
    style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
    document.head.appendChild(style);

    const options = {
        margin: [10, 10, 10, 10],
        filename: 'architecture-portfolio.pdf',
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true, logging: false, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: 'avoid-all' },
        legacy: false
    };

    const element = document.createElement('div');
    element.style.padding = '20px';
    element.style.backgroundColor = '#FAF8F3';

    const header = document.createElement('div');
    header.innerHTML = '<div style="text-align: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 1px solid #E8DCC4;"><h1 style="font-family: Cormorant Garamond, serif; font-size: 36px; font-weight: 300; color: #2C2420; margin-bottom: 10px;">' + document.querySelector('.logo').textContent + '</h1><p style="font-size: 16px; color: #4A4035;">Architectural Engineering Portfolio</p></div>';
    element.appendChild(header);

    const projectsSection = document.createElement('div');
    projectsSection.innerHTML = '<h2 style="font-family: Cormorant Garamond, serif; font-size: 28px; color: #2C2420; margin-bottom: 20px;">Selected Works</h2>';

    document.querySelectorAll('.project-card').forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.style.marginBottom = '30px';
        projectDiv.style.pageBreakInside = 'avoid';

        const img = project.querySelector('.project-image img');
        const title = project.querySelector('.project-title').textContent;
        const category = project.querySelector('.project-category').textContent;
        const description = project.querySelector('.project-description').textContent;

        projectDiv.innerHTML = '<div style="margin-bottom: 20px;"><img src="' + img.src + '" style="width: 100%; height: auto; border-radius: 4px; margin-bottom: 15px;"><h3 style="font-family: Cormorant Garamond, serif; font-size: 22px; color: #2C2420; margin-bottom: 8px;">' + title + '</h3><p style="font-size: 12px; color: #8B9D83; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">' + category + '</p><p style="font-size: 14px; color: #4A4035; line-height: 1.6;">' + description + '</p></div>';
        projectsSection.appendChild(projectDiv);
    });
    element.appendChild(projectsSection);

    const aboutText = document.querySelector('.about-text');
    if (aboutText) {
        const aboutSection = document.createElement('div');
        aboutSection.style.pageBreakBefore = 'always';
        const skillsList = Array.from(document.querySelectorAll('.skills li')).map(li => li.textContent.trim());
        aboutSection.innerHTML = '<h2 style="font-family: Cormorant Garamond, serif; font-size: 28px; color: #2C2420; margin-bottom: 20px;">About</h2><div style="font-size: 14px; color: #4A4035; line-height: 1.8; margin-bottom: 30px;">' + aboutText.innerHTML + '</div><h3 style="font-family: Cormorant Garamond, serif; font-size: 20px; color: #2C2420; margin-bottom: 15px;">Expertise</h3><ul style="list-style: none; padding: 0;">' + skillsList.map(skill => '<li style="padding: 8px 0; border-bottom: 1px solid #E8DCC4; font-size: 14px; color: #4A4035;">' + skill + '</li>').join('') + '</ul>';
        element.appendChild(aboutSection);
    }

    const contactSection = document.createElement('div');
    contactSection.style.marginTop = '40px';
    contactSection.style.textAlign = 'center';
    contactSection.style.padding = '20px';
    contactSection.style.backgroundColor = '#F5F1E8';
    contactSection.style.borderRadius = '4px';

    const contactInfo = Array.from(document.querySelectorAll('.contact-link')).map(link => {
        if (link.href.startsWith('mailto:')) return 'Email: ' + link.textContent.trim();
        return link.textContent.trim();
    }).join(' | ');

    contactSection.innerHTML = '<h3 style="font-family: Cormorant Garamond, serif; font-size: 22px; color: #2C2420; margin-bottom: 15px;">Contact</h3><p style="font-size: 14px; color: #4A4035;">' + contactInfo + '</p>';
    element.appendChild(contactSection);

    html2pdf().set(options).from(element).save().then(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        showNotification('PDF downloaded successfully!');
    }).catch(error => {
        console.error('PDF generation error:', error);
        button.innerHTML = originalText;
        button.disabled = false;
        showNotification('Error generating PDF. Please try again.', 'error');
    });
}

// ================================
// NOTIFICATION SYSTEM
// ================================
function showNotification(message, type) {
    type = type || 'success';
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = 'position: fixed; bottom: 30px; right: 30px; background: ' + (type === 'success' ? '#8B9D83' : '#C67B5C') + '; color: white; padding: 15px 25px; border-radius: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); z-index: 10000; font-family: Work Sans, sans-serif; animation: slideIn 0.3s ease-out;';
    document.body.appendChild(notification);
    setTimeout(function () {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(function () { notification.remove(); }, 300);
    }, 3000);
}

const animationStyles = document.createElement('style');
animationStyles.textContent = '@keyframes slideIn { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } } @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(400px); opacity: 0; } }';
document.head.appendChild(animationStyles);

// ================================
// MOBILE MENU
// ================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
}

// ================================
// SMOOTH SCROLL
// ================================
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    });
});

// ================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ================================
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

setTimeout(function () {
    document.querySelectorAll('.project-card, .about-content, .contact-content').forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}, 100);

// ================================
// IMAGE ERROR HANDLING
// ================================
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        document.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
            img.addEventListener('error', function () {
                this.src = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop';
                this.alt = 'Architecture project placeholder';
            });
        });
    }, 500);
});
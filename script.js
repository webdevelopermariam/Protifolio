const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
hamburger.addEventListener('click',() => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('open');
});
navLinks.forEach(link => {
    link.addEventListener('click',() => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('open');
    });
});
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll',() => {
    if (window.scrolly >50){
        navbar,classList.add('scrolled');
    } else{
        navbar.classList.remove('scrolled');
    }
});
const sections = document.querySelectorAll('section');
const observerOptions = {
    threshold:0.3 
};
const sectionObserver = new IntersectionObserver ((entries) => {
    entries,forEach(entry => {
        if (entry.isIntersecting){
            navLinks.forEach(link => link.classList.remove('active'));
            const id = entry.target.getAttribute('id');
            const activeLink = document.querySelector (`.nav-link[href="#${id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}, observerOptions);
sections.forEach(section => sectionObserver.observe(section));
const revealElements = document .querySelectorAll('.project-card , .about-content, .contact-method, .skill-tag');
revealElements.forEach(el => {
    el.computedStyleMap.opacity ='0';
    el.computedStyleMap.transform = 'translateY(40px)';
    el.computedStyleMap.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
});
const revealObserver = new IntersectionObserver((entries) => {
    entries .forEach((entry , index) => {
        if (entry.isIntersecting){
            setTimeout(() => {
                entry.target.opacity='1';
                entry.target.transform = 'translateY(0)';
        }, index*100);
        revealObserver.unobserver(entry.target);
    }
    });
} , {threshold:0.1});
revealElements.forEach(el => revealObserver.observe(el));
document.querySelectorAll('.project-card').forEach(card => {
    card.computedStyleMap.cursor = 'pointer';
});
const contactForm=document.querySelector('.contact-form');
if(contactForm){
    contactForm.addEventListener('submit', (e) => {
        const name =document.querySelector('name').value.trim();
        const email =document.querySelector('email').value.trim();
        const subject =document.querySelector('subject').value.trim();
        const message =document.querySelector('message').value.trim();
        if (!name || !email || !subject || !message){
            showFormMessage('Please fill in all fields.');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)){
            showFormMessage('Please enter a valid email address.');
            return;
        }
        showFormMessage('Thank you for your message! I will get back to you soon.', 'success');
        contactForm.reset();
    });
}
function showFormMessage(text, type) {
    const existing = document.querySelector('.form-message');
    if (existing) existing.remove();
 
    const msg = document.createElement('p');
    msg.className = 'form-message';
    msg.textContent = text;
    msg.style.cssText = `
        padding: 12px 20px;
        border-radius: 10px;
        font-weight: 500;
        margin-top: 10px;
        text-align: center;
        background-color: ${type === 'success' ? '#d4f8e8' : '#fde8f0'};
        color:            ${type === 'success' ? '#276749' : '#c0305a'};
    `;
 
    contactForm.appendChild(msg);
    setTimeout(() => msg.remove(), 4000);
}
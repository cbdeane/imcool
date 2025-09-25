import './css/main.css';
import './css/resume.css';

class ResumeApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.handlePageLoad();
  }

  setupEventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
      this.hideLoadingScreen();
      this.setupNavigation();
      this.setupScrollEffects();
      this.setupAnimations();
    });

    window.addEventListener('beforeunload', () => {
      this.showLoadingScreen();
    });
  }

  handlePageLoad() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => this.hideLoadingScreen(), 500);
      });
    } else {
      setTimeout(() => this.hideLoadingScreen(), 500);
    }
  }

  showLoadingScreen() {
    const loadingScreen = document.getElementById('loading');
    if (loadingScreen) {
      loadingScreen.classList.remove('hidden');
    }
  }

  hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading');
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
      }, 300);
    }
  }

  setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .back-link');

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href !== '#' && href !== window.location.pathname.split('/').pop()) {
          this.showLoadingScreen();
        }
      });
    });
  }

  setupScrollEffects() {
    const nav = document.querySelector('.nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          nav.style.transform = 'translateY(-100%)';
        } else {
          nav.style.transform = 'translateY(0)';
        }
      } else {
        nav.style.transform = 'translateY(0)';
      }

      lastScrollY = currentScrollY;
    });
  }

  setupAnimations() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.resume-section');
    const skillCategories = document.querySelectorAll('.skill-category');

    sections.forEach((section, index) => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
      observer.observe(section);
    });

    skillCategories.forEach((category, index) => {
      category.style.opacity = '0';
      category.style.transform = 'translateY(20px)';
      category.style.transition = `opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${index * 0.1}s`;

      setTimeout(() => observer.observe(category), index * 100);
    });
  }
}

new ResumeApp();
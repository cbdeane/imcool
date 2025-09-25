import './css/main.css';

class App {
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
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        if (link.getAttribute('href') !== window.location.pathname.split('/').pop()) {
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
}

new App();
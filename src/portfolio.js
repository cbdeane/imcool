import './css/main.css';
import './css/portfolio.css';

class PortfolioApp {
  constructor() {
    this.currentIndex = 0;
    this.totalImages = 9;
    this.isTransitioning = false;
    this.autoPlayTimer = null;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.handlePageLoad();
    this.setupGallery();
    this.initLazyLoading();
  }

  setupEventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
      this.hideLoadingScreen();
      this.setupNavigation();
      this.setupScrollEffects();
      this.initializeGallery();
    });

    window.addEventListener('beforeunload', () => {
      this.showLoadingScreen();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.previousImage();
      } else if (e.key === 'ArrowRight') {
        this.nextImage();
      }
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

  setupGallery() {
    const prevButton = document.querySelector('.gallery-prev');
    const nextButton = document.querySelector('.gallery-next');
    const dots = document.querySelectorAll('.gallery-dot');

    if (prevButton) {
      prevButton.addEventListener('click', () => this.previousImage());
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => this.nextImage());
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToImage(index));
    });

    this.startAutoPlay();

    const gallery = document.querySelector('.gallery-container');
    if (gallery) {
      gallery.addEventListener('mouseenter', () => this.stopAutoPlay());
      gallery.addEventListener('mouseleave', () => this.startAutoPlay());
    }
  }

  initializeGallery() {
    this.updateGallery();
  }

  previousImage() {
    if (this.isTransitioning) return;

    this.currentIndex = (this.currentIndex - 1 + this.totalImages) % this.totalImages;
    this.updateGallery();
    this.resetAutoPlay();
  }

  nextImage() {
    if (this.isTransitioning) return;

    this.currentIndex = (this.currentIndex + 1) % this.totalImages;
    this.updateGallery();
    this.resetAutoPlay();
  }

  goToImage(index) {
    if (this.isTransitioning || index === this.currentIndex) return;

    this.currentIndex = index;
    this.updateGallery();
    this.resetAutoPlay();
  }


  startAutoPlay() {
    this.stopAutoPlay();

    const currentItem = document.querySelector(`.gallery-item[data-index="${this.currentIndex}"]`);
    const video = currentItem?.querySelector('.gallery-video');

    if (video && video.duration) {
      // For videos, wait for video duration + 1 second buffer
      const videoDuration = (video.duration * 1000) + 1000;
      this.autoPlayTimer = setTimeout(() => {
        this.nextImage();
      }, videoDuration);
    } else if (video && !video.duration) {
      // If video duration isn't available yet, use loadedmetadata event
      const handleMetadata = () => {
        this.stopAutoPlay();
        const videoDuration = (video.duration * 1000) + 1000;
        this.autoPlayTimer = setTimeout(() => {
          this.nextImage();
        }, videoDuration);
        video.removeEventListener('loadedmetadata', handleMetadata);
      };
      video.addEventListener('loadedmetadata', handleMetadata);
      // Fallback to 5 seconds if metadata doesn't load
      this.autoPlayTimer = setTimeout(() => {
        this.nextImage();
      }, 5000);
    } else {
      // For images, use the standard 5-second timer
      this.autoPlayTimer = setTimeout(() => {
        this.nextImage();
      }, 5000);
    }
  }

  stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearTimeout(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  resetAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  initLazyLoading() {
    // Load videos 2-4 after initial page load
    setTimeout(() => {
      this.loadLazyVideos();
    }, 1000);
  }

  loadLazyVideos() {
    const lazyVideos = document.querySelectorAll('video[data-lazy-src]');

    lazyVideos.forEach(video => {
      const src = video.getAttribute('data-lazy-src');
      const source = video.querySelector('source[data-src]');

      if (src && source) {
        source.src = source.getAttribute('data-src');
        video.load();

        // Remove lazy attributes after loading
        video.removeAttribute('data-lazy-src');
        source.removeAttribute('data-src');
      }
    });
  }

  updateGallery() {
    this.isTransitioning = true;

    const track = document.querySelector('.gallery-track');
    const items = document.querySelectorAll('.gallery-item');
    const dots = document.querySelectorAll('.gallery-dot');

    if (track) {
      const translateX = -this.currentIndex * 11.11; // 100/9 for 9 items
      track.style.transform = `translateX(${translateX}%)`;
    }

    // Handle video playback - check if video is loaded
    items.forEach((item, index) => {
      const video = item.querySelector('.gallery-video');
      const isActive = index === this.currentIndex;

      item.classList.toggle('active', isActive);

      if (video) {
        if (isActive) {
          // Only try to play if video has a source
          const source = video.querySelector('source');
          if (source && source.src) {
            video.play().catch(() => {}); // Ignore autoplay restrictions
          }
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });

    setTimeout(() => {
      this.isTransitioning = false;
    }, 400);
  }
}

new PortfolioApp();
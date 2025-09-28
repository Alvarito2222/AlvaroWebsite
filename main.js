import './style.css'
import Experience from './Experience/Experience'

// Modern loading and initialization with performance monitoring
class App {
  constructor() {
    this.loadingScreen = document.getElementById('loading-screen')
    this.canvas = document.querySelector(".experience-canvas")
    this.experience = null
    this.startTime = performance.now()
    
    this.init()
  }

  async init() {
    try {
      // Show loading screen
      this.showLoading()
      
      // Initialize 3D experience
      await this.initializeExperience()
      
      // Hide loading screen quickly to show 3D scene
      setTimeout(() => {
        this.hideLoading()
      }, 800)
      
    } catch (error) {
      console.error('Failed to initialize application:', error)
      this.hideLoading()
    }
  }

  async initializeExperience() {
    return new Promise((resolve) => {
      this.experience = new Experience(this.canvas)
      
      // Initialize immediately and let Three.js handle loading
      console.log('Initializing 3D Experience...')
      setTimeout(resolve, 300)
    })
  }

  showLoading() {
    if (this.loadingScreen) {
      this.loadingScreen.style.display = 'flex'
    }
  }

  hideLoading() {
    if (this.loadingScreen) {
      this.loadingScreen.classList.add('fade-out')
      setTimeout(() => {
        this.loadingScreen.style.display = 'none'
        this.trackPerformance()
      }, 500)
    }
  }

  trackPerformance() {
    const loadTime = performance.now() - this.startTime
    console.log(`🚀 Portfolio loaded in ${Math.round(loadTime)}ms`)
    
    // Track with Google Analytics if available
    if (typeof gtag !== 'undefined') {
      gtag('event', 'timing_complete', {
        name: 'portfolio_load',
        value: Math.round(loadTime)
      })
    }
    
    // Track Core Web Vitals
    if ('web-vitals' in window) {
      import('https://unpkg.com/web-vitals@3/dist/web-vitals.js').then(({getCLS, getFID, getFCP, getLCP, getTTFB}) => {
        getCLS(console.log)
        getFID(console.log)
        getFCP(console.log)
        getLCP(console.log)
        getTTFB(console.log)
      })
    }
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new App()
})

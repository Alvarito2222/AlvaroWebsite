import './style.css'
import Experience from './Experience/Experience'

// Modern loading and initialization
class App {
  constructor() {
    this.loadingScreen = document.getElementById('loading-screen')
    this.canvas = document.querySelector(".experience-canvas")
    this.experience = null
    
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
      }, 500)
    }
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new App()
})

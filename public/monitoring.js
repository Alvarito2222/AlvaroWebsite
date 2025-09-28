// Performance and Uptime Monitoring
class PerformanceMonitor {
  constructor() {
    this.initWebVitals()
    this.initUptimeCheck()
  }

  initWebVitals() {
    // Load Web Vitals library
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/web-vitals@3/dist/web-vitals.js'
    script.onload = () => {
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = window.webVitals
      
      // Track Core Web Vitals
      getCLS((metric) => this.sendMetric('CLS', metric))
      getFID((metric) => this.sendMetric('FID', metric))
      getFCP((metric) => this.sendMetric('FCP', metric))
      getLCP((metric) => this.sendMetric('LCP', metric))
      getTTFB((metric) => this.sendMetric('TTFB', metric))
    }
    document.head.appendChild(script)
  }

  sendMetric(name, metric) {
    console.log(`📊 ${name}:`, metric.value)
    
    // Send to Google Analytics if available
    if (typeof gtag !== 'undefined') {
      gtag('event', 'web_vital', {
        name: name,
        value: Math.round(metric.value),
        metric_id: metric.id,
        metric_delta: metric.delta
      })
    }
  }

  initUptimeCheck() {
    // Simple uptime monitoring
    setInterval(() => {
      this.checkUptime()
    }, 300000) // Check every 5 minutes
  }

  async checkUptime() {
    try {
      const response = await fetch('/AlvaroResume.pdf', { method: 'HEAD' })
      if (response.ok) {
        console.log('✅ Site is up and running')
      }
    } catch (error) {
      console.warn('⚠️ Site check failed:', error)
    }
  }
}

// Initialize monitoring when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new PerformanceMonitor())
} else {
  new PerformanceMonitor()
}

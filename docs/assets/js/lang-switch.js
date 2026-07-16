// Language Switcher for Adhesive Tape Knowledge Tree

class LanguageSwitcher {
  constructor() {
    this.currentLang = 'zh';
    this.storageKey = 'adhesive-tape-lang';
    
    this.init();
  }
  
  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }
  
  setup() {
    // Detect current language from URL
    this.detectLanguage();
    
    // Load saved language preference
    this.loadLanguagePreference();
    
    // Initialize language switcher buttons
    this.initLanguageButtons();
    
    // Update page content based on language
    this.updatePageContent();
  }
  
  detectLanguage() {
    const path = window.location.pathname;
    
    if (path.startsWith('/en/')) {
      this.currentLang = 'en';
    } else if (path.startsWith('/zh/')) {
      this.currentLang = 'zh';
    } else {
      // Default to Chinese
      this.currentLang = 'zh';
    }
  }
  
  loadLanguagePreference() {
    const savedLang = localStorage.getItem(this.storageKey);
    
    if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
      // If we're on the root page, redirect to saved language
      if (window.location.pathname === '/' || window.location.pathname === '') {
        this.redirectToLanguage(savedLang);
        return;
      }
      
      this.currentLang = savedLang;
    }
  }
  
  initLanguageButtons() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = button.getAttribute('data-lang');
        this.switchLanguage(lang);
      });
      
      // Highlight current language button
      if (button.getAttribute('data-lang') === this.currentLang) {
        button.classList.add('active');
      }
    });
  }
  
  switchLanguage(lang) {
    if (lang === this.currentLang) return;
    
    // Save language preference
    localStorage.setItem(this.storageKey, lang);
    
    // Redirect to the same page in the other language
    this.redirectToLanguage(lang);
  }
  
  redirectToLanguage(lang) {
    const currentPath = window.location.pathname;
    let newPath;
    
    const pathMap = {
      'en-to-zh': {
        '/en/01-fundamental-science/': '/zh/01-基础科学/',
        '/en/02-production-process/': '/zh/02-生产工艺/',
        '/en/03-application-fields/': '/zh/03-应用领域/',
        '/en/04-industry-management/': '/zh/04-行业管理/',
        '/en/': '/zh/'
      },
      'zh-to-en': {
        '/zh/01-基础科学/': '/en/01-fundamental-science/',
        '/zh/02-生产工艺/': '/en/02-production-process/',
        '/zh/03-应用领域/': '/en/03-application-fields/',
        '/zh/04-行业管理/': '/en/04-industry-management/',
        '/zh/': '/en/'
      }
    };
    
    const mapKey = this.currentLang === 'en' ? 'en-to-zh' : 'zh-to-en';
    const map = pathMap[mapKey];
    
    newPath = map[currentPath] || `/${lang}/`;
    
    window.location.href = newPath;
  }
  
  updatePageContent() {
    // This function would update page content based on language
    // In a real implementation, you'd have a translation system
    
    const langIndicator = document.querySelector('.current-lang');
    if (langIndicator) {
      langIndicator.textContent = this.currentLang === 'zh' ? '中文' : 'English';
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = this.currentLang === 'zh' ? 'zh-CN' : 'en';
  }
  
  // Static method to get current language
  static getCurrentLanguage() {
    const path = window.location.pathname;
    
    if (path.startsWith('/en/')) {
      return 'en';
    } else if (path.startsWith('/zh/')) {
      return 'zh';
    }
    
    // Check localStorage
    const savedLang = localStorage.getItem('adhesive-tape-lang');
    if (savedLang) {
      return savedLang;
    }
    
    return 'zh'; // Default
  }
  
  // Static method to get the other language
  static getOtherLanguage() {
    const currentLang = this.getCurrentLanguage();
    return currentLang === 'zh' ? 'en' : 'zh';
  }
  
  // Static method to get current language path prefix
  static getLanguagePrefix() {
    const currentLang = this.getCurrentLanguage();
    return `/${currentLang}`;
  }
}

// Initialize language switcher when DOM is ready
const languageSwitcher = new LanguageSwitcher();

// Add CSS for language switcher
const langSwitchStyles = document.createElement('style');
langSwitchStyles.textContent = `
  .lang-switch {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  
  .lang-btn {
    padding: 0.5rem 1rem;
    border: 1px solid var(--border-color);
    background-color: var(--background-color);
    color: var(--text-color);
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
    font-weight: 500;
  }
  
  .lang-btn:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }
  
  .lang-btn.active {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }
  
  .lang-btn:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--primary-light);
  }
  
  .current-lang {
    font-size: 0.85rem;
    color: var(--text-light);
    margin-right: 0.5rem;
  }
`;

document.head.appendChild(langSwitchStyles);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LanguageSwitcher };
}
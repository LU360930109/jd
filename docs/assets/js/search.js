// Search Functionality for Adhesive Tape Knowledge Tree

class KnowledgeSearch {
  constructor() {
    this.searchIndex = [];
    this.searchInput = null;
    this.searchResults = null;
    this.debounceTimer = null;
    
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
    this.searchInput = document.querySelector('.search-input');
    this.searchResults = document.querySelector('.search-results');
    
    if (!this.searchInput) return;
    
    // Build search index
    this.buildSearchIndex();
    
    // Add event listeners
    this.searchInput.addEventListener('input', 
      this.debounce((e) => this.handleSearch(e.target.value), 300)
    );
    
    this.searchInput.addEventListener('focus', () => {
      if (this.searchInput.value.length > 0) {
        this.showResults();
      }
    });
    
    // Close results when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-box')) {
        this.hideResults();
      }
    });
    
    // Handle keyboard navigation
    this.searchInput.addEventListener('keydown', (e) => {
      this.handleKeydown(e);
    });
  }
  
  buildSearchIndex() {
    // Knowledge points data (in production, this would be loaded from a JSON file)
    const knowledgePoints = [
      // 基础科学 (01-20)
      { id: '01', title: '粘合剂的定义与分类', titleEn: 'Definition and Classification of Adhesives', section: '01-基础科学', sectionEn: '01-fundamental-science', keywords: ['粘合剂', '定义', '分类', 'adhesive', 'definition', 'classification'] },
      { id: '02', title: '压敏胶的原理', titleEn: 'Principle of Pressure-Sensitive Adhesives', section: '01-基础科学', sectionEn: '01-fundamental-science', keywords: ['压敏胶', '原理', 'pressure-sensitive', 'adhesive', 'principle'] },
      { id: '03', title: '基材', titleEn: 'Base Materials', section: '01-基础科学', sectionEn: '01-fundamental-science', keywords: ['基材', '材料', 'base', 'material', 'substrate'] },
      { id: '04', title: '涂布工艺', titleEn: 'Coating Process', section: '01-基础科学', sectionEn: '01-fundamental-science', keywords: ['涂布', '工艺', 'coating', 'process'] },
      { id: '05', title: '离型剂', titleEn: 'Release Agents', section: '01-基础科学', sectionEn: '01-fundamental-science', keywords: ['离型剂', '隔离', 'release', 'agent'] },
      { id: '06', title: '初粘力', titleEn: 'Tack', section: '01-基础科学', sectionEn: '01-fundamental-science', keywords: ['初粘力', '粘性', 'tack', 'adhesion'] },
      { id: '07', title: '持粘力', titleEn: 'Hold Power', section: '01-基础科学', sectionEn: '01-fundamental-science', keywords: ['持粘力', '持久', 'hold', 'power'] },
      { id: '08', title: '剥离强度', titleEn: 'Peel Strength', section: '01-基础科学', sectionEn: '01-fundamental-science', keywords: ['剥离强度', '强度', 'peel', 'strength'] },
      { id: '09', title: '胶带厚度', titleEn: 'Tape Thickness', section: '01-基础科学', sectionEn: '01-fundamental-science', keywords: ['厚度', '尺寸', 'thickness', 'dimension'] },
      { id: '10', title: '胶带宽度', titleEn: 'Tape Width', section: '01-基础科学', sectionEn: '01-fundamental-science', keywords: ['宽度', '尺寸', 'width', 'dimension'] },
      
      // 生产工艺 (21-46)
      { id: '21', title: '涂布设备', titleEn: 'Coating Equipment', section: '02-生产工艺', sectionEn: '02-production-process', keywords: ['涂布设备', '设备', 'coating', 'equipment'] },
      { id: '22', title: '干燥工艺', titleEn: 'Drying Process', section: '02-生产工艺', sectionEn: '02-production-process', keywords: ['干燥', '工艺', 'drying', 'process'] },
      { id: '23', title: '复合工艺', titleEn: 'Lamination Process', section: '02-生产工艺', sectionEn: '02-production-process', keywords: ['复合', '工艺', 'lamination', 'process'] },
      { id: '24', title: '分切工艺', titleEn: 'Slitting Process', section: '02-生产工艺', sectionEn: '02-production-process', keywords: ['分切', '工艺', 'slitting', 'process'] },
      { id: '25', title: '包装工艺', titleEn: 'Packaging Process', section: '02-生产工艺', sectionEn: '02-production-process', keywords: ['包装', '工艺', 'packaging', 'process'] },
      
      // 应用领域 (47-56)
      { id: '47', title: '包装行业', titleEn: 'Packaging Industry', section: '03-应用领域', sectionEn: '03-application-fields', keywords: ['包装', '行业', 'packaging', 'industry'] },
      { id: '48', title: '电子行业', titleEn: 'Electronics Industry', section: '03-应用领域', sectionEn: '03-application-fields', keywords: ['电子', '行业', 'electronics', 'industry'] },
      { id: '49', title: '汽车行业', titleEn: 'Automotive Industry', section: '03-应用领域', sectionEn: '03-application-fields', keywords: ['汽车', '行业', 'automotive', 'industry'] },
      { id: '50', title: '建筑行业', titleEn: 'Construction Industry', section: '03-应用领域', sectionEn: '03-application-fields', keywords: ['建筑', '行业', 'construction', 'industry'] },
      { id: '51', title: '医疗行业', titleEn: 'Medical Industry', section: '03-应用领域', sectionEn: '03-application-fields', keywords: ['医疗', '行业', 'medical', 'industry'] },
      
      // 行业管理 (69-100)
      { id: '69', title: '包装行业', titleEn: 'Packaging Industry', section: '04-行业管理', sectionEn: '04-industry-management', keywords: ['包装', '行业', 'packaging', 'industry'] },
      { id: '70', title: '建筑行业', titleEn: 'Construction Industry', section: '04-行业管理', sectionEn: '04-industry-management', keywords: ['建筑', '行业', 'construction', 'industry'] },
      { id: '71', title: '医疗行业', titleEn: 'Medical Industry', section: '04-行业管理', sectionEn: '04-industry-management', keywords: ['医疗', '行业', 'medical', 'industry'] },
      { id: '72', title: '航空行业', titleEn: 'Aviation Industry', section: '04-行业管理', sectionEn: '04-industry-management', keywords: ['航空', '行业', 'aviation', 'industry'] },
      { id: '73', title: '新能源行业', titleEn: 'New Energy Industry', section: '04-行业管理', sectionEn: '04-industry-management', keywords: ['新能源', '行业', 'new', 'energy', 'industry'] }
    ];
    
    this.searchIndex = knowledgePoints;
  }
  
  handleSearch(query) {
    if (query.length < 2) {
      this.hideResults();
      return;
    }
    
    const results = this.search(query);
    this.displayResults(results);
  }
  
  search(query) {
    const normalizedQuery = query.toLowerCase();
    
    return this.searchIndex.filter(item => {
      // Search in Chinese title
      if (item.title.toLowerCase().includes(normalizedQuery)) {
        return true;
      }
      
      // Search in English title
      if (item.titleEn.toLowerCase().includes(normalizedQuery)) {
        return true;
      }
      
      // Search in keywords
      if (item.keywords.some(keyword => 
        keyword.toLowerCase().includes(normalizedQuery)
      )) {
        return true;
      }
      
      // Search in section names
      if (item.section.toLowerCase().includes(normalizedQuery) ||
          item.sectionEn.toLowerCase().includes(normalizedQuery)) {
        return true;
      }
      
      return false;
    });
  }
  
  displayResults(results) {
    if (!this.searchResults) {
      this.createSearchResultsContainer();
    }
    
    if (results.length === 0) {
      this.searchResults.innerHTML = '<div class="search-no-results">未找到相关结果</div>';
      this.showResults();
      return;
    }
    
    const isZh = window.location.pathname.includes('/zh/');
    
    const html = results.map(item => `
      <a href="${isZh ? '/zh/' + item.section : '/en/' + item.sectionEn}/${item.id}-${isZh ? item.title : item.titleEn.toLowerCase().replace(/\s+/g, '-')}.html" 
         class="search-result-item">
        <span class="result-number">${item.id}</span>
        <div class="result-content">
          <div class="result-title">${isZh ? item.title : item.titleEn}</div>
          <div class="result-section">${isZh ? item.section : item.sectionEn}</div>
        </div>
      </a>
    `).join('');
    
    this.searchResults.innerHTML = html;
    this.showResults();
  }
  
  createSearchResultsContainer() {
    this.searchResults = document.createElement('div');
    this.searchResults.className = 'search-results';
    this.searchResults.style.cssText = `
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid var(--border-color);
      border-radius: 0 0 var(--border-radius) var(--border-radius);
      max-height: 400px;
      overflow-y: auto;
      z-index: 1001;
      box-shadow: var(--shadow-lg);
      display: none;
    `;
    
    this.searchInput.parentNode.appendChild(this.searchResults);
  }
  
  showResults() {
    if (this.searchResults) {
      this.searchResults.style.display = 'block';
    }
  }
  
  hideResults() {
    if (this.searchResults) {
      this.searchResults.style.display = 'none';
    }
  }
  
  handleKeydown(e) {
    if (!this.searchResults) return;
    
    const items = this.searchResults.querySelectorAll('.search-result-item');
    const activeItem = this.searchResults.querySelector('.active');
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!activeItem && items.length > 0) {
          items[0].classList.add('active');
        } else if (activeItem && activeItem.nextElementSibling) {
          activeItem.classList.remove('active');
          activeItem.nextElementSibling.classList.add('active');
        }
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        if (activeItem && activeItem.previousElementSibling) {
          activeItem.classList.remove('active');
          activeItem.previousElementSibling.classList.add('active');
        }
        break;
        
      case 'Enter':
        e.preventDefault();
        if (activeItem) {
          window.location.href = activeItem.getAttribute('href');
        }
        break;
        
      case 'Escape':
        this.hideResults();
        this.searchInput.blur();
        break;
    }
  }
  
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Initialize search when DOM is ready
const knowledgeSearch = new KnowledgeSearch();

// Add CSS for search results
const searchStyles = document.createElement('style');
searchStyles.textContent = `
  .search-results .search-result-item {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    text-decoration: none;
    color: var(--text-color);
    border-bottom: 1px solid var(--border-color);
    transition: background-color 0.2s;
  }
  
  .search-results .search-result-item:hover,
  .search-results .search-result-item.active {
    background-color: var(--hover-color);
    text-decoration: none;
  }
  
  .search-results .search-result-item:last-child {
    border-bottom: none;
  }
  
  .search-results .result-number {
    font-size: 0.85rem;
    color: var(--primary-color);
    font-weight: 600;
    background-color: var(--primary-light);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    margin-right: 0.75rem;
  }
  
  .search-results .result-content {
    flex: 1;
  }
  
  .search-results .result-title {
    font-weight: 500;
    margin-bottom: 0.25rem;
  }
  
  .search-results .result-section {
    font-size: 0.85rem;
    color: var(--text-light);
  }
  
  .search-results .search-no-results {
    padding: 1rem;
    text-align: center;
    color: var(--text-light);
  }
`;

document.head.appendChild(searchStyles);
// Main JavaScript for Adhesive Tape Knowledge Tree

document.addEventListener('DOMContentLoaded', function() {
  // Initialize breadcrumb navigation
  initBreadcrumb();
  
  // Initialize related knowledge
  initRelatedKnowledge();
  
  // Initialize smooth scrolling
  initSmoothScroll();
  
  // Initialize back to top button
  initBackToTop();
});

// Breadcrumb Navigation
function initBreadcrumb() {
  const breadcrumb = document.querySelector('.breadcrumb');
  if (!breadcrumb) return;
  
  // Add active state to current page
  const currentPage = window.location.pathname;
  const links = breadcrumb.querySelectorAll('a');
  
  links.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('current');
      link.removeAttribute('href');
    }
  });
}

// Related Knowledge
function initRelatedKnowledge() {
  const relatedSection = document.querySelector('.related-knowledge');
  if (!relatedSection) return;
  
  // Get current page info
  const currentPath = window.location.pathname;
  const currentLang = currentPath.includes('/zh/') ? 'zh' : 'en';
  
  // Find related knowledge points based on current section
  const relatedItems = findRelatedKnowledge(currentPath, currentLang);
  
  // Render related items
  renderRelatedItems(relatedSection, relatedItems);
}

function findRelatedKnowledge(currentPath, lang) {
  // This is a simplified version - in production, you'd have a complete mapping
  const knowledgeMap = {
    'zh': {
      '01-基础科学': [
        { id: '01', title: '粘合剂的定义与分类', path: '01-粘合剂的定义与分类.html' },
        { id: '02', title: '压敏胶的原理', path: '02-压敏胶的原理.html' },
        { id: '03', title: '基材', path: '03-基材.html' },
        { id: '04', title: '涂布工艺', path: '04-涂布工艺.html' },
        { id: '05', title: '离型剂', path: '05-离型剂.html' }
      ],
      '02-生产工艺': [
        { id: '21', title: '涂布设备', path: '21-涂布设备.html' },
        { id: '22', title: '干燥工艺', path: '22-干燥工艺.html' },
        { id: '23', title: '复合工艺', path: '23-复合工艺.html' },
        { id: '24', title: '分切工艺', path: '24-分切工艺.html' },
        { id: '25', title: '包装工艺', path: '25-包装工艺.html' }
      ],
      '03-应用领域': [
        { id: '47', title: '包装行业', path: '47-包装行业.html' },
        { id: '48', title: '电子行业', path: '48-电子行业.html' },
        { id: '49', title: '汽车行业', path: '49-汽车行业.html' },
        { id: '50', title: '建筑行业', path: '50-建筑行业.html' },
        { id: '51', title: '医疗行业', path: '51-医疗行业.html' }
      ],
      '04-行业管理': [
        { id: '69', title: '包装行业', path: '69-包装行业.html' },
        { id: '70', title: '建筑行业', path: '70-建筑行业.html' },
        { id: '71', title: '医疗行业', path: '71-医疗行业.html' },
        { id: '72', title: '航空行业', path: '72-航空行业.html' },
        { id: '73', title: '新能源行业', path: '73-新能源行业.html' }
      ]
    },
    'en': {
      '01-fundamental-science': [
        { id: '01', title: 'Definition and Classification of Adhesives', path: '01-definition-and-classification-of-adhesives.html' },
        { id: '02', title: 'Principle of Pressure-Sensitive Adhesives', path: '02-principle-of-pressure-sensitive-adhesives.html' },
        { id: '03', title: 'Base Materials', path: '03-base-materials.html' },
        { id: '04', title: 'Coating Process', path: '04-coating-process.html' },
        { id: '05', title: 'Release Agents', path: '05-release-agents.html' }
      ],
      '02-production-process': [
        { id: '21', title: 'Coating Equipment', path: '21-coating-equipment.html' },
        { id: '22', title: 'Drying Process', path: '22-drying-process.html' },
        { id: '23', title: 'Lamination Process', path: '23-lamination-process.html' },
        { id: '24', title: 'Slitting Process', path: '24-slitting-process.html' },
        { id: '25', title: 'Packaging Process', path: '25-packaging-process.html' }
      ],
      '03-application-fields': [
        { id: '47', title: 'Packaging Industry', path: '47-packaging-industry.html' },
        { id: '48', title: 'Electronics Industry', path: '48-electronics-industry.html' },
        { id: '49', title: 'Automotive Industry', path: '49-automotive-industry.html' },
        { id: '50', title: 'Construction Industry', path: '50-construction-industry.html' },
        { id: '51', title: 'Medical Industry', path: '51-medical-industry.html' }
      ],
      '04-industry-management': [
        { id: '69', title: 'Packaging Industry', path: '69-packaging-industry.html' },
        { id: '70', title: 'Construction Industry', path: '70-construction-industry.html' },
        { id: '71', title: 'Medical Industry', path: '71-medical-industry.html' },
        { id: '72', title: 'Aviation Industry', path: '72-aviation-industry.html' },
        { id: '73', title: 'New Energy Industry', path: '73-new-energy-industry.html' }
      ]
    }
  };
  
  // Extract section from current path
  const pathParts = currentPath.split('/');
  let section = '';
  
  for (const part of pathParts) {
    if (part.startsWith('01-') || part.startsWith('02-') || 
        part.startsWith('03-') || part.startsWith('04-')) {
      section = part;
      break;
    }
  }
  
  // Get related items for current section
  const langMap = knowledgeMap[lang] || knowledgeMap['zh'];
  return langMap[section] || [];
}

function renderRelatedItems(container, items) {
  const listContainer = container.querySelector('.related-list');
  if (!listContainer || items.length === 0) return;
  
  // Get current page filename
  const currentPage = window.location.pathname.split('/').pop();
  
  // Filter out current page
  const filteredItems = items.filter(item => item.path !== currentPage);
  
  // Render items
  listContainer.innerHTML = filteredItems.map(item => `
    <div class="related-item">
      <a href="${item.path}">
        <span class="number">${item.id}</span>
        <span class="title">${item.title}</span>
      </a>
    </div>
  `).join('');
}

// Smooth Scrolling
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Back to Top Button
function initBackToTop() {
  // Create back to top button
  const backToTopBtn = document.createElement('button');
  backToTopBtn.innerHTML = '↑';
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--primary-color);
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    box-shadow: var(--shadow-md);
    z-index: 1000;
  `;
  
  document.body.appendChild(backToTopBtn);
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.display = 'flex';
    } else {
      backToTopBtn.style.display = 'none';
    }
  });
  
  // Scroll to top when clicked
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Utility Functions
function debounce(func, wait) {
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

function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
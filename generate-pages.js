#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const ENGLISH_TRANSLATIONS = require('./english-translations.js');

// Configuration
const KNOWLEDGE_FILE = path.join(__dirname, 'knowledge-content.md');
const DOCS_DIR = path.join(__dirname, 'docs');

// Category mappings
const CATEGORIES = {
  zh: {
    '01': { name: '基础科学', dir: '01-基础科学' },
    '02': { name: '生产工艺', dir: '02-生产工艺' },
    '03': { name: '应用领域', dir: '03-应用领域' },
    '04': { name: '行业管理', dir: '04-行业管理' }
  },
  en: {
    '01': { name: 'Fundamental Science', dir: '01-fundamental-science' },
    '02': { name: 'Production Process', dir: '02-production-process' },
    '03': { name: 'Application Fields', dir: '03-application-fields' },
    '04': { name: 'Industry Management', dir: '04-industry-management' }
  }
};

// Knowledge point to category mapping
const KNOWLEDGE_CATEGORIES = {
  1: '01', 2: '01', 3: '01', 4: '01', 5: '01', 6: '01', 7: '01', 8: '01', 9: '01', 10: '01',
  11: '01', 12: '01', 13: '01', 14: '01', 15: '01', 16: '01', 17: '01', 18: '01', 19: '01', 20: '01',
  21: '02', 22: '02', 23: '02', 24: '02', 25: '02', 26: '02', 27: '02', 28: '02', 29: '02', 30: '02',
  31: '02', 32: '02', 33: '02', 34: '02',
  35: '03', 36: '03', 37: '03', 38: '03', 39: '03', 40: '03', 41: '03', 42: '03', 43: '03', 44: '03',
  45: '03', 46: '03', 47: '03', 48: '03', 49: '03', 50: '03', 51: '03', 52: '03', 53: '03', 54: '03',
  55: '03', 56: '03',
  57: '04', 58: '04', 59: '04', 60: '04', 61: '04', 62: '04', 63: '04', 64: '04', 65: '04', 66: '04',
  67: '04', 68: '04', 69: '04', 70: '04', 71: '04', 72: '04', 73: '04', 74: '04', 75: '04', 76: '04',
  77: '04', 78: '04', 79: '04', 80: '04', 81: '04', 82: '04', 83: '04', 84: '04', 85: '04', 86: '04',
  87: '04', 88: '04', 89: '04', 90: '04', 91: '04', 92: '04', 93: '04', 94: '04', 95: '04', 96: '04',
  97: '04', 98: '04', 99: '04', 100: '04'
};

// English title translations
const ENGLISH_TITLES = {
  1: 'Definition and Classification of Adhesives',
  2: 'Principle of Pressure-Sensitive Adhesives',
  3: 'Base Materials',
  4: 'Coating Process',
  5: 'Release Agents',
  6: 'Tack',
  7: 'Hold Power',
  8: 'Peel Strength',
  9: 'Tape Thickness',
  10: 'Tape Width',
  11: 'Tape Length',
  12: 'Viscosity',
  13: 'Solid Content',
  14: 'Glass Transition Temperature (Tg)',
  15: 'Temperature Resistance',
  16: 'Water Resistance',
  17: 'Weather Resistance',
  18: 'Chemical Resistance',
  19: 'Electrical Insulation',
  20: 'Thermal Conductivity',
  21: 'Coating Equipment',
  22: 'Drying Process',
  23: 'Lamination Process',
  24: 'Slitting Process',
  25: 'Packaging Process',
  26: 'Winding Tension',
  27: 'Curing Methods',
  28: 'Coating Methods',
  29: 'Drying Methods',
  30: 'Residual Solvents',
  31: 'Bubble Control',
  32: 'Adhesive Overflow Control',
  33: 'Tape Warping',
  34: 'Bonding Surface Treatment',
  35: 'Environmental Adaptability',
  36: 'Shelf Life',
  37: 'Storage Conditions',
  38: 'Environmental Regulations',
  39: 'Recyclability',
  40: 'Cost Structure',
  41: 'Quality Inspection',
  42: 'Industry Standards',
  43: 'Supply Chain Management',
  44: 'Customer Service',
  45: 'Technology R&D',
  46: 'Intellectual Property',
  47: 'Packaging Industry',
  48: 'Electronics Industry',
  49: 'Automotive Industry',
  50: 'Construction Industry',
  51: 'Medical Industry',
  52: 'Aerospace',
  53: 'Garment Industry',
  54: 'Printing Industry',
  55: 'Furniture Industry',
  56: 'Food Industry',
  57: 'Industry Future Trends',
  58: 'Stability Storage',
  59: 'Packaging Requirements',
  60: 'Maintenance',
  61: 'Safety Access',
  62: 'Raw Material Procurement',
  63: 'Cost Analysis',
  64: 'Supply Chain Optimization',
  65: 'Customer Relationship Management',
  66: 'Employee Training System',
  67: 'Marketing Strategy',
  68: 'Customer Service System',
  69: 'Cost Management System',
  70: 'Quality Management System',
  71: 'Standardization System',
  72: 'Supply Chain System',
  73: 'Product R&D System',
  74: 'Green Environmental Protection',
  75: 'Brand Building',
  76: 'Industry Certification',
  77: 'Intellectual Property Management',
  78: 'Data Management',
  79: 'Exhibition Exchange',
  80: 'Talent Development',
  81: 'Intelligent Development',
  82: 'Application Solutions',
  83: 'Industrial Internet',
  84: 'ESG and Sustainability',
  85: 'Green Production',
  86: 'Digital Transformation',
  87: 'Standardization Regulations',
  88: 'Industry Talent Demand',
  89: 'Talent Training System',
  90: 'Information Platform',
  91: 'Green Certification',
  92: 'Trade Regulations',
  93: 'Intellectual Property Protection',
  94: 'Logistics Management',
  95: 'Brand Strategy',
  96: 'Capital Operations',
  97: 'Industrial Ecosystem',
  98: 'Knowledge Inheritance',
  99: 'Talent Pipeline',
  100: 'Industry Big Data'
};

// English filenames
const ENGLISH_FILENAMES = {
  1: '01-definition-and-classification-of-adhesives',
  2: '02-principle-of-pressure-sensitive-adhesives',
  3: '03-base-materials',
  4: '04-coating-process',
  5: '05-release-agents',
  6: '06-tack',
  7: '07-hold-power',
  8: '08-peel-strength',
  9: '09-tape-thickness',
  10: '10-tape-width',
  11: '11-tape-length',
  12: '12-viscosity',
  13: '13-solid-content',
  14: '14-glass-transition-temperature-tg',
  15: '15-temperature-resistance',
  16: '16-water-resistance',
  17: '17-weather-resistance',
  18: '18-chemical-resistance',
  19: '19-electrical-insulation',
  20: '20-thermal-conductivity',
  21: '21-coating-equipment',
  22: '22-drying-process',
  23: '23-lamination-process',
  24: '24-slitting-process',
  25: '25-packaging-process',
  26: '26-winding-tension',
  27: '27-curing-methods',
  28: '28-coating-methods',
  29: '29-drying-methods',
  30: '30-residual-solvents',
  31: '31-bubble-control',
  32: '32-adhesive-overflow-control',
  33: '33-tape-warping',
  34: '34-bonding-surface-treatment',
  35: '35-environmental-adaptability',
  36: '36-shelf-life',
  37: '37-storage-conditions',
  38: '38-environmental-regulations',
  39: '39-recyclability',
  40: '40-cost-structure',
  41: '41-quality-inspection',
  42: '42-industry-standards',
  43: '43-supply-chain-management',
  44: '44-customer-service',
  45: '45-technology-rd',
  46: '46-intellectual-property',
  47: '47-packaging-industry',
  48: '48-electronics-industry',
  49: '49-automotive-industry',
  50: '50-construction-industry',
  51: '51-medical-industry',
  52: '52-aerospace',
  53: '53-garment-industry',
  54: '54-printing-industry',
  55: '55-furniture-industry',
  56: '56-food-industry',
  57: '57-industry-future-trends',
  58: '58-stability-storage',
  59: '59-packaging-requirements',
  60: '60-maintenance',
  61: '61-safety-access',
  62: '62-raw-material-procurement',
  63: '63-cost-analysis',
  64: '64-supply-chain-optimization',
  65: '65-customer-relationship-management',
  66: '66-employee-training-system',
  67: '67-marketing-strategy',
  68: '68-customer-service-system',
  69: '69-cost-management-system',
  70: '70-quality-management-system',
  71: '71-standardization-system',
  72: '72-supply-chain-system',
  73: '73-product-rd-system',
  74: '74-green-environmental-protection',
  75: '75-brand-building',
  76: '76-industry-certification',
  77: '77-intellectual-property-management',
  78: '78-data-management',
  79: '79-exhibition-exchange',
  80: '80-talent-development',
  81: '81-intelligent-development',
  82: '82-application-solutions',
  83: '83-industrial-internet',
  84: '84-esg-and-sustainability',
  85: '85-green-production',
  86: '86-digital-transformation',
  87: '87-standardization-regulations',
  88: '88-industry-talent-demand',
  89: '89-talent-training-system',
  90: '90-information-platform',
  91: '91-green-certification',
  92: '92-trade-regulations',
  93: '93-intellectual-property-protection',
  94: '94-logistics-management',
  95: '95-brand-strategy',
  96: '96-capital-operations',
  97: '97-industrial-ecosystem',
  98: '98-knowledge-inheritance',
  99: '99-talent-pipeline',
  100: '100-industry-big-data'
};

// Parse knowledge-content.md
function parseKnowledgeContent(content) {
  const knowledgePoints = [];
  const sections = content.split(/^## 叶片/m);
  
  for (let i = 1; i < sections.length; i++) {
    const section = sections[i];
    const headerMatch = section.match(/^\s*(\d+)：(.+?)$/m);
    
    if (headerMatch) {
      const id = parseInt(headerMatch[1]);
      const title = headerMatch[2].trim();
      
      // Extract sections
      const definitionMatch = section.match(/### 定义\s*\n([\s\S]*?)(?=### |$)/);
      const historyMatch = section.match(/### 历史来源\s*\n([\s\S]*?)(?=### |$)/);
      const exampleMatch = section.match(/### 示例\s*\n([\s\S]*?)(?=### |$)/);
      const formulaMatch = section.match(/### 公式\s*\n([\s\S]*?)(?=### |$)/);
      const meaningMatch = section.match(/### 内涵\s*\n([\s\S]*?)(?=### |$)/);
      const extensionMatch = section.match(/### 外延\s*\n([\s\S]*?)(?=---|$)/);
      
      knowledgePoints.push({
        id,
        title,
        definition: definitionMatch ? definitionMatch[1].trim() : '',
        history: historyMatch ? historyMatch[1].trim() : '',
        example: exampleMatch ? exampleMatch[1].trim() : '',
        formula: formulaMatch ? formulaMatch[1].trim() : '',
        meaning: meaningMatch ? meaningMatch[1].trim() : '',
        extension: extensionMatch ? extensionMatch[1].trim() : ''
      });
    }
  }
  
  return knowledgePoints;
}

// Clean content (remove markdown bold markers)
function cleanContent(content) {
  return content
    .replace(/\*\*(.+?)\*\*/g, '$1') // Remove ** bold markers
    .replace(/\*(.+?)\*/g, '$1') // Remove * italic markers
    .replace(/\$\$(.+?)\$\$/g, '$1') // Remove $$ formula markers
    .replace(/\n{3,}/g, '\n\n') // Remove excessive newlines
    .trim();
}

// Generate Chinese HTML page
function generateChinesePage(kp, category) {
  const cat = CATEGORIES.zh[category];
  const cleaned = {
    definition: cleanContent(kp.definition),
    history: cleanContent(kp.history),
    example: cleanContent(kp.example),
    formula: cleanContent(kp.formula),
    meaning: cleanContent(kp.meaning),
    extension: cleanContent(kp.extension)
  };
  
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${kp.title} - ${cat.name} - 胶带行业知识树</title>
    <meta name="description" content="${kp.title}：${cleaned.definition.substring(0, 100)}">
    <meta name="keywords" content="${kp.title}, 胶带, ${cat.name}">
    
    <!-- Hreflang tags -->
    <link rel="alternate" hreflang="zh" href="https://geo021.com/zh/${cat.dir}/${kp.id}-${kp.title}.html" />
    <link rel="alternate" hreflang="en" href="https://geo021.com/en/${CATEGORIES.en[category].dir}/${ENGLISH_FILENAMES[kp.id]}.html" />
    <link rel="alternate" hreflang="x-default" href="https://geo021.com/zh/${cat.dir}/${kp.id}-${kp.title}.html" />
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="../../favicon.svg">
    
    <!-- Schema.org JSON-LD -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "${kp.title}",
        "description": "${kp.title}：${cleaned.definition.substring(0, 100)}",
        "url": "https://geo021.com/zh/${cat.dir}/${kp.id}-${kp.title}.html",
        "inLanguage": "zh-CN",
        "author": {
            "@type": "Organization",
            "name": "胶带行业知识树"
        },
        "publisher": {
            "@type": "Organization",
            "name": "胶带行业知识树",
            "url": "https://geo021.com"
        },
        "datePublished": "2026-07-16",
        "dateModified": "2026-07-16",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://geo021.com/zh/${cat.dir}/${kp.id}-${kp.title}.html"
        }
    }
    </script>
    
    <!-- CSS -->
    <link rel="stylesheet" href="../../assets/css/style.css">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <a href="../index.html" class="logo">胶带行业知识树</a>
            
            <nav class="nav">
                <a href="../index.html">首页</a>
                <a href="../${CATEGORIES.zh['01'].dir}/index.html" ${category === '01' ? 'class="active"' : ''}>基础科学</a>
                <a href="../${CATEGORIES.zh['02'].dir}/index.html" ${category === '02' ? 'class="active"' : ''}>生产工艺</a>
                <a href="../${CATEGORIES.zh['03'].dir}/index.html" ${category === '03' ? 'class="active"' : ''}>应用领域</a>
                <a href="../${CATEGORIES.zh['04'].dir}/index.html" ${category === '04' ? 'class="active"' : ''}>行业管理</a>
                
                <!-- Search Box -->
                <div class="search-box">
                    <input type="text" class="search-input" placeholder="搜索知识叶片...">
                    <button class="search-btn">🔍</button>
                </div>
                
                <!-- Language Switcher -->
                <div class="lang-switch">
                    <span class="current-lang">中文</span>
                    <button class="lang-btn" data-lang="zh">中文</button>
                    <button class="lang-btn" data-lang="en">English</button>
                </div>
            </nav>
        </div>
    </header>
    
    <!-- Main Content -->
    <main class="main">
        <div class="container">
            <!-- Breadcrumb -->
            <nav class="breadcrumb">
                <a href="../index.html">首页</a>
                <span>/</span>
                <a href="index.html">${cat.name}</a>
                <span>/</span>
                <span class="current">${kp.title}</span>
            </nav>
            
            <!-- Knowledge Content -->
            <article class="knowledge-content">
                <h1>${kp.title}</h1>
                
                <!-- Definition -->
                <section class="knowledge-section">
                    <h3>定义</h3>
                    <div class="knowledge-definition">
                        <p>${cleaned.definition}</p>
                    </div>
                </section>
                
                <!-- Historical Background -->
                <section class="knowledge-section">
                    <h3>历史来源</h3>
                    <p>${cleaned.history}</p>
                </section>
                
                <!-- Example -->
                <section class="knowledge-section">
                    <h3>示例</h3>
                    <div class="knowledge-example">
                        <p>${cleaned.example}</p>
                    </div>
                </section>
                
                <!-- Formula -->
                <section class="knowledge-section">
                    <h3>公式</h3>
                    <div class="knowledge-formula">
                        <p>${cleaned.formula}</p>
                    </div>
                </section>
                
                <!-- Core Concepts -->
                <section class="knowledge-section">
                    <h3>内涵</h3>
                    <div class="knowledge-implication">
                        <p>${cleaned.meaning}</p>
                    </div>
                </section>
                
                <!-- Extended Applications -->
                <section class="knowledge-section">
                    <h3>外延</h3>
                    <div class="knowledge-extension">
                        <p>${cleaned.extension}</p>
                    </div>
                </section>
            </article>
            
            <!-- Navigation -->
            <section class="section-navigation">
                <div class="nav-links">
                    <a href="index.html" class="nav-link">← 返回${cat.name}</a>
                </div>
            </section>
        </div>
    </main>
    
    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <h3 class="footer-title">胶带行业知识树</h3>
                <p class="footer-description">
                    系统化的胶带行业知识体系，为行业从业者、学生和研究者提供全面的知识参考。
                </p>
            </div>
            
            <div class="footer-links">
                <a href="../index.html">首页</a>
                <a href="../${CATEGORIES.zh['01'].dir}/index.html">基础科学</a>
                <a href="../${CATEGORIES.zh['02'].dir}/index.html">生产工艺</a>
                <a href="../${CATEGORIES.zh['03'].dir}/index.html">应用领域</a>
                <a href="../${CATEGORIES.zh['04'].dir}/index.html">行业管理</a>
                <a href="../../en/">English</a>
            </div>
            
            <div class="footer-copyright">
                <p>&copy; 2026 胶带行业知识树. All rights reserved.</p>
            </div>
        </div>
    </footer>
    
    <!-- JavaScript -->
    <script src="../../assets/js/main.js"></script>
    <script src="../../assets/js/search.js"></script>
    <script src="../../assets/js/lang-switch.js"></script>
</body>
</html>`;
}

// Generate English HTML page
function generateEnglishPage(kp, category) {
  const cat = CATEGORIES.en[category];
  const enTitle = ENGLISH_TITLES[kp.id];
  const filename = ENGLISH_FILENAMES[kp.id];
  
  // Get English translations
  const translations = ENGLISH_TRANSLATIONS[kp.id];
  const cleaned = {
    definition: translations ? translations.definition : cleanContent(kp.definition),
    history: translations ? translations.history : cleanContent(kp.history),
    example: translations ? translations.example : cleanContent(kp.example),
    formula: translations ? translations.formula : cleanContent(kp.formula),
    meaning: translations ? translations.meaning : cleanContent(kp.meaning),
    extension: translations ? translations.extension : cleanContent(kp.extension)
  };
  
  // Simple Chinese to English translations for sections
  const sectionTranslations = {
    definition: 'Definition',
    history: 'Historical Background',
    example: 'Example',
    formula: 'Formula',
    meaning: 'Core Concepts',
    extension: 'Extended Applications'
  };
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${enTitle} - ${cat.name} - Adhesive Tape Knowledge Tree</title>
    <meta name="description" content="${enTitle}: ${cleaned.definition.substring(0, 100)}">
    <meta name="keywords" content="${enTitle.toLowerCase()}, adhesive tape, ${cat.name.toLowerCase()}">
    
    <!-- Hreflang tags -->
    <link rel="alternate" hreflang="zh" href="https://geo021.com/zh/${CATEGORIES.zh[category].dir}/${kp.id}-${kp.title}.html" />
    <link rel="alternate" hreflang="en" href="https://geo021.com/en/${cat.dir}/${filename}.html" />
    <link rel="alternate" hreflang="x-default" href="https://geo021.com/en/${cat.dir}/${filename}.html" />
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="../../favicon.svg">
    
    <!-- Schema.org JSON-LD -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "${enTitle}",
        "description": "${enTitle}: ${cleaned.definition.substring(0, 100)}",
        "url": "https://geo021.com/en/${cat.dir}/${filename}.html",
        "inLanguage": "en",
        "author": {
            "@type": "Organization",
            "name": "Adhesive Tape"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Adhesive Tape",
            "url": "https://geo021.com"
        },
        "datePublished": "2026-07-16",
        "dateModified": "2026-07-16",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://geo021.com/en/${cat.dir}/${filename}.html"
        }
    }
    </script>
    
    <!-- CSS -->
    <link rel="stylesheet" href="../../assets/css/style.css">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <a href="../index.html" class="logo">Adhesive Tape</a>
            
            <nav class="nav">
                <a href="../index.html">Home</a>
                <a href="../${CATEGORIES.en['01'].dir}/index.html" ${category === '01' ? 'class="active"' : ''}>Fundamental Science</a>
                <a href="../${CATEGORIES.en['02'].dir}/index.html" ${category === '02' ? 'class="active"' : ''}>Production Process</a>
                <a href="../${CATEGORIES.en['03'].dir}/index.html" ${category === '03' ? 'class="active"' : ''}>Application Fields</a>
                <a href="../${CATEGORIES.en['04'].dir}/index.html" ${category === '04' ? 'class="active"' : ''}>Industry Management</a>
                
                <!-- Search Box -->
                <div class="search-box">
                    <input type="text" class="search-input" placeholder="Search knowledge points...">
                    <button class="search-btn">🔍</button>
                </div>
                
                <!-- Language Switcher -->
                <div class="lang-switch">
                    <span class="current-lang">English</span>
                    <button class="lang-btn" data-lang="zh">中文</button>
                    <button class="lang-btn" data-lang="en">English</button>
                </div>
            </nav>
        </div>
    </header>
    
    <!-- Main Content -->
    <main class="main">
        <div class="container">
            <!-- Breadcrumb -->
            <nav class="breadcrumb">
                <a href="../index.html">Home</a>
                <span>/</span>
                <a href="index.html">${cat.name}</a>
                <span>/</span>
                <span class="current">${enTitle}</span>
            </nav>
            
            <!-- Knowledge Content -->
            <article class="knowledge-content">
                <h1>${enTitle}</h1>
                
                <!-- Definition -->
                <section class="knowledge-section">
                    <h3>${sectionTranslations.definition}</h3>
                    <div class="knowledge-definition">
                        <p>${cleaned.definition}</p>
                    </div>
                </section>
                
                <!-- Historical Background -->
                <section class="knowledge-section">
                    <h3>${sectionTranslations.history}</h3>
                    <p>${cleaned.history}</p>
                </section>
                
                <!-- Example -->
                <section class="knowledge-section">
                    <h3>${sectionTranslations.example}</h3>
                    <div class="knowledge-example">
                        <p>${cleaned.example}</p>
                    </div>
                </section>
                
                <!-- Formula -->
                <section class="knowledge-section">
                    <h3>${sectionTranslations.formula}</h3>
                    <div class="knowledge-formula">
                        <p>${cleaned.formula}</p>
                    </div>
                </section>
                
                <!-- Core Concepts -->
                <section class="knowledge-section">
                    <h3>${sectionTranslations.meaning}</h3>
                    <div class="knowledge-implication">
                        <p>${cleaned.meaning}</p>
                    </div>
                </section>
                
                <!-- Extended Applications -->
                <section class="knowledge-section">
                    <h3>${sectionTranslations.extension}</h3>
                    <div class="knowledge-extension">
                        <p>${cleaned.extension}</p>
                    </div>
                </section>
            </article>
            
            <!-- Navigation -->
            <section class="section-navigation">
                <div class="nav-links">
                    <a href="index.html" class="nav-link">← Back to ${cat.name}</a>
                </div>
            </section>
        </div>
    </main>
    
    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <h3 class="footer-title">Adhesive Tape Industry Knowledge Tree</h3>
                <p class="footer-description">
                    A comprehensive knowledge system for industry practitioners, students, and researchers.
                </p>
            </div>
            
            <div class="footer-links">
                <a href="../index.html">Home</a>
                <a href="../${CATEGORIES.en['01'].dir}/index.html">Fundamental Science</a>
                <a href="../${CATEGORIES.en['02'].dir}/index.html">Production Process</a>
                <a href="../${CATEGORIES.en['03'].dir}/index.html">Application Fields</a>
                <a href="../${CATEGORIES.en['04'].dir}/index.html">Industry Management</a>
                <a href="../../zh/">中文</a>
            </div>
            
            <div class="footer-copyright">
                <p>&copy; 2026 Adhesive Tape Industry Knowledge Tree. All rights reserved.</p>
            </div>
        </div>
    </footer>
    
    <!-- JavaScript -->
    <script src="../../assets/js/main.js"></script>
    <script src="../../assets/js/search.js"></script>
    <script src="../../assets/js/lang-switch.js"></script>
</body>
</html>`;
}

// Main function
function main() {
  console.log('Reading knowledge-content.md...');
  const content = fs.readFileSync(KNOWLEDGE_FILE, 'utf-8');
  
  console.log('Parsing knowledge points...');
  const knowledgePoints = parseKnowledgeContent(content);
  console.log(`Found ${knowledgePoints.length} knowledge points`);
  
  let chineseCount = 0;
  let englishCount = 0;
  
  for (const kp of knowledgePoints) {
    const category = KNOWLEDGE_CATEGORIES[kp.id];
    if (!category) {
      console.log(`Warning: No category for knowledge point ${kp.id}`);
      continue;
    }
    
    // Generate Chinese page
    const zhDir = path.join(DOCS_DIR, 'zh', CATEGORIES.zh[category].dir);
    const zhFilename = `${kp.id}-${kp.title}.html`;
    const zhPath = path.join(zhDir, zhFilename);
    
    fs.mkdirSync(zhDir, { recursive: true });
    fs.writeFileSync(zhPath, generateChinesePage(kp, category), 'utf-8');
    chineseCount++;
    
    // Generate English page
    const enDir = path.join(DOCS_DIR, 'en', CATEGORIES.en[category].dir);
    const enFilename = `${ENGLISH_FILENAMES[kp.id]}.html`;
    const enPath = path.join(enDir, enFilename);
    
    fs.mkdirSync(enDir, { recursive: true });
    fs.writeFileSync(enPath, generateEnglishPage(kp, category), 'utf-8');
    englishCount++;
  }
  
  console.log(`Generated ${chineseCount} Chinese pages`);
  console.log(`Generated ${englishCount} English pages`);
  
  // Generate index pages for each category
  console.log('Generating index pages...');
  generateIndexPages(knowledgePoints);
  
  console.log('Done!');
}

// Generate index pages
function generateIndexPages(knowledgePoints) {
  for (const [lang, categories] of Object.entries(CATEGORIES)) {
    for (const [catNum, catInfo] of Object.entries(categories)) {
      const catPoints = knowledgePoints.filter(kp => KNOWLEDGE_CATEGORIES[kp.id] === catNum);
      
      if (lang === 'zh') {
        generateChineseIndexPage(catNum, catInfo, catPoints);
      } else {
        generateEnglishIndexPage(catNum, catInfo, catPoints);
      }
    }
  }
}

// Generate Chinese index page
function generateChineseIndexPage(category, catInfo, points) {
  const dir = path.join(DOCS_DIR, 'zh', catInfo.dir);
  fs.mkdirSync(dir, { recursive: true });
  
  const cardsHtml = points.map(kp => `
                <div class="card">
                    <div class="card-header">
                        <span class="card-number">${String(kp.id).padStart(2, '0')}</span>
                        <h2 class="card-title">
                            <a href="${kp.id}-${kp.title}.html">${kp.title}</a>
                        </h2>
                    </div>
                    <div class="card-content">
                        <p>${cleanContent(kp.definition).substring(0, 80)}...</p>
                    </div>
                </div>`).join('\n');
  
  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${catInfo.name} - 胶带行业知识树</title>
    <meta name="description" content="${catInfo.name}相关知识：${points.map(p => p.title).join('、')}">
    <meta name="keywords" content="${catInfo.name}, ${points.map(p => p.title).join(', ')}">
    
    <!-- Hreflang tags -->
    <link rel="alternate" hreflang="zh" href="https://geo021.com/zh/${catInfo.dir}/" />
    <link rel="alternate" hreflang="en" href="https://geo021.com/en/${CATEGORIES.en[category].dir}/" />
    <link rel="alternate" hreflang="x-default" href="https://geo021.com/zh/${catInfo.dir}/" />
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="../../favicon.svg">
    
    <!-- Schema.org JSON-LD -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "${catInfo.name}",
        "description": "${catInfo.name}相关知识：${points.map(p => p.title).join('、')}",
        "url": "https://geo021.com/zh/${catInfo.dir}/",
        "inLanguage": "zh-CN",
        "isPartOf": {
            "@type": "WebSite",
            "name": "胶带行业知识树",
            "url": "https://geo021.com"
        }
    }
    </script>
    
    <!-- CSS -->
    <link rel="stylesheet" href="../../assets/css/style.css">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <a href="../index.html" class="logo">胶带行业知识树</a>
            
            <nav class="nav">
                <a href="../index.html">首页</a>
                <a href="../${CATEGORIES.zh['01'].dir}/index.html" ${category === '01' ? 'class="active"' : ''}>基础科学</a>
                <a href="../${CATEGORIES.zh['02'].dir}/index.html" ${category === '02' ? 'class="active"' : ''}>生产工艺</a>
                <a href="../${CATEGORIES.zh['03'].dir}/index.html" ${category === '03' ? 'class="active"' : ''}>应用领域</a>
                <a href="../${CATEGORIES.zh['04'].dir}/index.html" ${category === '04' ? 'class="active"' : ''}>行业管理</a>
                
                <!-- Search Box -->
                <div class="search-box">
                    <input type="text" class="search-input" placeholder="搜索知识叶片...">
                    <button class="search-btn">🔍</button>
                </div>
                
                <!-- Language Switcher -->
                <div class="lang-switch">
                    <span class="current-lang">中文</span>
                    <button class="lang-btn" data-lang="zh">中文</button>
                    <button class="lang-btn" data-lang="en">English</button>
                </div>
            </nav>
        </div>
    </header>
    
    <!-- Main Content -->
    <main class="main">
        <div class="container">
            <!-- Breadcrumb -->
            <nav class="breadcrumb">
                <a href="../index.html">首页</a>
                <span>/</span>
                <span class="current">${catInfo.name}</span>
            </nav>
            
            <!-- Hero Section -->
            <section class="hero">
                <h1>${catInfo.name}</h1>
                <p class="subtitle">胶带行业的${catInfo.name}</p>
                <p class="description">
                    本板块涵盖胶带行业的${catInfo.name}相关知识，共${points.length}个知识点。
                </p>
            </section>
            
            <!-- Knowledge Points Grid -->
            <section class="knowledge-grid">
${cardsHtml}
            </section>
            
            <!-- Navigation -->
            <section class="section-navigation">
                <div class="nav-links">
                    <a href="../index.html" class="nav-link">← 返回首页</a>
                </div>
            </section>
        </div>
    </main>
    
    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <h3 class="footer-title">胶带行业知识树</h3>
                <p class="footer-description">
                    系统化的胶带行业知识体系，为行业从业者、学生和研究者提供全面的知识参考。
                </p>
            </div>
            
            <div class="footer-links">
                <a href="../index.html">首页</a>
                <a href="../${CATEGORIES.zh['01'].dir}/index.html">基础科学</a>
                <a href="../${CATEGORIES.zh['02'].dir}/index.html">生产工艺</a>
                <a href="../${CATEGORIES.zh['03'].dir}/index.html">应用领域</a>
                <a href="../${CATEGORIES.zh['04'].dir}/index.html">行业管理</a>
                <a href="../../en/">English</a>
            </div>
            
            <div class="footer-copyright">
                <p>&copy; 2026 胶带行业知识树. All rights reserved.</p>
            </div>
        </div>
    </footer>
    
    <!-- JavaScript -->
    <script src="../../assets/js/main.js"></script>
    <script src="../../assets/js/search.js"></script>
    <script src="../../assets/js/lang-switch.js"></script>
</body>
</html>`;
  
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
}

// Generate English index page
function generateEnglishIndexPage(category, catInfo, points) {
  const dir = path.join(DOCS_DIR, 'en', catInfo.dir);
  fs.mkdirSync(dir, { recursive: true });
  
  const cardsHtml = points.map(kp => {
    const translation = ENGLISH_TRANSLATIONS[kp.id];
    const desc = translation ? translation.definition : cleanContent(kp.definition);
    return `
                <div class="card">
                    <div class="card-header">
                        <span class="card-number">${String(kp.id).padStart(2, '0')}</span>
                        <h2 class="card-title">
                            <a href="${ENGLISH_FILENAMES[kp.id]}.html">${ENGLISH_TITLES[kp.id]}</a>
                        </h2>
                    </div>
                    <div class="card-content">
                        <p>${desc.substring(0, 80)}...</p>
                    </div>
                </div>`;
  }).join('\n');
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${catInfo.name} - Adhesive Tape Knowledge Tree</title>
    <meta name="description" content="${catInfo.name} related knowledge: ${points.map(p => ENGLISH_TITLES[p.id]).join(', ')}">
    <meta name="keywords" content="${catInfo.name.toLowerCase()}, ${points.map(p => ENGLISH_TITLES[p.id].toLowerCase()).join(', ')}">
    
    <!-- Hreflang tags -->
    <link rel="alternate" hreflang="zh" href="https://geo021.com/zh/${CATEGORIES.zh[category].dir}/" />
    <link rel="alternate" hreflang="en" href="https://geo021.com/en/${catInfo.dir}/" />
    <link rel="alternate" hreflang="x-default" href="https://geo021.com/en/${catInfo.dir}/" />
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="../../favicon.svg">
    
    <!-- Schema.org JSON-LD -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "${catInfo.name}",
        "description": "${catInfo.name} related knowledge: ${points.map(p => ENGLISH_TITLES[p.id]).join(', ')}",
        "url": "https://geo021.com/en/${catInfo.dir}/",
        "inLanguage": "en",
        "isPartOf": {
            "@type": "WebSite",
            "name": "Adhesive Tape Industry Knowledge Tree",
            "url": "https://geo021.com"
        }
    }
    </script>
    
    <!-- CSS -->
    <link rel="stylesheet" href="../../assets/css/style.css">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <a href="../index.html" class="logo">Adhesive Tape</a>
            
            <nav class="nav">
                <a href="../index.html">Home</a>
                <a href="../${CATEGORIES.en['01'].dir}/index.html" ${category === '01' ? 'class="active"' : ''}>Fundamental Science</a>
                <a href="../${CATEGORIES.en['02'].dir}/index.html" ${category === '02' ? 'class="active"' : ''}>Production Process</a>
                <a href="../${CATEGORIES.en['03'].dir}/index.html" ${category === '03' ? 'class="active"' : ''}>Application Fields</a>
                <a href="../${CATEGORIES.en['04'].dir}/index.html" ${category === '04' ? 'class="active"' : ''}>Industry Management</a>
                
                <!-- Search Box -->
                <div class="search-box">
                    <input type="text" class="search-input" placeholder="Search knowledge points...">
                    <button class="search-btn">🔍</button>
                </div>
                
                <!-- Language Switcher -->
                <div class="lang-switch">
                    <span class="current-lang">English</span>
                    <button class="lang-btn" data-lang="zh">中文</button>
                    <button class="lang-btn" data-lang="en">English</button>
                </div>
            </nav>
        </div>
    </header>
    
    <!-- Main Content -->
    <main class="main">
        <div class="container">
            <!-- Breadcrumb -->
            <nav class="breadcrumb">
                <a href="../index.html">Home</a>
                <span>/</span>
                <span class="current">${catInfo.name}</span>
            </nav>
            
            <!-- Hero Section -->
            <section class="hero">
                <h1>${catInfo.name}</h1>
                <p class="subtitle">${catInfo.name} of the Adhesive Tape Industry</p>
                <p class="description">
                    This section covers ${catInfo.name.toLowerCase()} related knowledge of the adhesive tape industry, with ${points.length} knowledge points.
                </p>
            </section>
            
            <!-- Knowledge Points Grid -->
            <section class="knowledge-grid">
${cardsHtml}
            </section>
            
            <!-- Navigation -->
            <section class="section-navigation">
                <div class="nav-links">
                    <a href="../index.html" class="nav-link">← Back to Home</a>
                </div>
            </section>
        </div>
    </main>
    
    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <h3 class="footer-title">Adhesive Tape Industry Knowledge Tree</h3>
                <p class="footer-description">
                    A comprehensive knowledge system for industry practitioners, students, and researchers.
                </p>
            </div>
            
            <div class="footer-links">
                <a href="../index.html">Home</a>
                <a href="../${CATEGORIES.en['01'].dir}/index.html">Fundamental Science</a>
                <a href="../${CATEGORIES.en['02'].dir}/index.html">Production Process</a>
                <a href="../${CATEGORIES.en['03'].dir}/index.html">Application Fields</a>
                <a href="../${CATEGORIES.en['04'].dir}/index.html">Industry Management</a>
                <a href="../../zh/">中文</a>
            </div>
            
            <div class="footer-copyright">
                <p>&copy; 2026 Adhesive Tape Industry Knowledge Tree. All rights reserved.</p>
            </div>
        </div>
    </footer>
    
    <!-- JavaScript -->
    <script src="../../assets/js/main.js"></script>
    <script src="../../assets/js/search.js"></script>
    <script src="../../assets/js/lang-switch.js"></script>
</body>
</html>`;
  
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
}

// Run
main();

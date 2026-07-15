/**
 * Handles University Theme Toggling and Language Toggling
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Theme Logic ---
    const swatches = document.querySelectorAll('.theme-swatch');
    const body = document.body;
    
    // Check if there's a saved theme in localStorage
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }

    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            const theme = swatch.getAttribute('data-theme');
            applyTheme(theme);
        });
    });

    function applyTheme(themeName) {
        // Remove all theme classes
        body.classList.remove('theme-prc', 'theme-chula', 'theme-cmu', 'theme-mahidol', 'theme-kmitl');
        
        // Add new theme class
        body.classList.add(`theme-${themeName}`);

        // Update active state on swatches
        swatches.forEach(s => s.classList.remove('active'));
        const activeSwatch = document.querySelector(`.theme-swatch[data-theme="${themeName}"]`);
        if (activeSwatch) {
            activeSwatch.classList.add('active');
        }

        // Save to localStorage
        localStorage.setItem('selectedTheme', themeName);
    }

    // --- Language Logic ---
    const langBtn = document.getElementById('lang-toggle');
    const langOpts = document.querySelectorAll('.lang-opt');
    const i18nElements = document.querySelectorAll('[data-i18n]');
    
    // Default language is English
    let currentLang = localStorage.getItem('selectedLang') || 'en';
    applyLanguage(currentLang);

    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'th' : 'en';
        applyLanguage(currentLang);
    });

    function applyLanguage(lang) {
        // Update button visual
        langOpts.forEach(opt => {
            if (opt.getAttribute('data-lang') === lang) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });

        // Update text content
        i18nElements.forEach(el => {
            const newText = el.getAttribute(`data-${lang}`);
            if (newText) {
                el.innerHTML = newText;
            }
        });

        // Save to localStorage
        localStorage.setItem('selectedLang', lang);
    }
});

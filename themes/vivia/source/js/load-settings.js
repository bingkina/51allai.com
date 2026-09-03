(function loadSettings() {
    const root = document.documentElement;
    const darkModeQuery = window.matchMedia
        ? window.matchMedia('(prefers-color-scheme: dark)')
        : null;

    function readSetting(key) {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            return null;
        }
    }

    function getSavedTheme() {
        const savedTheme = readSetting('theme');
        return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : null;
    }

    function writeSetting(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            // Keep the selected mode for this page even when storage is unavailable.
        }
    }

    function clearSetting(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            // Keep the selected mode for this page even when storage is unavailable.
        }
    }

    function getSystemTheme() {
        return darkModeQuery && darkModeQuery.matches ? 'dark' : 'light';
    }

    function applyTheme(theme, mode) {
        root.setAttribute('theme', theme);
        root.setAttribute('theme-mode', mode);

        const themeColor = document.querySelector('meta[name="theme-color"]');
        if (themeColor) {
            const color = themeColor.getAttribute(`data-${theme}-color`);
            if (color) themeColor.setAttribute('content', color);
        }

        if (typeof window.CustomEvent === 'function') {
            document.dispatchEvent(new CustomEvent('themechange', { detail: { theme, mode } }));
        }
    }

    let activeMode = getSavedTheme() || 'auto';

    function setPreference(mode) {
        if (mode !== 'light' && mode !== 'dark' && mode !== 'auto') return;

        activeMode = mode;
        if (mode === 'auto') {
            clearSetting('theme');
            applyTheme(getSystemTheme(), mode);
        } else {
            writeSetting('theme', mode);
            applyTheme(mode, mode);
        }
    }

    applyTheme(activeMode === 'auto' ? getSystemTheme() : activeMode, activeMode);

    window.themeSettings = {
        getMode: function() {
            return activeMode;
        },
        setPreference,
    };

    const showBanner = readSetting('showBanner');
    root.setAttribute('showBanner', showBanner == null || showBanner === 'true');

    function handleSystemThemeChange(event) {
        if (activeMode === 'auto') applyTheme(event.matches ? 'dark' : 'light', 'auto');
    }

    if (darkModeQuery) {
        if (typeof darkModeQuery.addEventListener === 'function') {
            darkModeQuery.addEventListener('change', handleSystemThemeChange);
        } else if (typeof darkModeQuery.addListener === 'function') {
            darkModeQuery.addListener(handleSystemThemeChange);
        }
    }
})();

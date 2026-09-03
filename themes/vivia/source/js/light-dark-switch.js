let themeFunc = function() {
    const btn = document.getElementById("theme-btn");
    const selector = document.getElementById("theme-selector");
    const menu = document.getElementById("theme-menu");
    const root = document.documentElement;
    if (!btn || !selector || !menu) return;

    const options = Array.from(menu.querySelectorAll('[data-theme-option]'));

    const setOpen = function(isOpen) {
        selector.classList.toggle('is-open', isOpen);
        btn.setAttribute('aria-expanded', String(isOpen));
    };

    const updateState = function() {
        const mode = root.getAttribute('theme-mode') || 'auto';
        const modeLabels = { light: '浅色', dark: '深色', auto: '自动' };
        btn.setAttribute('aria-label', `当前为${modeLabels[mode]}模式，打开主题菜单`);
        options.forEach(option => {
            const selected = option.dataset.themeOption === mode;
            option.setAttribute('aria-checked', String(selected));
            option.classList.toggle('selected', selected);
        });
    };

    updateState();

    document.addEventListener('themechange', updateState);
    selector.addEventListener('focusout', () => {
        setTimeout(() => {
            if (!selector.contains(document.activeElement)) setOpen(false);
        }, 0);
    });

    btn.addEventListener('click', () => {
        setOpen(btn.getAttribute('aria-expanded') !== 'true');
    });

    btn.addEventListener('keydown', event => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            setOpen(true);
            options[event.key === 'ArrowDown' ? 0 : options.length - 1].focus();
        }
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            if (window.themeSettings) {
                window.themeSettings.setPreference(option.dataset.themeOption);
            }
            setOpen(false);
            btn.focus();
        });
    });

    menu.addEventListener('keydown', event => {
        const currentIndex = options.indexOf(document.activeElement);
        let nextIndex = null;
        if (event.key === 'ArrowDown') nextIndex = (currentIndex + 1) % options.length;
        if (event.key === 'ArrowUp') nextIndex = (currentIndex - 1 + options.length) % options.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = options.length - 1;
        if (nextIndex != null) {
            event.preventDefault();
            options[nextIndex].focus();
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
            setOpen(false);
            btn.focus();
        }
    });

    document.addEventListener('click', event => {
        if (!selector.contains(event.target)) setOpen(false);
    });
};
themeFunc();

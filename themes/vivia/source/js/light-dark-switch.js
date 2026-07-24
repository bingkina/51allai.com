let themeFunc = async function() {
    let btn = document.getElementById("theme-btn");
    let root = document.documentElement;
    if (!btn) return;
    const updateLabel = function() {
        const nextTheme = root.getAttribute('theme') == 'dark' ? '浅色' : '深色';
        btn.setAttribute('aria-label', `切换到${nextTheme}模式`);
    };
    updateLabel();
    btn.addEventListener('click', e => {
        if (root.getAttribute('theme') == 'dark') {
            root.setAttribute('theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            root.setAttribute('theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
        updateLabel();
    });
};
themeFunc();

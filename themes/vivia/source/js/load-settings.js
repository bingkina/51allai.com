function loadSettings() {
    const savedTheme = localStorage.getItem('theme');
    const theme = savedTheme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('theme', theme);

    let showBanner = localStorage.getItem("showBanner");
    if (showBanner == null || showBanner == undefined || showBanner == "true") {
        document.documentElement.setAttribute('showBanner', true)
    } else {
        document.documentElement.setAttribute('showBanner', false)
    }
};
loadSettings();

// ----------Set themes ---------- //
class SetThemes{
    constructor(){
        this.changeModeBtn = () => {
            // access to the switch mode button
            const changeModeBtn = document.querySelector('#switch-theme-btn');
            return changeModeBtn;
        }
        this.browserSearchBoxColor = () => {
            // access to the browser search box color ---- meta tag
            const browserSearchBoxColor = document.querySelector("#browserSearchBoxColor");
            return browserSearchBoxColor;
        }
        this.bodyTag = () => {
            // access to the body tag
            const bodyTag = document.querySelector('body');
            return bodyTag;
        }
        this.chooseInputs = () => {
            // access to the choose theme inputs
            const inputs = document.querySelectorAll('#choose-theme-box input');
            return inputs;
        }
    }

    // set system theme 
    systemTheme(){
        // set currentTheme in the local storage
        localStorage.setItem('currentTheme', 'system');
        // access to the user device theme
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // set dark theme
            this.darkTheme('systemTheme');
        }else{
            // set light theme
            this.lightTheme('systemTheme');
        }
        // system input checked
        this.chooseInputs()[2].checked = 'true';
    }

    // set dark theme
    darkTheme(isSystemTheme){
        // if is system theme == true ------> set current theme in localstorage ==> system
        if(isSystemTheme === 'systemTheme'){
            // set system in the local storage
            localStorage.setItem('currentTheme', 'system');
        }else{
            // set dark in the local storage
            localStorage.setItem('currentTheme', 'dark');
        }
        // change botton content ------- in dark mode
        this.changeModeBtn().firstElementChild.classList = 'fa-regular fa-sun-bright';
        this.changeModeBtn().lastElementChild.innerHTML = 'Light mode';
        // change search box color
        this.browserSearchBoxColor().setAttribute('content', '#0f111b');
        this.bodyTag().classList.add('dark');

        // dark theme input checked
        this.chooseInputs()[0].checked = 'true';
    }

    // set light theme
    lightTheme(isSystemTheme){
        // if is system theme == true ------> set current theme in localstorage ==> system
        if(isSystemTheme === 'systemTheme'){
            // set system in the local storage
            localStorage.setItem('currentTheme', 'system');
        }else{
            // set light in the local storage
            localStorage.setItem('currentTheme', 'light');
        }
        // change botton content ------- in light mode
        this.changeModeBtn().firstElementChild.classList = 'fa-regular fa-moon'
        this.changeModeBtn().lastElementChild.innerHTML = 'Dark mode';
        // change search box color
        this.browserSearchBoxColor().setAttribute('content', '#ffffff');
        // if dark class exist in body tag ----> removeit
        if (this.bodyTag().classList.contains('dark')) {
            // remove dark class
            this.bodyTag().classList.remove('dark');
        }

        // light theme input checked
        this.chooseInputs()[1].checked = 'true';
    }
}
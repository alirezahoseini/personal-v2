import Theme from "./theme.js";
import WeatherApp from "./weatherApp.js";
const theme = new Theme();
const weatherApp = new WeatherApp();


class Dom {
  removeClassTimeOut(elementId, time, classValue) {
    const selectedElement = document.querySelector(elementId);
    setTimeout(() => {
      selectedElement.classList.remove(classValue);
    }, time);
  }
  removeClass(elementId, classValue) {
    const selectedElement = document.querySelector(elementId);
    selectedElement.classList.remove(classValue);
  }

  addClassTimeOut(elementId, time, classValue) {
    const selectedElement = document.querySelector(elementId);
    setTimeout(() => {
      selectedElement.classList.add(classValue);
    }, time);
  }

  addClass(elementId, classValue) {
    const selectedElement = document.querySelector(elementId);
    selectedElement.classList.add(classValue);
  }

  replaceClass(element, prevClass, newClass) {
    const selectedElem = document.querySelector(element);
    selectedElem.classList.remove(prevClass);

    setTimeout(() => {
      selectedElem.classList.add(newClass);
    }, 10);
  }
  // Show APP Page
  async showApp() {
    // Set 10s timeout for showing vpn error
    const showErorTimeOut = setTimeout(() => {
      this.showVpnError();
    }, 20000);
    // show app page
    this.removeClassTimeOut("#app", 300, "hidden");
    // set theme
    theme.firstLoadSetTheme()
    // hidde loading
    this.addClassTimeOut("#loading", 500, "hidde");
    // hidde first select city page
    this.addClass("#select_first_city", "hidden");

    // Access to user city from LS
    const userCityName = localStorage.getItem('userCity').toLowerCase();
    // created url
    const url = `https://key48798231.herokuapp.com/weather?input=${userCityName}`;
    // send request
    const request = await fetch(url).then((res) => res)
    .catch((error) => {
      this.showVpnError()
      console.log(error)
    })
    // access response
    const response = await request.json();

    // check response error
    if(request.status === 200){
      this.runApp(response)
      this.addClassTimeOut("#select_first_city", 100, "hidden");
      clearTimeout(showErorTimeOut)
    }else{
      this.showVpnError()
    }

      // // For test offline -------------
      // const data = JSON.parse(localStorage.getItem('weather'));
      // this.runApp(data)
      // this.addClassTimeOut("#loading", 300, "hidde");
      // this.removeClassTimeOut("#app", 100, "hidden");
      // this.addClassTimeOut("#select_first_city", 100, "hidden");
      // theme.firstLoadSetTheme()

  }
  // Show First page and select city
  showFirstPage() {
    this.addClassTimeOut("#loading", 300, "hidde");
    this.addClass("#select_first_city", "flex");
    this.removeClass("#select_first_city", "hidden");
  }
  // Show Message
  showMessage(message="default message", icon= "info", colorClass='success') {
    // access message box
    const messageBox = document.querySelector("#message_box");
    // create message tag
    const messageTag = document.createElement('div');
    messageTag.classList = `message ${colorClass} duration-700 invisible animate_bottom`;
    messageTag.innerHTML = `
        <div class="message--body">
          <i class="message--icon icon-${icon}"></i>
          <span class="message-text">
              ${message}
          </span>
        </div>
        `;
    // apeend and show message
    messageBox.appendChild(messageTag)
    messageTag.classList.remove('invisible')
    // slide on
    setTimeout(() => {
        messageTag.classList.remove('animate_bottom')
    }, 100);
    // slide out
    setTimeout(() => {
        messageTag.classList.add('animate_top')
    }, 5000);
    // romowe from DOM
    setTimeout(() => {
        messageTag.remove()
    }, 5500);
  }
  // Run and create app
  runApp(data){
    console.log(data)
    localStorage.setItem('weather', JSON.stringify(data));
    weatherApp.setRealtimeWeather(data[0]);
    weatherApp.nextHours(data);
    weatherApp.setDateAndTime();

    // Remove loading frame classes
    this.removeLoadingFrame('main_weather');
    this.removeLoadingFrame('more_data_section');
    this.removeLoadingFrame('next_hours_weather');
    
  }
  // Background hiddden Closer popups
  backgroundHidden(){
    const bg = document.querySelector('#hidden_background_section');
    // access to elements for closeing
    const app = document.querySelector('#app'),
          themeSwitcherMenu = document.querySelector('#switcher_menu');
    bg.addEventListener('click', () => {
      // Close Theme Switcher
      if(themeSwitcherMenu.classList.contains('active')){
        app.classList.remove('blur');
        themeSwitcherMenu.classList.remove('active');
        bg.classList.remove('active')
      }
    })
  }
  // Show Vpn error
  showVpnError(){
    // access to the Elements
    const appElem = document.querySelector('#app'),
          selectFirstCityElem = document.querySelector('#select_first_city'),
          vpnErrorElem = document.querySelector('#vpn_error'),
          errorTextBox = vpnErrorElem.querySelector('#error-text');

    // Blur bg
    appElem.classList.add('blur');
    selectFirstCityElem.classList.add('blur');

    // Show error
    vpnErrorElem.classList.add('active');
    setTimeout(() => {
      errorTextBox.classList.remove('animate_bottom')
    }, 500);
  }
  // Remove loading frame
  removeLoadingFrame(elementId){
    // access to the loading classes
    const loadingClasses = document.querySelectorAll(`#${elementId} .loading_frame`);
    // remove classes
    loadingClasses.forEach(currentElement => currentElement.classList.remove('loading_frame'))
  }
  
}

export default Dom;

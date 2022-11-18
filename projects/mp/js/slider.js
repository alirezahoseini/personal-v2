function timelineSlider(){

    // created click event on slider
    timeLine.addEventListener('input', (e) => {
        update();
    });

    function update(){
        // set timeline fill width
        timlineFill.style.width = `${timeLine.value}%`;
        // set audio current time
        audio.currentTime = timeLine.value * (audio.duration / 100);
        // set value in DOM
        timeLine.setAttribute('value', timeLine.value);
    }
}


// volume slider
function volumeSlider(){
    // access to the volume range
    const volumeRange = document.querySelector('#volume');
    // access to the volume fill
    const volumeFill = document.querySelector('#volume-fill');
    // access to the volume number
    const volumeNumber = document.querySelector('#volume-num');
    volumeFill.style.width = volumeRange.value + '%';
    // access to the volume icon'
    const volumeIcon = document.querySelector('#volume-icon');

    // volume range value changed
    volumeRange.addEventListener('input', () => {
        update();
    });




    // update volume
    function update(){

        // change volume icon
        if(volumeRange.value > 80){
            volumeIcon.classList = 'fa-light fa-volume-high text-white';
            volumeBtn.firstElementChild.classList = 'fa-light fa-volume-high';
        }else if(volumeRange.value > 50){
            volumeIcon.classList = 'fa-light fa-volume text-white';
            volumeBtn.firstElementChild.classList = 'fa-light fa-volume';
        }else if(volumeRange.value > 20){
            volumeIcon.classList = 'fa-light fa-volume-low text-white';
            volumeBtn.firstElementChild.classList = 'fa-light fa-volume-low';
        }else if(volumeRange.value > 0 && volumeRange.value < 7 ){
            volumeIcon.classList = 'fa-light fa-volume-low text-black';
            volumeBtn.firstElementChild.classList = 'fa-light fa-volume-low';
        }else if(volumeRange.value < 1){
            volumeIcon.classList = 'fa-light fa-volume-xmark text-black';
            volumeBtn.firstElementChild.classList = 'fa-light fa-volume-xmark';
        }else if(volumeRange.value > 0){
            volumeIcon.classList = 'fa-light fa-volume-low text-white';
            volumeBtn.firstElementChild.classList = 'fa-light fa-volume-low';
        }

        // change volume fill width
        volumeFill.style.width = volumeRange.value + '%';
        // change volume number 
        volumeNumber.textContent = '0' + volumeRange.value;
        if(volumeRange.value > 99){
            volumeNumber.textContent = volumeRange.value
        }
        if(volumeRange.value < 10){
            volumeNumber.textContent = '00' + volumeRange.value
        }
        if(volumeRange.value < 8){
            volumeIcon.style.color = '#000'
        }
        if(volumeRange.value > 49){
            volumeNumber.style.color = '#fff';
        }else{
            volumeNumber.style.color = '#000';
        }
        // change audio volume
        audio.volume = volumeRange.value / 100;
    }
}
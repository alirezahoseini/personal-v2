class Message{
    // show message 
    showMessage(message){
        // access to the message box
        const messageBox = document.querySelector('#message-box');

        // created div tag
        const div = document.createElement('div');
        div.textContent = message;
   
        // append div to the message box
        messageBox.appendChild(div);

        setTimeout(() => {
            div.classList.add('active');
        }, 500);

        // hide message after 4s
        setTimeout(() => {
            div.classList.remove('active');
            div.classList.add('hide');
        }, 2500);

        // remove div tag from Dom after 5s
        setTimeout(() => {
            div.remove();
        }, 3000);


    }
} 
const BOT_IMG = "https://t4.ftcdn.net/jpg/02/23/38/61/240_F_223386120_OMJd0gW045lI3TGy4UfUDOzOKvcrDWLR.jpg";
const PERSON_IMG = "https://image.flaticon.com/icons/png/128/706/706807.png";
const BOT_NAME = "BOT";
let socket;
function appendMessage(name, img, side, text) {
    //   Simple solution for small apps
    debugger;
    const msgHTML = `
      <div class="msg ${side}-msg">
        <div class="msg-img" style="background-image: url(${img})"></div>
  
        <div class="msg-bubble">
          <div class="msg-info">
            <div class="msg-info-name">${name}</div>
            <div class="msg-info-time">${formatDate(new Date())}</div>
          </div>
  
          <div class="msg-text">${text}</div>
        </div>
      </div>
    `;
  
    document.getElementById('chat').insertAdjacentHTML("beforeend", msgHTML);
    document.getElementById('chat').scrollTop += 500;
  }
  
  function formatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();
  
    return `${h.slice(-2)}:${m.slice(-2)}`;
  }
  
  function AddMessageClick(){
    event.preventDefault();
    var msgerInput = document.getElementById('input');
    const msgText = msgerInput.value;
    if (!msgText) return;

    
   
    appendMessage("Me", PERSON_IMG, "right", msgText);
    msgerInput.value = "";
   
    //socket.broadcast.emit('sendMessage',{user:'user', msg:msgText});
    socket.emit(
        'sendMessage',
        {
            from: "User",
            text: msgText
        }
    )

  }

$(document).ready(function(){
  
    // під'єднуємось до сервера - створюєм новий сокет
     socket=io.connect('http://localhost:8000');
    // відправляємо повідомлення про під'єднання нового користувача
    socket.emit('joinclient', "is connected!");
    debugger;
    socket.on('toAllUsers', message => {
        debugger;
        console.log('toAllUsers -- client side', message);
        appendMessage(BOT_NAME, BOT_IMG, "left", message);
    });
    socket.on('joinserver', message => {
        console.log('joinserver -- client side', message);
        appendMessage(BOT_NAME, BOT_IMG, "left", message.msg);
    });

    socket.on('sendMessage', message => {
        debugger;
        console.log('sendMessage -- client side', message);
        appendMessage(message.user, PERSON_IMG, "left", message.msg);
    });

    
  
});

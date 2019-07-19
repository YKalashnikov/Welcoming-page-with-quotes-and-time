const time = document.getElementById("time");
const name = document.getElementById("name");
const greetings = document.getElementById("greetings");
const focus = document.getElementById("focus");
const showAmPm = true;
//Show time
const showTime = () => {
  const today = new Date();
    hour = today.getHours();
    min = today.getMinutes();
    sec = today.getSeconds();
  //Set pm or Am
  const amPm = hour >= 12 ? "PM" : "AM";
  //Format 12hr
    hour = hour % 12 || 12;

  time.innerHTML = `${hour}:<span>${addZero(min)}</span>:<span>${addZero(
    sec
  )}</span> ${amPm}`;
  setTimeout(showTime, 1000);
};

const addZero = n => (parseInt(n, 10) < 10 ? "0" : "") + n;

//Set Greeting and backgrounds

const setBgAndGreet = () => {
  const today = new Date();
  const hour = today.getHours();
  if (hour < 12) {
    //Good morning
    greetings.textContent = "Good Morning";
    document.body.style.backgroundImage =
     "url('https://source.unsplash.com/random?morning, day')'";
     document.body.style.backgroundSize = "cover";
  } else if (hour < 18) {
    //Good afternoon
    greetings.textContent = "Good Afternoon";
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/random?afternoon, ocean')";
     document.body.style.backgroundSize = "cover";
  } else {
    //Good evening
    greetings.textContent = "Good Evening";
    document.body.style.backgroundImage =
  "url('https://source.unsplash.com/random?evening, night')";
     document.body.style.backgroundSize = "cover";
    

  }
};
//Get name
const getName = () => { 
    if(localStorage.getItem('name')===null) {
        name.textContent = '[Enter Name]'
    }else {
        name.textContent = localStorage.getItem('name')
    }
}
//Set name
const setName = event => {
    if(event.type == 'keypress') {
        if(event.which === 13 || event.keyCode === 13){
            localStorage.setItem('name', event.target.innerText);
            name.blur()
        } else {
            localStorage.setItem('name',event.target.innerText);
        }
    }
}

//Get Focus
const getFocus = () => {
    if(localStorage.getItem('focus')===null) {
        focus.textContent = '[Enter Your Focus]'
    }else {
        focus.textContent = localStorage.getItem('focus')
    }
}
const setFocus = event => {
    if(event.type == 'keypress') {
        if(event.which === 13 || event.keyCode === 13){
            localStorage.setItem('focus', event.target.innerText);
            focus.blur()
        } else {
            localStorage.setItem('focus',event.target.innerText);
        }
    }
}
const randomQuote =() =>{
    $.ajax({
        url: "https://api.forismatic.com/api/1.0/?",
        dataType: "jsonp",
        data: "method=getQuote&format=jsonp&lang=en&jsonp=?",
        success: function( quoteData ) {
  
           if (quoteData.quoteAuthor === '') {
           quoteData.quoteAuthor = 'Unknown';
           };
  
          $("#quote").html("<p id='quote'>" + "<i class=\"fa fa-quote-left\"></i> &nbsp; &nbsp;" + 
            quoteData.quoteText + "<br/> " + "<div class=\"text-right\"> &dash;" + quoteData.quoteAuthor + "</div>" + "</p>");
        }
    });
  }
  

name.addEventListener('keypress',setName);
name.addEventListener('blur',setName);
focus.addEventListener('keypress',setFocus);
focus.addEventListener('blur',setFocus);

//Calling functions
showTime();
setBgAndGreet();
getName();
getFocus();
randomQuote();

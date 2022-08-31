var welcomeText = document.getElementById('welcomeText');
var userName = '';
userName = localStorage.getItem('sessionStorage');
welcomeText.innerHTML = 'Welcome ' + userName;
var btnLogOut = document.getElementById('btnLogOut');
btnLogOut.addEventListener('click', logOut);

// function Logout

function logOut(){
    localStorage.removeItem('sessionStorage');
    window.open('index.html', '_self');
}

// security condition
if (localStorage.getItem('sessionStorage') == null){
    window.open('index.html', '_self');
}
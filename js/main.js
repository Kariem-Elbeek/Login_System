var signUpBox = document.getElementById('signUpBox');
var nameInputSignUp = document.getElementById('nameInputSignUp');
var emailInputSignUp = document.getElementById('emialInputSignUp');
var passInputSignUp = document.getElementById('passInputSignUp');
var alertSignUp = document.getElementById('alertSignUp');
var signUpBtn = document.getElementById('signUpBtn');
signUpBtn.addEventListener('click', signUp);
var signInLink = document.getElementById('signInLink');
signInLink.addEventListener('click', function (){switchSignBox(signUpBox, signInBox)})



var signInBox = document.getElementById('signInBox');
var emailInputSignIn = document.getElementById('emialInputSignIn');
var passInputSignIn = document.getElementById('passInputSignIn');
var alertSignIn = document.getElementById('alertSignIn');
var signInBtn = document.getElementById('signInBtn');
signInBtn.addEventListener('click', signIn);
var signUpLink = document.getElementById('signUpLink');
signUpLink.addEventListener('click', function (){switchSignBox(signInBox, signUpBox)})


var accountsList = [];
var sessionUserName = '';

if (localStorage.getItem('accountsListStorage') != null){
    accountsList = JSON.parse(localStorage.getItem('accountsListStorage'));
}
else {
    localStorage.setItem('accountsListStorage', JSON.stringify(accountsList));
}
console.log(JSON.parse(localStorage.getItem('accountsListStorage')));

if (localStorage.getItem('sessionStorage') != null){
    sessionUserName = localStorage.getItem('sessionStorage')
}

if (alertSignUp.classList.contains('d-block')){
    alertSignUp.classList.replace('d-block', 'd-none');
}
if (alertSignIn.classList.contains('d-block')){
    alertSignIn.classList.replace('d-block', 'd-none');
}

console.log(JSON.parse(localStorage.getItem('accountsListStorage')));

// SignIn Box functions

function signIn(){
    var item ={
        email: emailInputSignIn.value,
        pass: passInputSignIn.value,
    }
    var userName = ''
    checkAccount();
    if (checkAccount() != null){
        userName = checkAccount();
        localStorage.setItem('sessionStorage', userName)
    }

    clearData([emailInputSignIn, passInputSignIn]);
}

function checkAccount(){
    var name = '';
    if (emailInputSignIn.value == '' || passInputSignIn.value == ''){
        alertSignIn.innerHTML = 'Enter complete data!';
        alertSignIn.classList.replace('d-none', 'd-block');
    }
    else if (accountsList.length == 0){
        alertSignIn.innerHTML = "You don't have an account!"
        alertSignIn.classList.replace('d-none', 'd-block');
    }
    else {
        for (i = 0; i < accountsList.length; i++){
        
            if (accountsList[i].email == emailInputSignIn.value  && accountsList[i].pass == passInputSignIn.value){
                window.open('home.html', '_self');
                name = accountsList[i].name;
            }
            else if (emailInputSignIn.value == accountsList[i].email && passInputSignIn.value != accountsList[i].pass){
                alertSignIn.innerHTML = 'Incorrect Password!';
                alertSignIn.classList.replace('d-none', 'd-block');
            }
            else {
                alertSignIn.innerHTML = 'Enter correct data!'
                alertSignIn.classList.replace('d-none', 'd-block');
            }
        }
    }
    return name;

}



// SignUb Box functions

function signUp(){
    var item = {
        name: nameInputSignUp.value, 
        email: emailInputSignUp.value, 
        pass: passInputSignUp.value,
    };
    clearAlert(alertSignUp);
    if (chcekCompleteData([nameInputSignUp, emailInputSignUp, passInputSignUp]) == true){
        alertSignUp.innerHTML = 'Enter complete data';
        alertSignUp.classList.replace('d-none', 'd-block');
    }
    else if (checkExistingEmail() == true){
        alertSignUp.innerHTML = 'This Email exists already!';
        alertSignUp.classList.replace('d-none', 'd-block');
    }
    else {
        accountsList.push(item);
        clearData([nameInputSignUp, emailInputSignUp, passInputSignUp]);
        localStorage.setItem('accountsListStorage', JSON.stringify(accountsList));
        console.log(JSON.parse(localStorage.getItem('accountsListStorage')));    
        alertSignUp.innerHTML = 'Successful Registration!';
        alertSignUp.classList.replace('d-none', 'd-block');
    }
}

// Home

// General functions

function chcekCompleteData(checkList){
    var x = false;
    for (i=0; i<checkList.length; i++){
        if (checkList[i].value == ''){
            x = true;
        }
    }
    return x;
}

function switchSignBox(x, y){
    x.classList.replace('d-block', 'd-none');
    y.classList.replace('d-none', 'd-block');
    clearAlert(alertSignIn);
    clearAlert(alertSignUp);
}

function clearData(checkList){
    for (i=0; i<checkList.length; i++){
        checkList[i].value = ''
    }
}

function clearAlert(alertItem){
    if (alertItem.classList.contains('d-block') == true){
        alertItem.classList.replace('d-block', 'd-none');
    }
}

// Question => done
// var testBtn = document.getElementById('testBtn')
// testBtn.addEventListener('click', function() {checkExistingItem(emailInputSignIn, 'email')})

// function checkExistingItem(checkItem, objecItem){
//     x = false;
//     for (i = 0; i < accountsList.length; i++){
//         if (accountsList[i][objecItem] == checkItem.value){
//             x = true;
//         }
//     }
//     if (x == true){
//         alertSignIn.innerHTML = 'True';
//         alertSignIn.classList.replace('d-none', 'd-block');
//     }
// }

function checkExistingEmail(){
    x = false;
    for (i = 0; i < accountsList.length; i++){
        if (accountsList[i].email == emailInputSignUp.value){
            x = true;
        }
    }
    return x;
}
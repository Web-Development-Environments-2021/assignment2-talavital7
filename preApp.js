var validForm;
saveKUser();
function saveKUser() 
{
    var username="k";
    var password="k";
    sessionStorage.setItem(username,password);
} 
function PageLoaded()
{
    ShowSection('gameScreen');
}

//choose section to show.
function ShowSection(id)
{
    //hide all Divs
    var section1 = document.getElementById('welcomeScreen');
    section1.style.display="none";
    var section2 = document.getElementById('signUp');
    section2.style.display="none";
    var section3 = document.getElementById('login');
    section3.style.display="none";
    var section4 = document.getElementById('gameScreen');
    section4.style.display="none";
    // var section4 = document.getElementById('setups');
    // section4.style.display="none";
    
    //show only one Div
    var selected = document.getElementById(id);
    selected.style.display="table";
    // if(id != 'boardGame')
    //     endGame();
    
    $(".error").remove();
}

//Submition button has been clicked in sign up page
function Submition(){
    validForm=true;
    var username = $('#usernameSignUp').val();
    var fullname = $('#fullname').val();
    var email = $('#email').val();
    var password = $('#passwordSignUp').val();

    $(".error").remove();

    //username validation 
    if (username.length <= 0) {
        $('#usernameSignUp').after('<span class="error">Please Enter Username</span>');
        validForm=false;
    }
    else{
        var regEx = /^[a-zA-Z]+$/;
        var test = regEx.test(username);
        if (!test) {
        $('#username').after('<span class="error">A valid username contains only English charecters</span>');
        validForm=false;
        }
    }

    //pasword validation
    if (password.length <= 0) {
        $('#passwordSignUp').after('<span class="error">Please Enter Password</span>');
        validForm=false;
    }
    else if (password.length < 6) {
        $('#passwordSignUp').after('<span class="error">Password must be at least 6 characters long</span>');
        validForm=false;
    }
    else{
        var regEx = /[a-z].[0-9]|[0-9].[a-z]/i;
        var test = regEx.test(password);
        if (!test) {
        $('#passwordSignUp').after('<span class="error">Enter password with charecters and digits</span>');
        validForm=false;
        }
    }

    //full name validation
    if (fullname.length <= 0) {
        $('#fullname').after('<span class="error">Please Enter full name</span>');
        validForm=false;
    }
    else{
        var regEx = /^[a-z][a-z\s]*$/;
        var test = regEx.test(fullname);
        if (!test) {
        $('#fullname').after('<span class="error">A valid full name contains only English charecters</span>');
        validForm=false;
        }
    }

    //email validation
    if (email.length <= 0) {
        $('#email').after('<span class="error">Please Enter Email</span>');
        validForm=false;
    } else {
        var regEx = /^\S+@\S+\.\S+$/;
        var test = regEx.test(email);
        if (!test) {
        $('#email').after('<span class="error">Enter a valid email</span>');
        validForm=false;
        } 
    }
   
    //if all requirments are met, create new user.
    if(validForm){
    saveUser(); 
    alert("registered successfully!");
    $("#regForm")[0].reset();
    $(".error").remove();
    ShowSection('login');
    }
}

//clear fields
function clearFields(){
    document.getElementById('fullname').value = '';
    document.getElementById('usernameSignUp').value = '';
    document.getElementById('day').value = '1';
    document.getElementById('month').value = 'Jan';
    document.getElementById('passwordSignUp').value = '';
    document.getElementById('email').value = '';
    document.getElementById('year').value = '2016';
    $(".error").remove();

}
function saveUser() 
{
    var username=document.getElementById("usernameSignUp");
    var password=document.getElementById("passwordSignUp");
    sessionStorage.setItem(username.value,password.value);
    
}   
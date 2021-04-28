var upisPressed;
var downisPressed;
var leftisPressed;
var rightisPressed;

var upSetupVal= 38;
var downSetupVal= 40;
var leftSetupVal= 37;
var rightSetupVal= 39;

var keysDivClone;
function upUpdate(){
    upisPressed=false;
    addEventListener('keydown', function f(e) {
        if (e != undefined && !upisPressed){
            Key=e.key;
            document.getElementById('UpSetup').value=Key;
            upSetupVal=e.keyCode;
            upisPressed=true;
        }
    });
}

function downUpdate(){
    downisPressed=false;
    addEventListener('keydown', function f(e) {
        if (e != undefined && !downisPressed){
            Key=e.key;
            document.getElementById('DownSetup').value=Key;
            downSetupVal=e.keyCode;
            downisPressed=true;
        }
    });
}

function leftUpdate(){
    leftisPressed=false;
    addEventListener('keydown', function f(e) {
        if (e != undefined && !leftisPressed){
            Key=e.key;
            document.getElementById('LeftSetup').value=Key;
            leftSetupVal=e.keyCode;
            leftisPressed=true;
        }
    });
}

function rightUpdate(){
    rightisPressed=false;
    addEventListener('keydown', function f(e) {
        if (e != undefined && !rightisPressed){
            Key=e.key;
            document.getElementById('RightSetup').value=Key;
            rightSetupVal=e.keyCode;
            rightisPressed=true;
        }
    });
}

function escClose(){
    escPressed=false;
    addEventListener('keydown', function f(e) {
        var keyval=e.keyCode;
        if (e != undefined && !rightisPressed && keyval==27){
            document.getElementById('myModal').style.display="none";
            // $('#myModal').hide();
            escPressed=true;
        }
    });
}

function startGameSetup(){
    var lunchGame=true;
    var balls = parseInt($('#ballsNum').val());
    var time = parseInt($('#timeNum').val());
    var ghostsNum = parseInt($('#monsterNum').val());

    $(".error").remove();
    //no blank field check.
    if($('#ballsNum').val().length<1){
        $('#ballsNum').after('<span class="error">This field is required</span>');
        lunchGame=false;
    }
    if($('#timeNum').val().length<1){
        $('#timeNum').after('<span class="error">This field is required</span>');
        lunchGame=false;
    }
    if($('#monsterNum').val().length<1){
        $('#monsterNum').after('<span class="error">This field is required</span>');
        lunchGame=false;
    }
    //range fits checks.
    if (balls < 50 | balls > 90) {
        $('#ballsNum').after('<span class="error">Enter 50-90 balls</span>');
        lunchGame=false;
    }
    if (time < 60) {
        $('#timeNum').after('<span class="error">Enter 60 or more seconds</span>');
        lunchGame=false;
    }
    if (ghostsNum < 1 | ghostsNum > 4) {
        $('#monsterNum').after('<span class="error">Enter 1-4 ghosts</span>');
        lunchGame=false;
    }
    //if all is set correctly start game.
    if (lunchGame){
        up=upSetupVal;
        down=downSetupVal;
        left=leftSetupVal;
        right=rightSetupVal;
        food_color_5p=$('#5p').val();
        food_color_15p=$('#15p').val();
        food_color_25p=$('#25p').val();
        game_time=time;
        food_remain=balls;
        num_of_ghosts=ghostsNum;
        handleSetupSide();
        ShowSection('gameScreen');
        Start();
    }
}

function handleSetupSide(){
    //keys
    $("#UpSetupSide").val($("#UpSetup").val());
    document.getElementById("UpSetupSide").setAttribute("readonly", true);
    $("#DownSetupSide").val($("#DownSetup").val());
    document.getElementById("DownSetupSide").setAttribute("readonly", true);
    $("#LeftSetupSide").val($("#LeftSetup").val());
    document.getElementById("LeftSetupSide").setAttribute("readonly", true);
    $("#RightSetupSide").val($("#RightSetup").val());
    document.getElementById("RightSetupSide").setAttribute("readonly", true);
    //params
    $("#ballsNumSide").val($("#ballsNum").val());
    document.getElementById("ballsNumSide").setAttribute("readonly", true);

    $("#timeNumSide").val($("#timeNum").val());
    document.getElementById("timeNumSide").setAttribute("readonly", true);

    $("#monsterNumSide").val($("#monsterNum").val());
    document.getElementById("monsterNumSide").setAttribute("readonly", true);
    //colors
    document.getElementById("5pSide").style.backgroundColor=$("#5p").val();
    document.getElementById("5pSide").setAttribute("readonly", true);
    document.getElementById("15pSide").style.backgroundColor=$("#15p").val();
    document.getElementById("15pSide").setAttribute("readonly", true);
    document.getElementById("25pSide").style.backgroundColor=$("#25p").val();
    document.getElementById("25pSide").setAttribute("readonly", true);
}

function randomGameSetup(){
    //random keys
    $("#keysDiv").replaceWith(keysDivClone.clone());
    // random colors.
    var randColor1=random_rgba()//'#'+Math.floor(Math.random()*16777215).toString(16);
    var randColor2=random_rgba();//'#'+Math.floor(Math.random()*16777215).toString(16);
    var randColor3=random_rgba();//'#'+Math.floor(Math.random()*16777215).toString(16);
    document.getElementById('5p').value=randColor1;
    document.getElementById('15p').value=randColor2;
    document.getElementById('25p').value=randColor3;
    // random time.
    var randTime=randomInteger(60,99);
    document.getElementById('timeNum').value=randTime;
    //random balls.
    var randBalls = randomInteger(50,75);
    document.getElementById('ballsNum').value=randBalls;
    //random ghosts.
    var randGhosts = randomInteger(1,4);
    document.getElementById('monsterNum').value=randGhosts;
}

function random_rgba() {
    const r = randomInteger(0, 255);
    const g = randomInteger(0, 255);
    const b = randomInteger(0, 255);
    const rgb = rgbToHex(r, g, b);
    return rgb;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
  
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
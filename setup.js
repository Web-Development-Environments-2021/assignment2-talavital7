var upisPressed;
var downisPressed;
var leftisPressed;
var rightisPressed;

var upSetupVal;
var downSetupVal;
var leftSetupVal;
var rightSetupVal;
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

function startGameSetup(){
    var lunchGame=true;
    //TODO: check validation of setup fields.

    if (lunchGame){
        up=upSetupVal;
        down=downSetupVal;
        left=leftSetupVal;
        right=rightSetupVal;
        food_color_5p=$('#5p').val();
        food_color_15p=$('#15p').val();
        food_color_25p=$('#25p').val();
        game_time=parseInt($('#timeNum').val());
        food_remain=parseInt($('#ballsNum').val());
        num_of_ghosts=parseInt($('#monsterNum').val());
        ShowSection('gameScreen');
        Start();
    }
}
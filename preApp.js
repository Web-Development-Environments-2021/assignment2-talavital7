var poll;
saveKUser();
function saveKUser() 
{
    var userName="k";
    var password="k";
    sessionStorage.setItem(userName,password);
} 
function PageLoaded()
{
    ShowSection('welcomeScreen');
    poll = setInterval(function()
	{
		// var current_style = document.getElementById('gameScreen').style.display;
		// if (current_style == "none") {
		// 	endGame();
		// }
	}, 100);
}
//pick between Divs
function ShowSection(id)
{
    //hide all Divs
    var section1 = document.getElementById('welcomeScreen');
    section1.style.display="none";
    var section2 = document.getElementById('signUp');
    section2.style.display="none";
    // var section3 = document.getElementById('login');
    // section3.style.display="none";
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
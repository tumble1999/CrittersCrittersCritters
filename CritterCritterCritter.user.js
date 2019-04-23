// ==UserScript==
// @name         CritterCritterCritter
// @namespace
// @version      1.1.0
// @description  Adds a few new features to BoxCritters to improve your experience!
// @author       Blackout03, with some help from codejk and slaggo
// @match        https://boxcritters.com/play/*
// @match        http://boxcritters.com/play/*
// @icon         https://cdn.discordapp.com/attachments/395187780600201217/570214992100720640/CustomBeaverTwitter.png
// @run-at       document-end
// @grant        none
// ==/UserScript==

var favicon_link_html = document.createElement('link');
favicon_link_html.rel = 'icon';
favicon_link_html.href = 'https://cdn.discordapp.com/attachments/395187780600201217/570214992100720640/CustomBeaverTwitter.png';
favicon_link_html.type = 'image/x-icon';

try {
  document.getElementsByTagName('head')[0].appendChild( favicon_link_html );
}
catch(e) { }

var jokes = [ // Updating Jokes VERY SOON //
    {"j":"What do you call a hamster in a tophat?","p":"Abrahamster Lincoln!"},
    {"j":"Where does a hamster go for vacation?","p":"Hamsterdam!"},
    {"j":"What do you call a hamster with no legs?","p":"A furball!"},
    {"j":"What do you call a hamster that can't run in a wheel?","p":"Hamateur."},
    {"j":"Why was the hamster upset with his job?","p":"It didn't pay enough celery."},
    {"j":"What do you call a hamster with three legs?","p":"Hamputee."},
    {"j":"What happens when two snails get into a fight?","p":"They slug it out!"},
    {"j":"Why is the snail the strongest animal?","p":"Because he carries a house on his back!"},
    {"j":"How do snails make important calls?","p":"On shell phones."},
    {"j":"What kind of car does a raccoon drive?","p":"A furrari."}
]

// Code for delay function

var delay = ( function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();

// Runs on page load

window.addEventListener('load', function() {

    // Sets the theme to dark if browser supports webstorage

    var chatBar = document.getElementsByClassName("input-group")[0];
    var chatBox = document.getElementsByClassName("row justify-content-center")[1];
    var jokeBtnHTML = `<span class="input-group-btn"><button id="jokebtn" class="btn btn-success">Joke</button></span>`;
    var clapBtnHTML = `<span class="input-group-btn"><button id="clapbtn" class="btn btn-warning">Snap</button></span>`;
    var balloonoffBtnHTML = `<span class="input-group-btn"><button id="balloonoffbtn" class="btn btn-info">Chat Balloons On/Off</button></span>`;
    var nametagsonoffBtnHTML = `<span class="input-group-btn"><button id="nametagsonoffbtn" class="btn btn-info">Name Tags On/Off</button></span>`;
    var mountainmodeHTML = `<div id="mmDiv" class="row justify-content-center"><span><input class="form-check-input" type="checkbox" value="" id="mountainmode"><label class="form-check-label" for="mountainmode" style="color:#000000;">Mountain Mode</label></span></div>`;
    var sandymodeHTML = `<div id="smDiv" class="row justify-content-center"><span><input class="form-check-input" type="checkbox" value="" id="sandymode"><label class="form-check-label" for="sandymode" style="color:#000000;">Sandy Mode</label></span></div>`;
    var prehistoricmodeHTML = `<div id="pmDiv" class="row justify-content-center"><span><input class="form-check-input" type="checkbox" value="" id="prehistoricmode"><label class="form-check-label" for="prehistoricmode" style="color:#000000;">Prehistoric Mode</label></span></div>`;
    var westmodeHTML = `<div id="wmDiv" class="row justify-content-center"><span><input class="form-check-input" type="checkbox" value="" id="westmode"><label class="form-check-label" for="westmode" style="color:#000000;">West Mode</label></span></div>`;
    var darkmodeHTML = `<div id="dmDiv" class="row justify-content-center"><span><input class="form-check-input" type="checkbox" value="" id="darkmode"><label class="form-check-label" for="darkmode" style="color:#000000;">Dark Mode</label></span></div>`;
    var lightmodeHTML = `<div id="lmDiv" class="row justify-content-center"><span><input class="form-check-input" type="checkbox" value="" id="lightmode"><label class="form-check-label" for="lightmode" style="color:#000000;">Light Mode</label></span></div>`;
    var redeemallitemsBtnHTML = `<span class="input-group-btn"><button id="redeemallitemsbtn" class="btn btn-danger">Collect unredeemed items</button></span>`;
    var freeitemBtnHTML = `<span class="input-group-btn"><button id="freeitembtn" class="btn btn-danger">Collect the current free item</button></span>`;
    chatBar.insertAdjacentHTML('beforeend', jokeBtnHTML);
    chatBar.insertAdjacentHTML('beforeend', clapBtnHTML);
    chatBar.insertAdjacentHTML('afterend', balloonoffBtnHTML);
    chatBar.insertAdjacentHTML('afterend', nametagsonoffBtnHTML);
    chatBar.insertAdjacentHTML('afterend', redeemallitemsBtnHTML);
    chatBar.insertAdjacentHTML('afterend', freeitemBtnHTML);
    chatBox.insertAdjacentHTML('afterend', mountainmodeHTML);
    chatBox.insertAdjacentHTML('afterend', sandymodeHTML);
    chatBox.insertAdjacentHTML('afterend', prehistoricmodeHTML);
    chatBox.insertAdjacentHTML('afterend', westmodeHTML);
    chatBox.insertAdjacentHTML('afterend', darkmodeHTML);
    chatBox.insertAdjacentHTML('afterend', lightmodeHTML);

    if (localStorage.getItem("theme") == "mountain") {
        document.body.style = "background:url('https://cdn.discordapp.com/attachments/319000727332716544/570223902953963521/Mountain_Background.png');transition:0.5s;";
        document.getElementById("mountainmode").checked = true;
    }

    if (localStorage.getItem("theme") == "sandy") {
        document.body.style = "background:url('https://cdn.discordapp.com/attachments/319000727332716544/570223447981162496/Sandy_Background.png;transition:0.5s;";
        document.getElementById("sandymode").checked = true;
    }

    if (localStorage.getItem("theme") == "prehistoric") {
        document.body.style = "background:url('https://cdn.discordapp.com/attachments/319000727332716544/570222048345849856/Prehistoric_Background.png;transition:0.5s;";
        document.getElementById("prehistoricmode").checked = true;
    }

    if (localStorage.getItem("theme") == "west") {
        document.body.style = "background:url('https://cdn.discordapp.com/attachments/319000727332716544/570225956631871488/West_Background.png;transition:0.5s;";
        document.getElementById("westmode").checked = true;
    }

    if (localStorage.getItem("theme") == "dark") {
        document.body.style = "background:url('https://cdn.discordapp.com/attachments/319000727332716544/570229460876525568/Dark_Background.png;transition:0.5s;";
        document.getElementById("darkmode").checked = true;
    }

    if (localStorage.getItem("theme") == "light") {
        document.body.style = "background:url('https://cdn.discordapp.com/attachments/319000727332716544/570229430509895691/Light_Background.png;transition:0.5s;";
        document.getElementById("lightmode").checked = true;
    }

    function sendJoke() {
        document.getElementById("inputMessage").value="";
        var joke = jokes[(Math.floor(Math.random() * jokes.length))]; // Retrieve random joke from variable
        world.sendMessage(joke.j); // Send the first part of the joke
        delay(function(){
            world.sendMessage(joke.p); // Send the punchline
        }, 5000 ); // end delay
    }

    function sendClap() { // Changing 24th April 2019 //
        var message = document.getElementById("inputMessage").value;
        document.getElementById("inputMessage").value="";
        message = message.split(" ").join(" 👌 ");
        message = " 👌 Avengers Engame is COMING! 👌 24th April 2019! 👌 "
        console.log(message);
        world.sendMessage(message);
    }

    function balloonoff() {
        document.getElementById("inputMessage").value="";
        world.sendMessage("/balloons"); // Turn chat balloons on/off
    }

    function nametagsonoff() {
        document.getElementById("inputMessage").value="";
        world.sendMessage("/nicknames"); // Turn name tags on/off
    }

    function mountainmodeToggle() {
        if(mountainmodeBox.checked == true) {
            localStorage.setItem("theme", "mountain");
            document.body.style = "background:url('https://cdn.discordapp.com/attachments/319000727332716544/570223902953963521/Mountain_Background.png');transition:1.0s;";
        } else {
            localStorage.setItem("theme", "normal");
            document.body.style = "background:url('https://cdn.discordapp.com/attachments/319000727332716544/570224608196821022/Normal_Background.png');transition:1.0s;";
        }
    }

    function sandymodeToggle() {
        if(sandymodeBox.checked == true) {
            localStorage.setItem("theme", "sandy");
            document.body.style = "background:url('https://cdn.discordapp.com/attachments/319000727332716544/570223447981162496/Sandy_Background.png');transition:1.0s;";
        } else {
            localStorage.setItem("theme", "normal");
            document.body.style = "background:url('https://cdn.discordapp.com/attachments/319000727332716544/570224608196821022/Normal_Background.png');transition:1.0s;";
        }
    }

    function prehistoricmodeToggle() {
        if(prehistoricmodeBox.checked == true) {
            localStorage.setItem("theme", "prehistoric");
            document.body.style = "background:url('https://cdn.discordapp.com/attachments/319000727332716544/570222048345849856/Prehistoric_Background.png');transition:1.0s;";
        } else {
            localStorage.setItem("theme", "normal");
            document.body.style = "background:url('https://cdn.discordapp.com/attachments/319000727332716544/570224608196821022/Normal_Background.png');transition:1.0s;";
        }
    }

    function westmodeToggle() {
        if(westmodeBox.checked == true) {
            localStorage.setItem("theme", "west");
            document.body.style = "background:url('https://cdn.discordapp.com/attachments/319000727332716544/570225956631871488/West_Background.png');transition:1.0s;";
        } else {
            localStorage.setItem("theme", "normal");
            document.body.style = "background:url('https://cdn.discordapp.com/attachments/319000727332716544/570224608196821022/Normal_Background.png');transition:1.0s;";
        }
    }

    function darkmodeToggle() {
        if(darkmodeBox.checked == true) {
            localStorage.setItem("theme", "dark");
            document.body.style = "background:url('https://cdn.discordapp.com/attachments/319000727332716544/570229460876525568/Dark_Background.png');transition:1.0s;";
        } else {
            localStorage.setItem("theme", "normal");
            document.body.style = "background:url('https://cdn.discordapp.com/attachments/319000727332716544/570224608196821022/Normal_Background.png');transition:1.0s;";
        }
    }

    function lightmodeToggle() {
        if(lightmodeBox.checked == true) {
            localStorage.setItem("theme", "light");
            document.body.style = "background:url('https://cdn.discordapp.com/attachments/319000727332716544/570229430509895691/Light_Background.png');transition:1.0s;";
        } else {
            localStorage.setItem("theme", "normal");
            document.body.style = "background:url('https://cdn.discordapp.com/attachments/319000727332716544/570224608196821022/Normal_Background.png');transition:1.0s;";
        }
    }

    function redeemallitems() {
        document.getElementById("inputMessage").value="";
        world.sendMessage("/rocketsnail"); // Redeems Viking Hat
        world.sendMessage("/FreeItem"); // Redeems Free Item Of The Week
        world.sendMessage("/boxcritters3d"); // Redeems 3D Glasses
        world.sendMessage("/goodnight"); // Redeems Sleepy Hat
        world.sendMessage("/discordcritters2k19"); // Redeems Discord Headphones
        world.sendMessage("/cute"); // Redeems Pink Toque
        world.sendMessage("/madeincanada"); // Redeems White Toque
        world.sendMessage("/oommgames"); // Redeems Red Space Suit
        world.sendMessage("/boxcritterswiki"); // Redeems Newspaper hat
        world.sendMessage("/andybulletin"); // Redeems Propeller Hat
        world.sendMessage("/thekeeper"); // Redeems Party Hat
        world.sendMessage("/3dboxcritters"); // Redeems Black 3D Glasses
        world.sendMessage("/bunnyhug"); // Redeems Black 3D Glasses
        world.sendMessage("/explore"); // Redeems Red Plaid Shirt
    }

    function freeitem() {
        document.getElementById("inputMessage").value="";
        world.sendMessage("/FreeItem"); // Redeems Free Item Of The Week
    }

    var jokeBtn = document.querySelector ("#jokebtn");
    if (jokeBtn) {
        jokeBtn.addEventListener ("click", sendJoke, false);
    }
    var clapBtn = document.querySelector ("#clapbtn");
    if (clapBtn) {
        clapBtn.addEventListener ("click", sendClap, false);
    }

    var balloonoffBtn = document.querySelector ("#balloonoffbtn");
    if (balloonoffBtn) {
        balloonoffBtn.addEventListener ("click", balloonoff, false);
    }

    var nametagsonoffBtn = document.querySelector ("#nametagsonoffbtn");
    if (nametagsonoffBtn) {
        nametagsonoffBtn.addEventListener ("click", nametagsonoff, false);
    }

    var mountainmodeBox = document.querySelector ("#mountainmode");
    if (mountainmodeBox) {
        mountainmodeBox.addEventListener ("click", mountainmodeToggle, false);
    }

    var sandymodeBox = document.querySelector ("#sandymode");
    if (sandymodeBox) {
        sandymodeBox.addEventListener ("click", sandymodeToggle, false);
    }

    var prehistoricmodeBox = document.querySelector ("#prehistoricmode");
    if (prehistoricmodeBox) {
        prehistoricmodeBox.addEventListener ("click", prehistoricmodeToggle, false);
    }

    var westmodeBox = document.querySelector ("#westmode");
    if (westmodeBox) {
        westmodeBox.addEventListener ("click", westmodeToggle, false);
    }

    var darkmodeBox = document.querySelector ("#darkmode");
    if (darkmodeBox) {
        darkmodeBox.addEventListener ("click", darkmodeToggle, false);
    }

    var lightmodeBox = document.querySelector ("#lightmode");
    if (lightmodeBox) {
        lightmodeBox.addEventListener ("click", lightmodeToggle, false);
    }

    var redeemallitemsBtn = document.querySelector ("#redeemallitemsbtn"); // Collec all items that are current obtainable ingame. //
    if (redeemallitemsBtn) {
        redeemallitemsBtn.addEventListener ("click", redeemallitems, false);
    }

    var freeitemBtn = document.querySelector ("#freeitembtn"); // Only collet the item obtainable by the freeitem code. //
    if (freeitemBtn) {
        freeitemBtn.addEventListener ("click", freeitem, false);
    }

}, false);

var App = {};

App.collection = $('#wrapper .unit');

$('#play').on('click', function(){
    initApp();
    startApp(true);
    return false;
})

function initApp(){
    App.index = 0;
    App.lvl   = 1;
    App.total_score = 0;
    App.time  = 10;
    App.score_need = 10;

    if(App.ticTacInterval){
        clearInterval(App.ticTacInterval);
    }
}


function startApp(vector){
    $('#game_over').addClass('invisible');
    $(App.collection).attr('class', 'unit').text('').off();
    $('#total_score').find('span').text(App.total_score);

    if(vector){
        App.left_time = App.time;
        $('#time').find('span').text(App.time);
        startGame();
        App.ticTacInterval = setInterval(function(){ticTac()}, 1000);
    }
    else if(!vector){
        clearInterval(App.ticTacInterval);
        $('#game_over').removeClass('invisible');
    }
}

function scoreSet(score){
    $('#total_score').find('span').text(score);
}

function startGame(){
    /*render app*/
    var index = Math.floor((Math.random() * 8) + 0);
    var target = App.collection[index];
    var clicks = Math.floor((Math.random() * App.lvl) + 1);
    
    $(target).text(clicks);
    $('#lvl').find('span').text(App.lvl);
       
    

    var clicked = 0;
    
    $(target).on('click', function(e){
        e.preventDefault();
        event.stopPropagation();
        clicked++;
        if(clicked == clicks){
            scoreSet(++App.total_score);
            unsetClicks(index, target);
            
            //$(this).addClass('success');
        }
        return false;
    });
    
}

function ticTac(){
    --App.left_time;
    if(App.left_time < 1){
        startApp(false);
    }
    $('#time').find('span').text(App.left_time);
}

function unsetClicks(index, target){
    $(App.collection[index]).attr('class', 'unit').text('');
    $(target).off();
    
    if(App.total_score == App.score_need){
        lvlUp();
    }
    else{
        startGame();
    }
    
    //$(target).removeClass('success');
    //$(target).removeClass('arrow');
}

function lvlUp(){
    clearInterval(App.ticTacInterval);
    delete App.ticTacInterval;
    App.lvl++;
    App.score_need = Math.round(App.score_need*1.75);
    App.time       = Math.round(App.time*1.5);
    //App.clicks_left = App.clicks_need;
    startApp(true);
}
//var runIt = setInterval(function(){setClicks()}, 2000);

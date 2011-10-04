var MAZE = {'isStarted':false,'StopWatch':null};

MAZE.moveLeft = function(){
    return MAZE.move('E',function(x,y){return $("#node-"+x+"-"+(y-1))});
};
MAZE.moveUp = function(){
    return MAZE.move('N',function(x,y){return $("#node-"+(x-1)+"-"+y)});
};

MAZE.moveRight = function(){
    return MAZE.move('W',function(x,y){return $("#node-"+x+"-"+(y+1))});
};
MAZE.moveDown = function(){
    return MAZE.move('S',function(x,y){return $("#node-"+(x+1)+"-"+y)})
};

MAZE.move = function(direction,findNext){
    if(!MAZE.isStarted){
        MAZE.isStarted = true;
        if (MAZE.StopWatch){
            MAZE.StopWatch.start();
        }
    }

    var currentPosition = $(".current");

    if (currentPosition.hasClass(direction)){
        var next = findNext(parseInt(currentPosition.attr('data-row')),parseInt(currentPosition.attr('data-column')));
        currentPosition.removeClass('current');
        currentPosition.addClass('visited');
        if (next.hasClass('visited')){
            next.removeClass('visited');
            currentPosition.removeClass('visited')
        }

        next.addClass('current');

        if (next.hasClass('end')){
            MAZE.isStarted = false;
            if (MAZE.StopWatch){
                var elapse = MAZE.StopWatch.stop();
                alert("It took you "+ elapse/1000.0 + " seconds to completed the maze");
            }else{
                alert("Congratulations!");
            }
        }
    }
};

MAZE.reset = function(){
    var currentPosition = $(".current");
      currentPosition.removeClass('current');
      $("#node-0-0").addClass('current');
      $("td").removeClass('visited');
      if(MAZE.StopWatch){
          MAZE.StopWatch.reset();
      }
      MAZE.isStarted = false;
};


MAZE.handeKeydownEvent = function(event){
    if (event.keyCode == 37 || event.keyCode==72){ //left or h
        return MAZE.moveLeft();
    }
    if (event.keyCode == 38 || event.keyCode==75){//up or k
        return MAZE.moveUp();
    }
    if (event.keyCode == 39 || event.keyCode==76){//right or l
        return MAZE.moveRight()
    }
    if (event.keyCode == 40 || event.keyCode==74){//down or j
        return MAZE.moveDown();
    }
};


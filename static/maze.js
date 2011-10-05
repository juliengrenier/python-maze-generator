var MAZE = {'isStarted':false,'StopWatch':null};


MAZE.leftNode = function(x,y){return $("#node-"+x+"-"+(y-1))};
MAZE.upNode = function(x,y){return $("#node-"+(x-1)+"-"+y)};
MAZE.rightNode = function(x,y){return $("#node-"+x+"-"+(y+1))};
MAZE.downNode = function(x,y){return $("#node-"+(x+1)+"-"+y)};

MAZE.moveLeft = function(){
    return MAZE.move('E',MAZE.leftNode);
};
MAZE.moveUp = function(){
    return MAZE.move('N',MAZE.upNode);
};

MAZE.moveRight = function(){
    return MAZE.move('W',MAZE.rightNode);
};
MAZE.moveDown = function(){
    return MAZE.move('S',MAZE.downNode);
};

MAZE.getX = function($elem){
    return parseInt($elem.attr('data-row'));
};
MAZE.getY = function($elem){
    return parseInt($elem.attr('data-column'));
}

MAZE.moveTo = function($elem){
    var x = MAZE.getX($elem);
    var y = MAZE.getY($elem);
    if (MAZE.leftNode(x,y).hasClass('current')){
        MAZE.moveRight()
    }
    if (MAZE.rightNode(x,y).hasClass('current')){
        MAZE.moveLeft()
    }
    if (MAZE.upNode(x,y).hasClass('current')){
        MAZE.moveDown();
    }
    if (MAZE.downNode(x,y).hasClass('current')){
        MAZE.moveUp()
    }
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
        var next = findNext(MAZE.getX(currentPosition),MAZE.getY(currentPosition));
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


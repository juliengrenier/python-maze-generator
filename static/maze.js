move = function(direction,findNext){
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
            alert('Finish');
        }
    }else{
    }
    return;
}
$(document).ready(function(){
    $(document).keydown(function(event){
        if (event.keyCode == 37 || event.keyCode==72){ //left or h
//            event.preventDefault();
            return move('E',function(x,y){return $("#node-"+x+"-"+(y-1))});
        }
        if (event.keyCode == 38 || event.keyCode==75){//up or k
//            event.preventDefault();
            return move('N',function(x,y){return $("#node-"+(x-1)+"-"+y)})
        }
        if (event.keyCode == 39 || event.keyCode==76){//right or l
//            event.preventDefault();
            return move('W',function(x,y){return $("#node-"+x+"-"+(y+1))})
        }
        if (event.keyCode == 40 || event.keyCode==74){//down or j
//            event.preventDefault();
            return move('S',function(x,y){return $("#node-"+(x+1)+"-"+y)})
        }
    });
    $("#reset-button").click(function(e){
        e.preventDefault();
        var currentPosition = $(".current");
        currentPosition.removeClass('current');
        $("#node-0-0").addClass('current');
        $("td").removeClass('visited');

    });
});
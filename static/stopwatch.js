var StopWatch = {'state':0,'ms':0};

StopWatch.setElementId = function(element_id){
    StopWatch.element_id = element_id;
};

StopWatch.start = function(){
    StopWatch.state = 1;
    StopWatch.then = new Date();
    StopWatch.then.setTime(StopWatch.then.getTime() - 0);
    StopWatch.display();
};
StopWatch.stop = function(){
    StopWatch.state = 0;
    StopWatch.now = new Date();
    var ms = StopWatch.now.getTime() - StopWatch.then.getTime();

    if (StopWatch.element_id){
        $("#"+StopWatch.element_id).val(ms);
    }
    return ms;
};

    StopWatch.reset =function() {
    StopWatch.state = 0;
    if (StopWatch.element_id){
        $("#"+StopWatch.element_id).val(0);
        $("#"+StopWatch.element_id).html(0);
    }
};

StopWatch.display = function() {
    setTimeout("StopWatch.display();", 20);
    if (StopWatch.state == 1)  {
        var now = new Date();
        var ms = now.getTime() - StopWatch.then.getTime();
        if(StopWatch.element_id){
            $("#"+StopWatch.element_id).val(ms/1000.0);
            $("#"+StopWatch.element_id).html(ms/1000.0);
        }
   }
};
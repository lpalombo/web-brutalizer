$(document).ready(function() {
    var pClasses = ["p1","p2","p3","p4","p5","p6","p7","p8"];
    var hClasses = ["h1","h2","h3","h4","h5","h6","h7","h8"];
    var colors = ["#ff0000","blue","gray"];
    
    $( "#randombutton" ).click(function() {
        var colorP = colors[~~(Math.random() * colors.length)];

       
        var formVal = $('textarea#form').val();
        var pClass = pClasses[~~(Math.random()*pClasses.length)];
        var hClass = hClasses[~~(Math.random()*hClasses.length)]+" blue";
        
        var tempHTML = mmd(formVal);
//        var $preview = $('<div id="preview" />');
//        $preview.html(tempHTML);
        $(".inner").html(tempHTML);
        $(".inner p").addClass(pClass);
        $(".inner :header").addClass(hClass);
        
        var randMargin = Math.floor(Math.random()*2);
        console.log(randMargin);
        
        if(randMargin >= 1){
            $(".inner").css("margin-left",20+"%");
        } else {
            $(".inner").css("margin",0);
            $(".inner p").css("position","absolute");
            $(".inner p").each( function(){
                $(this).css("width",Math.floor(Math.random()*100)+"%");
                $(this).css("top",Math.floor(Math.random()*100)+"%");
                $(this).css("left",Math.floor(Math.random()*100)+"%");
            });
        }
//        $(".inner").append("<div id="preview" />");
        
//        jQuery('<div/>', {
//            class: tempClass,
//            text: tempText
//        }).appendTo('.inner');

        //$("p").css("color",colorP);
    });
});


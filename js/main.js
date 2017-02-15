// think about features that the user would want
//    Should start going through brutalist websites for fun features.
// Should have a sequencing option to make sure that the order of elements stays intact vertically
// Make the random element even more random
// Add some css animations!


$('.inner').html(mmd(sessionStorage.formVal));

var pClasses = ["p1","p2","p3","p4","p5","p6","p7","p8"];
var hClasses = ["h1","h2","h3","h4","h5","h6","h7","h8"];
var colors = [ "#002f2f", "#efecca", "#046380"
             , "#1e1e20", "#d9cb9e", "#dc3522"
             , "#262626", "#ffe11a", "#1f8a70"
             , "#ecf0f1", "#2c3e50", "#e74c3c"
             , "#000000", "#ffff9d", "#ff6138"
             , "#2c3e50", "#3498db", "#e74c3c"
             , "#000000", "#fff0a5", "#468966"
             ];
var isOverlapped = false, isGlobalStyle = false, isAllRandom = false;
var marginValue = 0;

function isCollided($div1, $div2) {
    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;
      
    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
}
function setProperties() {
    
    isOverlapped = $('#overlapCheck').is(":checked");
    isGlobalStyle = $('#alignCheck').is(":checked");
    isAllRandom = $('#randomCheck').is(":checked");
    
    pClass = pClasses[~~(Math.random()*pClasses.length)];
    hClass = hClasses[~~(Math.random()*hClasses.length)];
    var colorRow = Math.floor(Math.random()*(colors.length/3));
    
    marginValue = Math.random()*120;
    
    $('.inner').children().removeAttr( 'style' );
    $('.inner').removeAttr( 'style' );
    
    
    if(!isAllRandom){
        $('.inner').children().css("color",getColor(colorRow,0));
        $('.inner').children().css("background-color",getColor(colorRow,1));
        $('.inner p').removeClass().addClass(pClass);
        $('.inner h1').removeClass().addClass(hClass);
    } else {
        $('.inner').children().each(function(){
            $('.inner p').removeClass().addClass(pClasses[Math.floor(Math.random()*pClasses.length)]);
            $('.inner h1').removeClass().addClass(hClasses[Math.floor(Math.random()*hClasses.length)]);
            $(this).css("color",colors[Math.floor(Math.random()*colors.length)]);
            $(this).css("background-color",colors[Math.floor(Math.random()*colors.length)]);
        });
    }
    
    $('.inner p').each(function(){
        $(this).css("width",200+Math.random()*600+"px");
    });
    
    if(!isGlobalStyle){   
        $('.inner').children().css("position","absolute");
        $('.inner').children().each(function(){
            $(this).css("top",Math.floor(Math.random()*100)+"%");
            $(this).css("left",Math.floor(Math.random()*100)+"%");
        });
    } else if(isGlobalStyle){
        $('.inner').children().css("position","static");
        $('.inner').children().css("display","block");
        if(marginValue>100){
            
            $('.inner').css("margin","0 auto");
            $('.inner').css("width","80%");
        } else {
            $('.inner').css("margin-left",marginValue+"px");
        }
        
    }
    
    if(!isOverlapped && !isGlobalStyle){
        var boxes = $('.inner').children();
        
        for(var i = 0; i < boxes.length; i++){
            var boxA = $(boxes[i]);
            for(var j = i + 1; j <boxes.length; j++){
                var boxB = $(boxes[j]);
                if(isCollided(boxA,boxB)){
                    console.log(boxA);
                    setProperties(boxA);
                }
            }
        }
    }
}
function getColor(row, col){
    return colors[row * 3 + col];
}

$(document).ready(function() {
    setProperties();
    $( "#randombutton" ).click(function() {
        setProperties();
    
    });
});
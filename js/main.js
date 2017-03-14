// think about features that the user would want
//    Should start going through brutalist websites for fun features.
// Should have a sequencing option to make sure that the order of elements stays intact vertically
// Make the random element even more random
// Add some css animations!
// Gotta make it so that you can tweak it post randomization, so you dont gotta do it all over again

var imageDat = sessionStorage.image;
$('.inner').html(sessionStorage.formVal);

var pClasses = ["p1","p2","p3","p4","p5","p6","p7","p8"];
var hClasses = ["h1","h2","h3","h4","h5","h6","h7","h8"];
var colors = [ "#00ff00", "#efecca", "#046380"
             , "#ff0000", "#d9cb9e", "#dc3522"
             , "#0000ff", "#ffe11a", "#1f8a70"
             , "#666", "#2c3e50", "#e74c3c"
             , "#000000", "#ffff9d", "#ff6138"
             , "#2c3e50", "#3498db", "#e74c3c"
             , "#000000", "#fff0a5", "#468966"
             ];
var isOverlapped = false, isGlobalStyle = false, isAllRandom = false;
var isOrdered = false;
var isBgColor = false;
var marginValue = 0;
var topValue, leftValue;
var title = "My Great Project";

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
    
    marginValue = Math.random()*120;
    
    randomizeStyle();
    
    $('.inner p').each(function(){
        $(this).css("width",200+Math.random()*600+"px");
    });
    
    if(!isGlobalStyle){   
        $('.inner').children().css("position","absolute");
        if(!isOrdered){
            var topAdd = 0;
            $('.inner').children().each(function(){
                var h = $(this).outerHeight(true);
                topAdd = topAdd + getRndInteger(0,600);
                $(this).css("top",topAdd+"px");
                $(this).css("left",getRndInteger(0,100)+"%");
            });
        } else {
            $('.inner').children().each(function(){
                $(this).css("top",getRndInteger(0,1000)+"px");
                $(this).css("left",getRndInteger(0,100)+"%");
            });
        }
        
    } else if(isGlobalStyle){
        $('.inner').children().css("position","static");
        $('.inner').children().css("display","block");
        if(marginValue>100){
            
            $('.inner').css("margin","0 auto");
            $('.inner').css("width","80%");
        } else {
            $('.inner').css("margin","0 0 0 "+marginValue+"px");
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
    
    
//    $('.outer').css("height",$( document ).height()+400+"px");
//    $('.outer').css("width",$( document ).width());
}

function randomizeStyle(){
    
    isOverlapped = $('#overlapCheck').is(":checked");
    isGlobalStyle = $('#alignCheck').is(":checked");
    isAllRandom = $('#randomCheck').is(":checked");
    isBgColor = $('#bgColorCheck').is(":checked");
    isOrdered = $('#orderCheck').is(":checked");
    
    pClass = pClasses[~~(Math.random()*pClasses.length)];
    hClass = hClasses[~~(Math.random()*hClasses.length)];
    var colorRow = Math.floor(Math.random()*(colors.length/3));
    
    $('.inner').removeAttr( 'style' );
    $('.inner').children().removeAttr( 'style' );
    $('body').removeAttr( 'style' );
    
    
    
    if(!isAllRandom){
        $('.inner p').removeClass().addClass(pClass);
        $('.inner h1').removeClass().addClass(hClass);
        $('.inner').children().css("color",getColor(colorRow,0));
        if(isBgColor){
            //$('.inner').children().css("background-color",getColor(colorRow,1));
            //$('body').css("background-color",getColor(colorRow,1));
            $('.outer').css(
                "background","linear-gradient(to bottom,"+getColor(colorRow,1)+","+getColor(colorRow,2)+")"
            );
        }
    } else {
        $('.outer').css("background",colors[getRndInteger(0,colors.length)]);
        
        $('.inner').children().each(function(){
            
            $(this).removeClass().addClass(pClasses[getRndInteger(0,pClasses.length)]);
            
            $(this).css("color",colors[getRndInteger(0,colors.length)]);
            if(getRndInteger(0,3) > 2){
                $(this).css("background-color",colors[Math.floor(Math.random()*colors.length)]);
            }
        });
    }
}

function getColor(row, col){
    return colors[row * 3 + col];
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

var Promise = window.Promise;
if (!Promise) {
    Promise = JSZip.external.Promise;
}

function urlToPromise(url) {
    return new Promise(function(resolve, reject) {
        JSZipUtils.getBinaryContent(url, function (err, data) {
            if(err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}


$(document).ready(function() {
    
    
    
    setProperties();
    $( "#randombutton" ).click(function() {
        setProperties();
    
    });
    
    $("#savezip").click(function(){
        var zip = new JSZip();

        // find every checked item
//        $(".inner").find(":checked").each(function () {
//            var $this = $(this);
//            var url = $this.data("url");
//            var filename = url.replace(/.*\//g, "");
//            zip.file(filename, urlToPromise(url), {binary:true});
//        });
        
        var docHead = '<!doctype html><html class="no-js" lang=""><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><title>'+title+'</title><meta name="description" content=""><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="css/normalize.min.css"><link rel="stylesheet" href="css/style.css"><link rel="stylesheet" href="css/core/butch.css"><script src="js/vendor/modernizr-2.8.3.min.js"></script></head><body style=" background: '+$("body").css("background")+'">';
        
        var docBody = $('.outer').clone().wrap('<div>').parent().html();

        
        var docFooter = '<script src="js/vendor/jquery-3.1.1.min.js"></script></body></html>';
        
        zip.file("css/normalize.min.css",urlToPromise("/css/normalize.min.css"),{binary:true});
        zip.file("css/core/butch.css",urlToPromise("/css/core/butch.css"),{binary:true});
        zip.file("css/style.css",urlToPromise("/css/style.css"),{binary:true});
        zip.file("img/displaypic.png",urlToPromise("/img/displaypic.png"),{binary:true});
        zip.file("index.html",docHead+docBody+docFooter,{binary:true});
        
        // when everything has been downloaded, we can trigger the dl
        zip.generateAsync({type:"blob"})
        .then(function callback(blob) {
            saveAs(blob, "download.zip");
        }, function (e) {

        });

        return false;
    });
//    $(':checkbox').click(function() {
//        randomizeStyle();
//    });
});
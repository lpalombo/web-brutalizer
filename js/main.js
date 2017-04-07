// think about features that the user would want
//    Should start going through brutalist websites for fun features.
// Should have a sequencing option to make sure that the order of elements stays intact vertically
// Make the random element even more random
// Add some css animations!
// Gotta make it so that you can tweak it post randomization, so you dont gotta do it all over again

//$('.inner').html(sessionStorage.formVal);
//$('.inner').children().wrap("<div class='inner-child'></div>");

var pClasses = ["p1","p2","p3","p4","p5","p6","p7","p8"];
var hClasses = ["h1","h2","h3","h4","h5","h6","h7","h8"];
var fuckClasses = ["enlarge","shrink","skew","skew-left","perspective","perspective-right",
                  "flip","flip-up","blur","invert","rotate","rotate-right"];
var safeFuckClasses = ["enlarge","shrink","skew","skew-left","perspective","perspective-right",
                  "flip","flip-up","blur","invert","rotate","rotate-right"];
var hoverClasses = ["rainbow","biggerize","skewize","dropshadowize","regular","strikethrough","background-rainbow","underline"];
var alignClasses = ["inner-child-top","inner-child-bottom","inner-child-center"];
var colors = [ "#00ff00", "#efecca", "#046380"
             , "#ff0000", "#d9cb9e", "#dc3522"
             , "#0000ff", "#ffe11a", "#1f8a70"
             , "#666666", "#2c3e50", "#e74c3c"
             , "#000000", "#ffff9d", "#ff6138"
             , "#2c3e50", "#3498db", "#e74c3c"
             , "#000000", "#fff0a5", "#468966"
             , "#000000", "#666666", "#888888"
             , "#FFFFFF", "#2b015f", "#4700a0"
             ];
var isRndAlign = true, isCentered = false, isAllRandom = false, isVariableWidth = false, isEffects = false;
var isFuckedPaddings = false, isFuckedMargins = false, isBoxBg = false, isHovers = false;
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
    
    $('.inner').children().removeClass().addClass('inner-child');
    
    randomizeStyle();
    brutalize();
    
    if(isRndAlign){
        $('.inner').children().each(function(){
            $(this).addClass(getRndArrayVal(alignClasses));
        });
    } else {
        $('.inner').children().addClass('inner-child-top');
    }
    
    if(isVariableWidth){
        var val = 100/$('#colWidth').val();
        $(".inner").children().css("flex","0 0 "+val+"%");
    }
    
    if(isCentered){
        $(".inner").css("margin","0 "+getRndInteger(0,30)+"%");
    }
    
    if(isFuckedMargins){
        $(".inner-child").each(function(){
            $(this).css("margin",getRndInteger(-30,30)+"px "+getRndInteger(-30,30)+"px");
        });
    }
    
    if(isFuckedPaddings){
        $(".inner-child").each(function(){
            $(this).css("padding",getRndInteger(0,30)+"px "+getRndInteger(0,30)+"px");
        });
    }
}

function randomizeStyle(){
    
    isRndAlign = $('#rndAlignCheck').is(":checked");
    isCentered = $('#centerCheck').is(":checked");
    isAllRandom = $('#randomCheck').is(":checked");
    isBgColor = $('#bgColorCheck').is(":checked");
    isFuckedMargins = $('#marginsCheck').is(":checked");
    isFuckedPaddings = $('#paddingsCheck').is(":checked");
    isBoxBg = $('#boxBgCheck').is(":checked");
    isVariableWidth = $('#variableWidthCheck').is(":checked");
    isEffects = $('#effectCheck').is(":checked");
    isHovers = $('#hoverCheck').is(":checked");
    
    pClass = pClasses[~~(Math.random()*pClasses.length)];
    hClass = hClasses[~~(Math.random()*hClasses.length)];
    var colorRow = getRndInteger(0,colors.length/3);
    
    
    $('.outer').removeAttr( 'style' );
    $('.inner').removeAttr( 'style' );
    $('.inner').children().removeAttr( 'style' );
    $('.inner-child').children().removeAttr( 'style' );
    $('body').removeAttr( 'style' );
    $('a').removeAttr( 'style' );
    $('p').removeAttr( 'style' );
    
    
    $('.inner p').removeClass().addClass(pClass);
    $('.inner ul').removeClass().addClass(pClass);
    $('.inner h1').removeClass().addClass(hClass);
    $(".inner a").removeClass();
    
    $(".inner-child").css("color",getColor(colorRow,0));
    
    if (isEffects) {
    $(".inner-child").each(function () {
            if (!$(this).next().is("a") || !$(this).next().is("img")) {
                if (getRndInteger(0, 2) == 1) {
                    $(this).addClass(getRndArrayVal(fuckClasses));
                }
            }
        
    });
}
    
    if(isBgColor){
        if(getRndInteger(0,2)==1){
            $('.outer').css("background",getColor(colorRow,1));
         } else {
             $('.outer').css(
                 "background", "linear-gradient(to bottom," + getColor(colorRow, 1) + "," + getColor(colorRow, 2) + ")"
             );
         }
        
    }
    if(isBoxBg){
        $(".inner-child").css("background-color",getColor(colorRow,1));
    }
    if(isHovers){
        $(".inner a").addClass(getRndArrayVal(hoverClasses));
        
        if(getRndInteger(0,2)==1){
            $(".inner a").css("color",getColor(colorRow,0));
            $(".inner a").css("background-color",getColor(colorRow,1));
            $(".inner a").css("padding","2px");
        }
    }
    
    if(isAllRandom){
        $('.outer').css("background",colors[getRndInteger(0,colors.length)]);
        
        $('.inner-child').children().each(function(){
            
            $(this).removeClass().addClass(pClasses[getRndInteger(0,pClasses.length)]);
            
            $(this).css("color",colors[getRndInteger(0,colors.length)]);
            if(getRndInteger(0,3) > 2){
                $(this).css("background-color",colors[Math.floor(Math.random()*colors.length)]);
            }
        });
    }
}

var autolist = new AutoList();
var editor = new MediumEditor('.editable', {
    buttonLabels: 'fontawesome',
    extensions: {
        'autolist': autolist
    },
    toolbar: {
        buttons: ['bold', 'italic', 'underline', 'anchor', 'h1','unorderedlist','orderedlist']
    }
});

$(document).ready(function() {
    
    setProperties();
    
    $( "#randombutton" ).click(function() {
        setProperties();
    });
    $('.hamburger').click(function () {
        $('.sidebar').toggleClass('closed');
        $('.hamburgy').toggleClass('is-active');
    });

    /* Then push them back */
    $('#sidebarlogo').click(function () {
        $('.sidebar').toggleClass('closed');
        $('.hamburgy').toggleClass('closed');
    });
    $('#editmode').click(function () {
        $('.editorOverlay').toggleClass('closed');
    });
    $('#showabout').click(function () {
        $('.aboutOverlay').toggleClass('closed');
        $('.blasttext').toggleClass('closed');
    });
    $('.control-group').click(function () {
        $('.aboutOverlay').removeClass('closed').addClass('closed');
        $('.blasttext').removeClass('closed').addClass('closed');
    });
    
    $('#submit').click(function () {
        var allContents = editor.serialize();
        var elContent = allContents["element-0"].value;
        $('.inner').html(elContent);
        $('.inner').children().wrap("<div class='inner-child'></div>");
        $('.editorOverlay').toggleClass('closed');
        $('.sidebar').removeClass('closed');
        $('.hamburgy').removeClass('closed');
    });

    
    $("#savezip").click(function(){
        var zip = new JSZip();
        
        var docHead = '<!doctype html><html class="no-js" lang=""><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><title>'+title+'</title><meta name="description" content=""><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="css/normalize.min.css"><link rel="stylesheet" href="css/style.css"><link rel="stylesheet" href="css/core/butch.css"><script src="js/vendor/modernizr-2.8.3.min.js"></script></head><body style=" background: '+$("body").css("background")+'">';
        
        var docBody = $('.outer').clone().wrap('<div class="outer">').parent().html();

        
        var docFooter = '<script src="js/vendor/jquery-3.1.1.min.js"></script><script>$(document).ready(function(){brutalize();});</script></body></html>';
        
        zip.file("css/core/butch.css",urlToPromise("/css/core/butch.css"),{binary:true});
        zip.file("css/core/default.css",urlToPromise("/css/core/default.css"),{binary:true});
        zip.file("css/core/core.css",urlToPromise("/css/core/core.css"),{binary:true});
        zip.file("js/brutalist.js",urlToPromise("js/brutalist.js"),{binary:true});
        zip.file("js/start.brutalizing.js",urlToPromise("js/start.brutalizing.js"),{binary:true});
        zip.file("js/vendor/jquery-3.1.1.min.js",urlToPromise("js/vendor/jquery-3.1.1.min.js"),{binary:true});
        zip.file("js/vendor/modernizr-2.8.3.min.js",urlToPromise("js/vendor/modernizr-2.8.3.min.js"),{binary:true});
        zip.file("css/style.css",urlToPromise("/css/style.css"),{binary:true});
        zip.file("index.html",docHead+docBody+docFooter,{binary:true});
        
        // when everything has been downloaded, we can trigger the dl
        zip.generateAsync({type:"blob"})
        .then(function callback(blob) {
            saveAs(blob, "download.zip");
        }, function (e) {

        });

        return false;
    });
    
    $(':checkbox').click(function() {
        randomizeStyle();
    });
    
    $( "#variableWidthCheck" ).click(function() {
      $( ".rangeDiv" ).slideToggle( "slow", function() {
        // Animation complete.
      });
    });
    $('.editable').mediumInsert({
        editor: editor,
        addons: {
            images: {
                captions: false
            }
        }
    });
});

function getColor(row, col){
    return colors[row * 3 + col];
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
function getRndArrayVal(array) {
    return array[getRndInteger(0,array.length)];
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

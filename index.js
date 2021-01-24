const fontClasses = ["arial-text", "arial-black-text", "comic-sans-text", "tahoma-text", "helvetica-text", "impact-text", "verdana-text", "courier-new-text", "lucida-text", "georgia-text", "times-text", "palatino-text"];
const fuckClasses = ["enlarge", "shrink", "skew", "skew-left", "perspective", "perspective-right",
  "flip", "flip-up", "blur", "invert", "rotate", "rotate-right"];
const safeFuckClasses = ["enlarge", "shrink", "skew", "skew-left", "perspective", "perspective-right",
  "flip", "flip-up", "blur", "invert", "rotate", "rotate-right"];
const hoverClasses = ["rainbow", "biggerize", "skewize", "dropshadowize", "regular", "strikethrough", "background-rainbow", "underline"];
const alignClasses = ["inner-child-top", "inner-child-bottom", "inner-child-center"];
const colors = ["#00ff00", "#efecca", "#046380",
  "#ff0000", "#d9cb9e", "#dc3522",
  "#0000ff", "#ffe11a", "#1f8a70",
  "#666666", "#2c3e50", "#e74c3c",
  "#000000", "#ffff9d", "#ff6138",
  "#2c3e50", "#3498db", "#e74c3c",
  "#000000", "#fff0a5", "#468966",
  "#000000", "#666666", "#888888",
  "#FFFFFF", "#2b015f", "#4700a0",
];
let isRndAlign = true, isCentered = false, isAllRandom = false, isVariableWidth = false, isEffects = false;
let isFuckedPaddings = false, isFuckedMargins = false, isBoxBg = false, isHovers = false;
let isRndPSize = false, isRndHSize = false, isRndFont = false, isRndFontColor = false;
let isBgColor = false;
const marginValue = 0;
let topValue, leftValue;
const title = "My Great Project";

function isCollided($div1, $div2) {
  const x1 = $div1.offset().left;
  const y1 = $div1.offset().top;
  const h1 = $div1.outerHeight(true);
  const w1 = $div1.outerWidth(true);
  const b1 = y1 + h1;
  const r1 = x1 + w1;
  const x2 = $div2.offset().left;
  const y2 = $div2.offset().top;
  const h2 = $div2.outerHeight(true);
  const w2 = $div2.outerWidth(true);
  const b2 = y2 + h2;
  const r2 = x2 + w2;

  if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {return false;}
  return true;
}
function setProperties() {

  $(".inner").children().removeClass().addClass("inner-child");

  randomizeStyle();
  brutalize();

  if(isVariableWidth || isRndAlign) {
    $(".inner").addClass("flex");
  }

  if(isRndAlign) {
    $(".inner").children().each(function() {
      $(this).addClass(getRndArrayVal(alignClasses));
    });
  }
  else {
    $(".inner").children().addClass("inner-child-top");
  }

  if(isVariableWidth) {
    const val = 100 / $("#colWidth").val();
    $(".inner").children().css("flex", "0 0 " + val + "%");
  }

  if(isCentered) {
    $(".inner").css("margin", "0 " + getRndInteger(0, 30) + "%");
  }

  if(isFuckedMargins) {
    $(".inner-child").each(function() {
      $(this).css("margin", getRndInteger(-30, 30) + "px " + getRndInteger(-30, 30) + "px");
    });
  }

  if(isFuckedPaddings) {
    $(".inner-child").each(function() {
      $(this).css("padding", getRndInteger(0, 30) + "px " + getRndInteger(0, 30) + "px");
    });
  }
}

function checkboxCheck() {
  isRndAlign = $("#rndAlignCheck").is(":checked");
  isCentered = $("#centerCheck").is(":checked");
  isAllRandom = $("#randomCheck").is(":checked");
  isBgColor = $("#bgColorCheck").is(":checked");
  isFuckedMargins = $("#marginsCheck").is(":checked");
  isFuckedPaddings = $("#paddingsCheck").is(":checked");
  isBoxBg = $("#boxBgCheck").is(":checked");
  isVariableWidth = $("#variableWidthCheck").is(":checked");
  isEffects = $("#effectCheck").is(":checked");
  isHovers = $("#hoverCheck").is(":checked");
  isRndFont = $("#rndFontCheck").is(":checked");
  isRndPSize = $("#rndPSizeCheck").is(":checked");
  isRndHSize = $("#rndHSizeCheck").is(":checked");
  isRndFontColor = $("#rndFontColorCheck").is(":checked");
}

function randomizeStyle() {

  checkboxCheck();

  const colorRow = getRndInteger(0, colors.length / 3);

  $(".outer").removeAttr("style");
  $(".inner").removeAttr("style");
  $(".inner").children().removeAttr("style");
  $(".inner-child").children().removeAttr("style");
  $("body").removeAttr("style");
  $("a").removeAttr("style");
  $("p").removeAttr("style");

  $(".inner").removeClass("flex");
  $(".inner p").removeClass();
  $(".inner ul").removeClass();
  $(".inner ol").removeClass();
  $(".inner h1").removeClass();
  $(".inner a").removeClass();

  if(isRndFontColor) {
    $(".inner-child").css("color", getColor(colorRow, 0));
  }

  if(isRndFont) {
    const rndFontClass = getRndArrayVal(fontClasses);
    $(".inner p").addClass(rndFontClass);
    $(".inner ul").addClass(rndFontClass);
    $(".inner ol").addClass(rndFontClass);
    $(".inner h1").addClass(rndFontClass);
  }

  if(isRndHSize) {
    $(".inner h1").css("font-size", getRndInteger(16, 180) + "px");
  }

  if(isRndPSize) {
    const tempTextSize = getRndInteger(10, 48);
    $(".inner p").css("font-size", tempTextSize + "px");
    $(".inner ul").css("font-size", tempTextSize + "px");
    $(".inner ol").css("font-size", tempTextSize + "px");
  }

  if (isEffects) {
    $(".inner-child").each(function() {
      if (!$(this).next().is("a") || !$(this).next().is("img")) {
        if (getRndInteger(0, 2) == 1) {
          $(this).addClass(getRndArrayVal(fuckClasses));
        }
      }

    });
  }

  if(isBgColor) {
    if(getRndInteger(0, 2) == 1) {
      $(".outer").css("background", getColor(colorRow, 1));
    }
    else {
      $(".outer").css(
        "background", "linear-gradient(to bottom," + getColor(colorRow, 1) + "," + getColor(colorRow, 2) + ")"
      );
    }

  }
  if(isBoxBg) {
    $(".inner-child").css("background-color", getColor(colorRow, 1));
  }
  if(isHovers) {
    $(".inner a").addClass(getRndArrayVal(hoverClasses));

    if(getRndInteger(0, 2) == 1) {
      $(".inner a").css("color", getColor(colorRow, 0));
      $(".inner a").css("background-color", getColor(colorRow, 1));
      $(".inner a").css("padding", "2px");
    }
  }

  if(isAllRandom) {
    $(".outer").css("background", colors[getRndInteger(0, colors.length)]);

    $(".inner-child").children().each(function() {

      $(this).css("color", colors[getRndInteger(0, colors.length)]);
      if(getRndInteger(0, 3) > 2) {
        $(this).css("background-color", colors[Math.floor(Math.random() * colors.length)]);
      }
    });
  }
}

const autolist = new AutoList();
const editor = new MediumEditor(".editable", {
  buttonLabels: "fontawesome",
  extensions: {
    "autolist": autolist,
  },
  toolbar: {
    buttons: ["bold", "italic", "underline", "anchor", "h1", "unorderedlist", "orderedlist"],
  },
});

$(document).ready(function() {

  setProperties();

  $("#randombutton").click(function() {
    setProperties();
  });
  $("#sidebar-hamburger").click(function() {
    $(".sidebar").toggleClass("closed");
    $(".hamburgy").toggleClass("is-active");
  });

  $("#close-about").click(function() {
    $(".aboutOverlay").toggleClass("closed");
    $(".blasttext").toggleClass("closed");
  });

  /* Then push them back */
  $("#sidebarlogo").click(function() {
    $(".sidebar").toggleClass("closed");
    $(".hamburgy").toggleClass("closed");
  });
  $("#editmode").click(function() {
    $(".editorOverlay").toggleClass("closed");
  });
  $("#showabout").click(function() {
    $(".aboutOverlay").toggleClass("closed");
    $(".blasttext").toggleClass("closed");
  });
  $(".control-group").click(function() {
    $(".aboutOverlay").removeClass("closed").addClass("closed");
    $(".blasttext").removeClass("closed").addClass("closed");
  });

  $("#submit").click(function() {
    const allContents = editor.serialize();
    const elContent = allContents["element-0"].value;
    $(".inner").html(elContent);
    $(".inner").children().wrap("<div class='inner-child'></div>");
    $(".editorOverlay").toggleClass("closed");
    $(".sidebar").removeClass("closed");
    $(".hamburgy").removeClass("closed");
  });

  $("#savezip").click(function() {
    const zip = new JSZip();

    const docHead = "<!doctype html><html class=\"no-js\" lang=\"\"><head><meta charset=\"utf-8\"><meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\"><title>" + title + "</title><meta name=\"description\" content=\"\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><link rel=\"stylesheet\" href=\"css/normalize.min.css\"><link rel=\"stylesheet\" href=\"css/style.css\"><link rel=\"stylesheet\" href=\"css/core/butch.css\"><script src=\"js/vendor/modernizr-2.8.3.min.js\"></script></head><body style=\" background: " + $("body").css("background") + "\">";

    const docBody = $(".outer").clone().wrap("<div class=\"outer\">").parent().html();

    const docFooter = "<script src=\"js/vendor/jquery-3.1.1.min.js\"></script><script>$(document).ready(function(){brutalize();});</script></body></html>";

    zip.file("css/core/butch.css", urlToPromise("/css/core/butch.css"), { binary: true });
    zip.file("css/core/default.css", urlToPromise("/css/core/default.css"), { binary: true });
    zip.file("css/core/core.css", urlToPromise("/css/core/core.css"), { binary: true });
    zip.file("js/brutalist.js", urlToPromise("js/brutalist.js"), { binary: true });
    zip.file("js/start.brutalizing.js", urlToPromise("js/start.brutalizing.js"), { binary: true });
    zip.file("js/vendor/jquery-3.1.1.min.js", urlToPromise("js/vendor/jquery-3.1.1.min.js"), { binary: true });
    zip.file("js/vendor/modernizr-2.8.3.min.js", urlToPromise("js/vendor/modernizr-2.8.3.min.js"), { binary: true });
    zip.file("css/style.css", urlToPromise("/css/style.css"), { binary: true });
    zip.file("index.html", docHead + docBody + docFooter, { binary: true });

    // when everything has been downloaded, we can trigger the dl
    zip.generateAsync({ type: "blob" })
      .then(function callback(blob) {
        saveAs(blob, "download.zip");
      }, function(e) {

      });

    return false;
  });

  $(":checkbox").click(function() {
    randomizeStyle();
  });

  $("#variableWidthCheck").click(function() {
    $(".rangeDiv").slideToggle("slow", function() {
      // Animation complete.
    });
  });
  $(".editable").mediumInsert({
    editor: editor,
    addons: {
      images: {
        captions: false,
      },
    },
  });
});

function getColor(row, col) {
  return colors[row * 3 + col];
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function getRndArrayVal(array) {
  return array[getRndInteger(0, array.length)];
}

let Promise = window.Promise;
if (!Promise) {
  Promise = JSZip.external.Promise;
}

function urlToPromise(url) {
  return new Promise(function(resolve, reject) {
    JSZipUtils.getBinaryContent(url, function(err, data) {
      if(err) {
        reject(err);
      }
      else {
        resolve(data);
      }
    });
  });
}

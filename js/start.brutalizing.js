/* Let the Brutalization Begin */
/* NOTE: This script is must be UTF-8 encoded, so as to ensure obfuscated character rendering on Baffle */

function brutalize() {

    /* FITTEXT */
    $(".fittext").fitText();
    $(".fittext-compress").fitText(2.2); /* Increases compression */
    $(".fittext-uncompress").fitText(0.8); /* Reduces compression */

    /* Equal Heights */
    $('.equal-height').matchHeight({
        byRow: true,
        property: 'height',
        target: null,
        remove: false
    });

    /* Prideify - rainbow color filter*/
    $('.pride').prideify();

    /* BAFFLE */
    /* Animation speed value can be increased or decreased. Same with duration */
    let b = baffle('.baffle', {
        characters: '█▓▒░',
        speed: 150
    }).reveal(2500); /* Runs animation only once, upon page load */
    let bl = baffle('.baffle-longer', {
        characters: '█▓▒░',
        speed: 150,
        duration: 3000
    }).reveal(2500); /* Animation duration set to 3 seconds */
    let bf = baffle('.baffle-forever', {
        characters: '█▓▒░',
        speed: 150
    }).start(); /* Animation continues on an endless loop */

    /*** Arc */

    $('.spiral-text').curvedText({
        curve: spiral,
        domain: [0.0, 3.0],
        viewport: {
            x: 0.0,
            y: 0.0,
            width: 600.0,
            height: 600.0
        }
    });

    $('.arc-text').curvedText({
        curve: arc,
        domain: [-0.2, 0.2],
        viewport: {
            x: 0.0,
            y: 0.0,
            width: 1000.0,
            height: 400.0
        }
    });
    /*** Circle */

    $('.circle-text').curvedText({
        curve: circle,
        domain: [0.0, 1.0],
        viewport: {
            x: 0.0,
            y: 0.0,
            width: 1000.0,
            height: 1000.0
        }
    });

    $('.bezier-text').curvedText({
        curve: bezier,
        domain: [0.0, 1.0],
        viewport: {
            x: 0.0,
            y: 0.0,
            width: 1000.0,
            height: 500.0
        }
    });

    $('.wave-text').curvedText({
        curve: sine,
        domain: domain,
        viewport: viewport
    });

}
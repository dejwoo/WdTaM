(function ($) {
    $(function () {

        $('.button-collapse').sideNav({
            edge: 'right',
            closeOnClick: true,
            draggable: true
        });

    }); // end of document ready
})(jQuery);

$(document).ready(function () {
    $('.parallax').parallax();
});

$('.grid').isotope({
    // options
    itemSelector: '.grid-item',
    layoutMode: 'fitRows',
    cellsByRow: {
        columnWidth: 200,
        rowHeight: 50
    }
});
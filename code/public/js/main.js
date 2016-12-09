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


$(document).ready(function(){
    $('.tooltipped').tooltip({delay: 50});
});

$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 16 // Creates a dropdown of 15 years to control year
});
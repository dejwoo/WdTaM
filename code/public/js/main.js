$(document).ready(function () {
    //initalize index parlax
    $('.parallax').parallax();
    //tooltip pop-up initialization, used in basket
    $('.tooltipped').tooltip({delay: 50});
    //initialization of side-nav hiding showing
    $(function () {

        $('.button-collapse').sideNav({
            edge: 'right',
            closeOnClick: true,
            draggable: true
        });

    });

    //initialize swiper when document ready
    var mySwiper = new Swiper ('.swiper-container', {
          // Optional parameters
          direction: 'horizontal',
          loop: true,
          // nextButton: '.swiper-button-next',
          // prevButton: '.swiper-button-prev',
          pagination: '.swiper-pagination',
    });
});


$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 16 // Creates a dropdown of 15 years to control year
});
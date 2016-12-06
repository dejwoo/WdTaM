function isMobile() { return $(window).width()<768; }
function toggleSide() {
    if($('.left-panel').hasClass('opened')) {
        $('.left-panel').stop(true,true).animate({
            left:'-300px'
        },300).removeClass('opened');
        $('.parent').stop(true,true).animate({
            marginLeft:'0px'
        },300);
    } else {
        $('.left-panel').stop(true,true).animate({
            left:'0px'
        },300).addClass('opened');
        $('.parent').stop(true,true).animate({
            marginLeft:$('.left-panel').width()
        },300);
    }
}
$(function(){
    if(isMobile()) {
        $('.parent').css('margin-left','0px');
        $('.left-panel').removeClass('opened').css('left','-300px');
    }
    $('.hamburger').click(function (e) {
        e.preventDefault();
        toggleSide();
    })
});
function isMobile() {
    return $(window).width() < 768;
}
function toggleSide() {
    if ($('.left-panel').hasClass('opened')) {
        $('.left-panel').stop(true, true).animate({
            left: '-300px'
        }, 300).removeClass('opened');
        $('.parent').stop(true, true).animate({
            marginLeft: '0px'
        }, 300);
        $('.footer').stop(true, true).animate({
            paddingLeft: '0px'
        }, 300);
    } else {
        $('.left-panel').stop(true, true).animate({
            left: '0px'
        }, 300).addClass('opened');
        $('.parent').stop(true, true).animate({
            marginLeft: $('.left-panel').width()
        }, 300);
        $('.footer').stop(true, true).animate({
            paddingLeft: $('.left-panel').width()
        }, 300);
    }
}
$(function () {
    if (isMobile()) {
        $('.parent').css('margin-left', '0px');
        $('.left-panel').removeClass('opened').css('left', '-300px');
    }
    $('.hamburger').click(function (e) {
        e.preventDefault();
        toggleSide();
    });
    $('.collapsible.show-first li:eq(0)').addClass('active');
    $('.collapsible.show-first li:eq(0) .collapsible-body').slideDown(200);

    $('#show-reply-form').click(function () {
        $(this).parents('.card-content').find('.reply-message').stop(true, true).slideToggle();
        $(this).after().fadeOut(400);
        $('#hide-reply-form').delay(400).fadeIn(400);
        $('.reply-message').addClass('showing');
    });
    $('#hide-reply-form').click(function () {
        $(this).parents('.card-content').find('.reply-message').stop(true, true).slideToggle();
        $(this).fadeOut(400);
        $('#show-reply-form').delay(400).fadeIn(400);
        $('.reply-message').removeClass('showing');
    });
    $('.add-new-line-button').click(function () {
        var el = $(this).closest('tr');
        el.before('<tr><td class="center"><a class="delete-table-row" href="#!"><i class="material-icons">delete</i></a></td>' +
            '<td><div class="input-field custom-input-field"><label><input value=""></label></div></td>' +
            '<td><div class="custom-input-field"><input type="text" class="datepicker"></div></td>' +
            '<td><div class="input-field custom-input-field"><label><input value=""></label></div></td></tr>});');
        el = el.prev();
        el.children("td").each(function () {
            el.children("div").slideDown(function () {
                el.fadeIn();
            });
        });
    });

    $(document).on('click', '.delete-table-row i', function () {
        console.log("asdasdasd");
        const el = $(this).closest('tr');
        el.children("td").each(function () {
            $(this).wrapInner("<div/>").children("div").slideUp(function () {
                el.remove();
            });
        })
    });

});
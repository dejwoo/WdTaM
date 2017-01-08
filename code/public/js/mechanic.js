function isMobile() {
    return $(window).width() < 768;
}
function toggleSide() {
    if ($('.left-panel').hasClass('opened')) {
        $('.left-panel').stop(true, true).animate({
            left: '-250px'
        }, 250).removeClass('opened');

        $('.parent').stop(true, true).animate({
            marginLeft: '0px'
        }, 250);
        $('.page-footer').stop(true, true).animate({
            paddingLeft: '0px'
        }, 250);

    } else {
        $('.left-panel').stop(true, true).animate({
            left: '0px'
        }, 250).addClass('opened');
        if (!isMobile()) {
            $('.parent').stop(true, true).animate({
                marginLeft: $('.left-panel').width()
            }, 250);
            $('.page-footer').stop(true, true).animate({
                paddingLeft: $('.left-panel').width()
            }, 250);
        }
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

    $(document).ready(function () {
        $('.modal').modal({
            dismissible: false, // Modal can be dismissed by clicking outside of the modal
            opacity: .5, // Opacity of modal background
            in_duration: 300, // Transition in duration
            out_duration: 200, // Transition out duration
            starting_top: '4%', // Starting top style attribute
            ending_top: '10%', // Ending top style attribute
        });
    });

    $('#modalAgree').click(function(){
        const cancelButton = $('li.detail-card.active .hide-reply-form');
        const card = cancelButton.parents('.card-content');
        card.find('.message-reply').stop(true, true).slideToggle();
        cancelButton.toggle();
        card.find('.show-reply-form').delay(400).toggle();
        card.find('.message-reply').removeClass('showing');
        $('#reply-textarea').value = '';
    });

    $('.show-reply-form').click(function () {
        const card = $(this).parents('.card-content');
        card.find('.message-reply').stop(true, true).slideToggle();
        $(this).after().toggle();
        card.find('.hide-reply-form:hidden').css("display", "inline-block");
        card.find('.message-reply').addClass('showing');
    });



    $('.add-new-line-button').click(function () {
        var el = $(this).closest('tr');
        el.before('<tr><td class="center"><div><a class="delete-table-row" href="#!"><i class="material-icons">delete</i></a></div></td>' +
            '<td><div class="input-field custom-input-field"><label><input value=""></label></div></td>' +
            '<td><div class="custom-input-field"><input type="text" class="datepicker"></div></td>' +
            '<td><div class="input-field custom-input-field"><label><input value=""></label></div></td></tr>)');
        el = el.prev();
        el.addClass('opened');
        el.children("td").each(function () {
            $(this).wrapInner('<div style="display: none;" />').children("div").slideDown(400, "easeOutCirc", function () {
                var $set = $(this);
                $set.replaceWith($set.contents());
            });
        });
    });
    $(document).on('click', '.delete-table-row i', function () {
        const el = $(this).closest('tr');
        el.removeClass('opened');
        el.addClass('collapsed');
        el.children("td").each(function () {
            $(this).wrapInner("<div/>").children("div").slideUp(500, "easeInExpo", function () {
                el.remove();
            });
        })
    });

    let current_filter_chips = [];

    function updateTicketList() {
        $('#ticket-list').find("a").each(function (index, value) {
                if ($.inArray($(this).attr('data-status').toLowerCase(), current_filter_chips.map((s) => s.toLowerCase()))
                    && (current_filter_chips.length > 0)) {
                    $(this).delay(200).slideUp("fast").hide();
                } else {
                    $(this).delay(200).slideDown("fast").show();
                }
            }
        );
    }

    const states = ["New", "In Progress", "Pending Customer", "Pending Vendor", "Pending Maintenance", "Transferred", "Solved", "Closed"];
    let statesList = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: states
    });

    statesList.initialize();

    const elt = $('#ticket-filter');
    const settings = {
        freeInput: false,
        typeaheadjs: [{
            autoselect: true,
            highlight: true,
            hint: true,
            minLength: 1
        }, {
            name: 'states',
            source: statesList.ttAdapter()
        }]
    };
    elt.materialtags(settings);
    elt.on('itemAdded', function (event) {
        if (($.inArray(event.item, current_filter_chips) == -1) && ($.inArray(event.item, states) > -1)) {
            console.log(event.item);
            current_filter_chips.push(event.item);
            updateTicketList();
        }
    });
    elt.on('itemRemoved', function (event) {
        if (event.item) {
            current_filter_chips.splice($.inArray(event.item, current_filter_chips), 1);
            updateTicketList();
        }
    });
});
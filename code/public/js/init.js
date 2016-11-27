$('.button-collapse').sideNav({
        menuWidth: 300, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
    }
);

$('#formValidate').validate({
    rules: {
        username: {
            required: true,
            minlength: 6,
            maxlength: 32
        },
        password: {
            required: true,
            minlength: 4
        }
    },
    messages: {
        uname: {
            required: "Enter a username",
            minlength: "Enter at least 5 characters"
        },
        curl: "Enter your website"
    },
    errorElement: 'div',
    errorPlacement: function (error, element) {
        var placement = $(element).data('error');
        if (placement) {
            $(placement).append(error)
        } else {
            error.insertAfter(element);
        }
    }
});
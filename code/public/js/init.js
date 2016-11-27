(function ($) {
    $(function () {
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

    }); // end of document ready
})(jQuery);
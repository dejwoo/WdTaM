$(document).ready(function () {
    $('#saveEditsButton').hide();
    $('#cancelEditsButton').hide();
    let edited_fields = [];
    $("[id$=edit]").on('click', function () {
        const text = $(this).find('i').text();
        if (text == "edit") {
            $(this).parent().find("input").prop('disabled', false);
            $(this).find('i').text('cancel');
            edited_fields.push($(this).parent());
        } else if (text == "cancel") {
            const parent = $(this).parent();
            parent.find("input").prop('disabled', true).val('').removeClass('valid');
            parent.find("label").removeClass('active');
            $(this).find('i').text('edit');
            _.remove(edited_fields, function(n){
                return n[0] == parent[0];
            });
        }
        console.log(edited_fields);
        if (edited_fields.length > 0){
            $('#saveEditsButton').slideDown();
            $('#cancelEditsButton').slideDown();

        }else{
            $('#saveEditsButton').slideUp();
            $('#cancelEditsButton').slideUp();
        }
    });
    $('#cancelEditsButton').on('click', function(){
        edited_fields.forEach(function(elem){
            $(elem).find("input").prop('disabled', true).val('').removeClass('valid');
            $(elem).find("label").removeClass('active');
            $(elem).find('i').text('edit');
        });
        edited_fields = [];
        $('#saveEditsButton').slideUp();
        $('#cancelEditsButton').slideUp();
    });
});


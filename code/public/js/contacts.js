$(document).ready(function () {
    $.ajax({
        url: 'https://randomuser.me/api/?results=3&nat=us&exc=login,dob,id,location,gender',
        dataType: 'json',
        success: function (data) {
            data.results.forEach((result) => {
                const name = _.capitalize(result.name.title) + '. ' + _.capitalize(result.name.first) + ' ' + _.capitalize(result.name.last);
                const email = result.email;
                const cell = result.cell;
                const img = result.picture.large;
                const html = '<div class="card horizontal"><div class="card-image"><img src="' + img + '" alt="' + name + '"></div><div class="card-stacked"><div class="card-content"><p class="flow-text">' + name + '</p><p>Email:<a href="mailto:' + email + '">' + email + '</a></p><p>Tel:<a href="tel:' + cell + '">' + cell + '</a></p></div></div></div>';
                $('#contacts').append(html);
            });
        }
    });
});


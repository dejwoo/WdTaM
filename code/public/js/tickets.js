$(document).ready(function () {
    const socket = io('/tickets');
    socket.emit('tickets/startLoad', {});
    socket.on('tickets/newTicket', (doc, formatted) => {
        let html = $('<a>').addClass('collection-item').addClass('avatar');
        html.attr('href', '/ticket-detail?id=' + doc._id.toString());
        html.attr('data-status', doc.status.name);
        let row = $('<div>').addClass('row');
        let col1 = $('<div>').addClass('col');
        $('<i>').addClass('material-icons').addClass('circle').text('details').appendTo(col1);
        $('<span>').addClass('title').text(doc.title).appendTo(col1);
        let col2 = $('<div>').addClass('col');
        $('<p>').text(doc.messages.slice(-1)[0].subject).appendTo(col2);
        $('<p>').text(formatted.updatedDate).appendTo(col2);
        row.append(col1).append(col2).appendTo(html);
        $('<span>').addClass('secondary-content').addClass('badge').addClass('new').attr('data-badge-caption', doc.status.name).appendTo(html);
        $('#ticket-list').append(html);
    });
});
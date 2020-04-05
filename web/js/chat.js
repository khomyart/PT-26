let lastId = 0;

function showMessages(messagesContainer) {
    function chatItem(messageText) {
        return `<div class="chat-item">${messageText}</div><br>`;
    }

    $.get(`../web/index.php?r=chat/history&last_id=${lastId}`, (response) => {
        lastId = response.lastId;
        let arrayWithMessages = response.data;

        arrayWithMessages.forEach((row) => {
            messagesContainer.append(chatItem(row.message));
        });
    });
}

$(document).ready(() => {
    const sendMessageButton = $('#send-message');
    const messagesContainer = $('#chat-history');
    const textMessageInput = $('#message');

    if (messagesContainer.length === 0) {
        return true;
    }

    sendMessageButton.on('click', () => {
        $.post('../web/index.php?r=chat/message', 
        {
            message: textMessageInput.val()
        },
        () => {
            textMessageInput.val('');
            showMessages(messagesContainer);
        });
    });

    showMessages(messagesContainer);
    setInterval(showMessages, 1500, messagesContainer);
});
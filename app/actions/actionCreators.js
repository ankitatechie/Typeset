export function sendMessage(message) {
    return {
        type: 'SEND_MESSAGE',
        message
    };
}
